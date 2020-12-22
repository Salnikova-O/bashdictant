import React, { useEffect, useRef, useState } from 'react';
import {Toast} from 'native-base';
import {Overlay} from 'react-native-elements';
import moment from 'moment';
import { TextInput } from 'react-native';


import { useLanguage } from '../LanguageProvider/language.provider';
import { IStudent } from '../../@types/common';
import {
    Container,
    InnerContainer,
    VideoContainer,
    DictantInput,
    DictantInputContainer,
    InfoContainer,
    InfoText
} from './dictant.styles';
import YoutubePlayer from "react-native-youtube-iframe";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { PixelRatio, Platform, UIManager, LayoutAnimation } from 'react-native';
import { useTheme } from 'styled-components';
import axios from 'axios';
import {API_URL} from '../../config';
import RNFetchBlob from 'rn-fetch-blob';

import Chat from './Chat/chat.component';
import FileUpload from './FileUpload/file-upload.component';
import { DocumentPickerResponse } from 'react-native-document-picker';
import Button from '../../UI/Button/Button.component';
import DictantWaitingZone from '../DictantWaitingZone/dictant-waiting-zone.component';
import UploadProgress from './FileUpload/UploadProgress/upload-progress.component';
import { useDispatch, useSelector } from 'react-redux';
import { closeProgressModal, openProgressModal, setProgressModal } from '../../redux/modals/modals.actions';
import { userSelectors } from '../../redux/user/user.selectors';
import DictantRead from '../DictantRead/dictant-read.component';
import Fallback from '../Fallback/fallback.component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const user:IStudent = {
    id: '2',
    first_name: 'Иван',
    last_name: 'Иванов',
    middle_name: 'Иванович',
    email: 'iamivanov@gmail.com',
    address: 'moscow',
    format_dictation: 'offline',
    role: 'student',
    status: 'Проверяется',
    level: 'start'
}

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  
  interface DictantProps {
      scrollRef:any
  }
  
  const Dictant: React.FC<DictantProps> = ({scrollRef}) => {
      const [dictant, setDictant] = useState('')
      const [dictantDate, setDictantDate] = useState<Date|undefined>(undefined)
      const jwt = useSelector(userSelectors.jwt)
      const currentUser = useSelector(userSelectors.currentUser) as IStudent
      const {language} = useLanguage()
      const {width} = useSafeAreaFrame()
      const [videoId, setVideoId] = useState<string|undefined>(undefined)
      const [files, setFiles] = useState<DocumentPickerResponse[]>([])
      const theme = useTheme()
      const [elementShown, setElementShown] = useState<'timer'|'write'|'read'|undefined>(undefined)
      const [isSubmiting, setIsSubmiting] = useState(false)
      const dispatch = useDispatch()
      const [showSuccess, setShowSuccess] = useState(false)
      const dictantInputRef = useRef<TextInput>(null)
      
      
      useEffect(() => {
        axios.get(`${API_URL}/cabinet/student/info`,{
            headers: {
                "X-api-token": `${jwt}`
            }
        })
        .then((response) => {
            if (response.data.status==='Не написан') {
                axios.get(`${API_URL}/timedictation?level=${currentUser.level}`)
                .then((response) => {
                    setVideoId(parseYoutubeURL(response.data.url))
                    
                    if (moment().isAfter(moment(response.data.time))) {
                        showDictant()
                    } else {
                        showTimer()
                        // response.data.time
                        setDictantDate(moment().add(10,'seconds').toDate())
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            } else {
                showDictantRead()
            }
        })
        .catch((err) => {
            console.log(err)
        })

    },[])

    

    const handleDictantChange = (text:string) => {
        setDictant(text)
    }

    const handleFileChange = (newFiles: DocumentPickerResponse[]) => {
        let filesForUpload = [...files]
        let fileSize = 0
        filesForUpload.forEach((f) => {
            fileSize = f.size + fileSize
        })
        for (let file of newFiles) {
            if (!filesForUpload.find(f => file.name===f.name)) {
                fileSize = file.size + fileSize
                console.log(fileSize)
                if ( fileSize > 30000000 ) {
                                Toast.show({
                                text: language.errors.fileSize,
                                buttonText: 'OK',
                                duration: 4000,
                                type: 'warning',
                                position: 'bottom',
                                style: {
                                    backgroundColor: '#ff7961',
                                }
                            })
                    break;
                } else {
                    filesForUpload.push(file)
                }
            }
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        console.log(scrollRef.current)
        setTimeout(() => {
            scrollRef.current?.scrollToPosition(10000,10000,true)
        }, 200)
        setFiles(filesForUpload)
    }


    const closeSuccess = () => {
        showDictantRead()
        setShowSuccess(false)
    }


    const deleteFile = (fileName: string) => {
        const newFiles = files.filter((file) => file.name!==fileName)
        if (newFiles.length>0) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        } else {
            
            LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'scaleXY' }, update: { type: 'spring', springDamping: 0.4 }, delete: { type: 'spring', springDamping: 0.4, property: 'scaleXY' } })
        }
        setFiles(newFiles)
    }

    const handleSendDictant = () => {
        if (!isSubmiting) {
            if (files.length===0&&!dictant) {
                Toast.show({
                    text: language.errors.noDictant,
                    buttonText: 'OK',
                    duration: 2000,
                    type: 'warning',
                    position: 'bottom',
                    style: {
                        backgroundColor: '#ff7961',
                    }
                })
            } else if (files.length>0&&dictant) {
                Toast.show({
                    text: language.errors.chooseType,
                    buttonText: 'OK',
                    duration: 4000,
                    type: 'warning',
                    position: 'bottom',
                    style: {
                        backgroundColor: '#ff7961',
                    }
                })
            } else if (files.length>0) {
                setIsSubmiting(true)
                dispatch(openProgressModal(0))
                const formData = new FormData()
                const blobData:any = []
                files.forEach(file => {
                    formData.append('file', file)
                    console.log(RNFetchBlob.wrap(file.uri.replace('file://','')))
                    blobData.push({
                        name : 'file',
                        filename : file.name,
                        data: Platform.OS==='ios'? RNFetchBlob.wrap(file.uri.replace('file://','')): RNFetchBlob.wrap(file.uri)
                        
                    })
                })
                
                RNFetchBlob.fetch('POST', `${API_URL}/dictation/upload`,{
                    "X-api-token": `${jwt}`,
                    "Content-Type": 'multipart/form-data',
                }, blobData)
                .uploadProgress((written, total) => {
                    const progress = Math.round(written/total*100)
                    dispatch(setProgressModal(progress))
                })
                .then((response) => {
                    console.log(response)
                    setIsSubmiting(false)
                    dispatch(closeProgressModal())
                    setShowSuccess(true)
                })
                .catch((err) => {
                    console.log('error',err.response, err)
                    setIsSubmiting(false)
                    dispatch(closeProgressModal())
                    Toast.show({
                        text: language.errors.serverError,
                        buttonText: 'OK',
                        duration: 4000,
                        type: 'warning',
                        position: 'bottom',
                        style: {
                            backgroundColor: '#ff7961',
                        }
                    })
                })
            } else if (dictant) {
                setIsSubmiting(true)
                dispatch(openProgressModal(0))
                axios({
                    method: 'post',
                    headers: {
                        "Content-Type": 'application/json',
                        "X-api-token": `${jwt}`
                    },
                    url: `${API_URL}/dictation/write`,
                    data: {
                        text: dictant
                    },
                })
                .then((response) => {
                    console.log(response)
                    dispatch(closeProgressModal())
                    setIsSubmiting(false)
                    setShowSuccess(true)

                })
                .catch((err) => {
                    console.log('error',err.response)
                    setIsSubmiting(false)
                    dispatch(closeProgressModal())
                    Toast.show({
                        text: language.errors.serverError,
                        buttonText: 'OK',
                        duration: 4000,
                        type: 'warning',
                        position: 'bottom',
                        style: {
                            backgroundColor: '#ff7961',
                        }
                    })
                })
            }
        }
    }

    const showDictant = () => {
        setElementShown('write')
    }

    const showDictantRead = () => {
        setElementShown('read')
    }

    const showTimer = () => {
        setElementShown('timer')
    }

    const parseYoutubeURL = (url:string):string  => {
        const query = url.split('?')[1]
        const [key, value] =  query.split('=')
        if (key==='v') {
            return value
        }
        return "XTaPHuXGLvA"
    }

    const handleDictantFocus = () => {
        dictantInputRef.current?.focus()
    }

    return (
        <Container
        edges={['bottom']}
        >
            {
                elementShown==='write'&&videoId?
                    <InnerContainer
                    // enableOnAndroid={false}
                    // extraScrollHeight={50}
                    // showsVerticalScrollIndicator={false}
                    // ref={scrollRef}
                    >
                        {/* <Header>
                        <HeaderLeft/>
                            <HeaderRight>
                                <HeaderText>{currentUser?.last_name + ' ' + currentUser?.first_name.slice(0,1) + '. ' + currentUser?.middle_name.slice(0,1) + '.'}</HeaderText>
                                <HeaderText>{currentUser?.address}</HeaderText>
                                <HeaderText>{currentUser? language.dictant.level[currentUser.level]: ''}</HeaderText>
                            </HeaderRight>
                        </Header> */}
                        <VideoContainer>
                            <YoutubePlayer
                                height={PixelRatio.roundToNearestPixel(((width>500? 500: width)-40)*9/16)}
                                play={false}
                                videoId={videoId}
                            />
                        </VideoContainer>
                        <Chat/>
                        <DictantInputContainer
                        onPress={handleDictantFocus}
                        activeOpacity={1}
                        >
                            <DictantInput 
                            ref={dictantInputRef}
                            multiline={true} 
                            value={dictant} 
                            onChangeText={handleDictantChange}
                            placeholder='Ваш диктант'
                            />
                        </DictantInputContainer>
                        <FileUpload
                        files={files}
                        changeFiles={handleFileChange}
                        deleteFile={deleteFile}
                        />
                        <Button
                        text={language.dictant.sendResult}
                        bg={theme.palette.buttons.primary}
                        font={theme.palette.text.primary}
                        onPress={handleSendDictant}
                        height='50px'
                        />
                    </InnerContainer>
                : elementShown==='timer'&&dictantDate?
                <DictantWaitingZone
                showDictant={showDictant}
                startingDate={dictantDate}
                />
                : elementShown==='read' ?
                <DictantRead/>
                :<Fallback/>
            }
            <Overlay
            isVisible={showSuccess}
            onBackdropPress={closeSuccess}
            overlayStyle={{
                backgroundColor: theme.palette.background.main,
                width: '85%',
                maxWidth: 350,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                minHeight: 200,
                padding: 30
            }}
            >
                <InfoContainer>
                    <InfoText>{language.messages.dictantSuccess}</InfoText>
                    <Button
                    text={language.continue}
                    bg={theme.palette.buttons.primary}
                    font={theme.palette.text.primary}
                    height='50px'
                    onPress={closeSuccess}
                    />
                </InfoContainer>
            </Overlay>
        </Container>
    )
}


export default Dictant;