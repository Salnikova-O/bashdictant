import React, { useEffect, useState } from 'react';
import {Toast} from 'native-base';

import { useLanguage } from '../LanguageProvider/language.provider';
import { IStudent } from '../../@types/common';
import {
    Container,
    // Header,
    // HeaderLeft,
    // HeaderRight,
    // HeaderText,
    InnerContainer,
    VideoContainer,
    DictantInput,
    DictantInputContainer
} from './dictant.styles';
import YoutubePlayer from "react-native-youtube-iframe";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { PixelRatio, Platform, UIManager, LayoutAnimation } from 'react-native';
import Chat from './Chat/chat.component';
import FileUpload from './FileUpload/file-upload.component';
import { DocumentPickerResponse } from 'react-native-document-picker';
import Button from '../../UI/Button/Button.component';
import { useTheme } from 'styled-components';
import DictantWaitingZone from '../DictantWaitingZone/dictant-waiting-zone.component';
 
const user:IStudent = {
    id: '2',
    first_name: 'Иван',
    last_name: 'Иванов',
    middle_name: 'Иванович',
    email: 'iamivanov@gmail.com',
    address: 'moscow',
    format_dictation: 'offline',
    role: 'student',
    dictantStatus: 'pending',
    level: 'start'
}

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }




const Dictant: React.FC = () => {
    const currentUser = user
    const {language} = useLanguage()
    const {width} = useSafeAreaFrame()
    const [dictant, setDictant] = useState('')
    const videoId = "5qap5aO4i9A"
    const [files, setFiles] = useState<DocumentPickerResponse[]>([])
    const theme = useTheme()
    const [elementShown, setElementShown] = useState<'timer'|'write'|'read'>('timer')

    useEffect(() => {
        fetch('https://youtube.googleapis.com/youtube/v3/liveBroadcasts?key=AIzaSyAHUF4raQezDkcfyl1sMMMZ1s5qj2qBkWM',{
        })
        .then(res => {
            console.log(res)
        })
        .catch(e => console.log(e))
    }, [])

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
                if ( fileSize > 200000 ) {
                    
                    break;
                } else {
                    filesForUpload.push(file)
                }
            }
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        setFiles(filesForUpload)
    }


    const deleteFile = (fileName: string) => {
        const newFiles = files.filter((file) => file.name!==fileName)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        setFiles(newFiles)
    }

    const handleSendDictant = () => {
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
        }
    }

    const showDictant = () => {
        setElementShown('write')
    }


    return (
        <Container
        edges={['bottom']}
        >
            {
                elementShown==='write'?
                    <InnerContainer
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
                        <DictantInputContainer>
                            <DictantInput 
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
                : elementShown==='timer'?
                <DictantWaitingZone
                showDictant={showDictant}
                startingDate={new Date(202, 0, 1, 0, 0, 0, 0)}
                />
                :null
            }
        </Container>
    )
}


export default Dictant;