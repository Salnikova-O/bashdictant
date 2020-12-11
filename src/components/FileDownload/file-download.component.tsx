import React from 'react';
import {Toast} from 'native-base';
import RNFS from 'react-native-fs'

import {
    Container,
    FileName,
    Header,
    IconButton,
    ItemContainer
} from './file-download.styles';
import { useLanguage } from '../LanguageProvider/language.provider';
import { Image, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import {API_URL} from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../redux/user/user.selectors';
import { closeProgressModal, openProgressModal, setProgressModal } from '../../redux/modals/modals.actions';

interface FileProps {
    files: any[],
    studentId: string
}


const FileDownload:React.FC<FileProps> = ({files, studentId}) => {
    const {language} = useLanguage()
    const jwt = useSelector(userSelectors.jwt)
    const dispatch = useDispatch()
    
    const handleDownload = (file:string) => {
        const path = Platform.OS==='ios'? RNFetchBlob.fs.dirs.DocumentDir: RNFetchBlob.fs.dirs.DownloadDir
        Platform.OS==='ios'?dispatch(openProgressModal(0)):dispatch(openProgressModal(null))
        
        RNFetchBlob
        .config({
            fileCache : true,
            addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                description : 'Идет загрузка',
                title: file,
                mime: '/',
              },
            path: path + `/${file}`
        })
        .fetch('GET',`${API_URL}/dictation/${studentId}/file?name=${file}`,
        {
            "X-api-token": `${jwt}`
        })
        .progress((received, total) => {
            Platform.OS==='ios'?
            dispatch(setProgressModal(Math.round(received/total*100)))
            :null
        })
        .then((res) => {
            dispatch(closeProgressModal())
            if (Platform.OS === "ios") {
                try {
                    RNFetchBlob.ios.openDocument(res.path());
                } catch {
                    Toast.show({
                        text: language.messages.downloadSuccess + ' ' + res.path(),
                        buttonText: 'OK',
                        duration: 12000,
                        type: 'success',
                        position: 'bottom',
                        style: {
                            backgroundColor: '#aed581',
                        }
                    })
                }
              } else {
                  console.log(res.path())
              }
        })
        .catch(err => {
            dispatch(closeProgressModal())
            if (err.message!=='Download manager could not resolve downloaded file path.') {
                Toast.show({
                    text: language.errors.fileDownload,
                    buttonText: 'OK',
                    duration: 3000,
                    type: 'warning',
                    position: 'bottom',
                    style: {
                        backgroundColor: '#ff7961',
                    }
                })
            } else {
                Toast.show({
                    text: language.messages.downloadSuccessAndroid,
                    buttonText: 'OK',
                    duration: 4000,
                    type: 'success',
                    position: 'bottom',
                    style: {
                        backgroundColor: '#aed581',
                    }
                })
            }
            console.log(err.message)
        })
    }


    return (
        <Container>
            <Header>{language.dictant.uploadTitle}:</Header>
            {
                files.map((file, index) => {
                    return (
                        <ItemContainer key={index}>
                            <FileName>{file}</FileName>
                            <IconButton
                            onPress={() => handleDownload(file)}
                            >
                                <Image
                                source={require('../../assets/download.png')}
                                />
                            </IconButton>
                        </ItemContainer>
                    )
                })
            }
        </Container>
    )
}


export default FileDownload;