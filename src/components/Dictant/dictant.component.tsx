import React, { useEffect, useState } from 'react';


import { useLanguage } from '../LanguageProvider/language.provider';
import { IStudent } from '../../@types/common';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderText,
    InnerContainer,
    VideoContainer,
    DictantInput,
    DictantInputContainer
} from './dictant.styles';
import YoutubePlayer from "react-native-youtube-iframe";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { PixelRatio } from 'react-native';
import Chat from './Chat/chat.component';
import FileUpload from './FileUpload/file-upload.component';
 
const user:IStudent = {
    id: '2',
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    email: 'iamivanov@gmail.com',
    city: 'moscow',
    dictantType: 'offline',
    type: 'student',
    dictantStatus: 'pending',
    level: 'start'
}





const Dictant: React.FC = () => {
    const currentUser = user
    const {language} = useLanguage()
    const {width} = useSafeAreaFrame()
    const [dictant, setDictant] = useState('')
    const videoId = "5qap5aO4i9A"

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


    return (
        <Container>
            <InnerContainer
            
            >
                <Header>
                <HeaderLeft/>
                    <HeaderRight>
                        <HeaderText>{currentUser?.lastName + ' ' + currentUser?.firstName.slice(0,1) + '. ' + currentUser?.middleName.slice(0,1) + '.'}</HeaderText>
                        <HeaderText>{currentUser?.city}</HeaderText>
                        <HeaderText>{currentUser? language.dictant.level[currentUser.level]: ''}</HeaderText>
                    </HeaderRight>
                </Header>
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
                files={[]}
                changeFiles={() => console.log('')}
                />
            </InnerContainer>
        </Container>
    )
}


export default Dictant;