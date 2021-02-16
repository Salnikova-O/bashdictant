import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import {Toast} from 'native-base';
import {Overlay} from 'react-native-elements';
import {Platform, UIManager, LayoutAnimation, View} from 'react-native';

import { GradeTypes, IStudent } from '../../@types/common';
import DictantView from '../../components/DictantView/dictant-view.components';
import GradePicker from '../../components/GradePicker/grade-picker.component';
import { useLanguage } from '../../components/LanguageProvider/language.provider';
import { MainStackParamList } from '../../navigation/MainStack/main.stack';
import Button from '../../UI/Button/Button.component';
import axios from 'axios'
import {API_URL} from '../../config';

import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderText,
    InnerContainer,
    InfoContainer,
    InfoText,
    GradeContainer,
    GradeText
} from './dictant-check.styles';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../redux/user/user.selectors';
import FileDownload from '../../components/FileDownload/file-download.component';
import BackgroundImage from '../../components/BackgroundImage/background-image.component';
import Grade from '../../UI/Grade/grade.component';


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }



type DictantCheckScreenRouteProp = RouteProp<MainStackParamList, 'DictantCheck'>;

const DictantCheck: React.FC = () => {
    const route = useRoute<DictantCheckScreenRouteProp>()
    const student: IStudent = JSON.parse(route.params.student as any)
    const {language} = useLanguage()
    const [dictant, setDictant]= useState<{text:string, markers: {text:string, position:number}[]}>()
    const [grade, setGrade] = useState<GradeTypes|undefined>()
    const theme = useTheme()
    const currentUser = useSelector(userSelectors.currentUser)
    const jwt = useSelector(userSelectors.jwt)
    const navigation = useNavigation()
    const [files, setFiles] = useState<string[]>([])
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)


    useEffect(() => {
        if (student.rating !== 0) setGrade(student.rating)
        axios.get(`${API_URL}/dictation/${student.id}`,{
            headers: {
                "X-api-token": `${jwt}`
            }
        })
        .then((response) => {
            console.log(response.data)
            if (response.data.names[0]==='Online') {
                axios.get(`${API_URL}/dictation/${student.id}/file?name=Online`,{
                    headers: {
                        "X-api-token": `${jwt}`
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    const markers = response.data.markers
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                    setDictant({
                        text: response.data.text,
                        markers: markers? markers: []
                    })
                })
                .catch((err) => {
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
                    navigation.goBack()
                })
            } else {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                // setGrade(response.data.rating)
                setFiles(response.data.names)
            }
        })
        .catch((err) => {
            console.log(err)
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
            navigation.goBack()
        })
    }, [])

    const getRoleText = (role: 'expert'|'organizer'|'student') => {
        return language.roles[role]
    }

    const createMarker = (index: number) => {
        if (dictant&&!dictant?.markers.find((mark:any) => mark.position==index)) {
            setDictant({...dictant, markers: [...dictant.markers, {text: '', position: index}]})
        }
    }

    const deleteMarker = (index:number) => {
        const newMarkers = (dictant as any).markers.filter((mark:any) => mark.position!==index)
        setDictant({...(dictant as any), markers: newMarkers})
    }


    const saveMarker = (marker: {text:string, position: number}) => {
        const filteredMarkers = (dictant as any).markers.filter((mark:any) => mark.position!==marker.position)
        setDictant((d:any) => ({...d, markers: [...filteredMarkers, marker]}))
    }

    const changeGrade = (grade:GradeTypes) => {
        setGrade(grade)
    }

    const handleSendResults = () => {
        if (!grade) {
            Toast.show({
                text: language.errors.noGrade,
                buttonText: 'OK',
                duration: 2000,
                type: 'warning',
                position: 'bottom',
                style: {
                    backgroundColor: '#ff7961',
                }
            })
        } else if(!isSubmiting) {
            setIsSubmiting(true)
            axios({
                method: 'post',
                headers: {
                    "Content-Type": 'application/json',
                    "X-api-token": `${jwt}`
                },
                url: `${API_URL}/dictation/${student.id}/reply`,
                data: {
                    rating: Number(grade),
                    markers: dictant? dictant.markers: []
                }
            })
            .then(() => {
                setIsSubmiting(false)
                setShowSuccess(true)
            })
            .catch((err) => {
                console.log(err.response)
                setIsSubmiting(false)
                Toast.show({
                    text: language.errors.serverError,
                    buttonText: 'OK',
                    duration: 2000,
                    type: 'warning',
                    position: 'bottom',
                    style: {
                        backgroundColor: '#ff7961',
                    }
                })
            })
        }
    }

    const closeSuccess = () => {
        setShowSuccess(false)
        navigation.goBack()
    }


    return (
        <Container
        >
            <BackgroundImage />
            <InnerContainer
            showsVerticalScrollIndicator={false}
            >
                <Header>
                    <HeaderLeft>
                        <HeaderText>{currentUser?.first_name + ' ' + currentUser?.middle_name}</HeaderText>
                        <HeaderText>{getRoleText(currentUser?.role as any)}</HeaderText>
                    </HeaderLeft>
                    <HeaderRight>
                        <HeaderText>{student?.last_name + ' ' + student?.first_name.slice(0,1) + '. ' + student?.middle_name.slice(0,1) + '.'}</HeaderText>
                        <HeaderText>{student?.address}</HeaderText>
                        <HeaderText>{student? language.dictant.level[student.level]: ''}</HeaderText>
                    </HeaderRight>
                </Header>
                {
                    dictant?
                    <DictantView
                    dictant={dictant}
                    createMarker={createMarker}
                    deleteMarker={deleteMarker}
                    saveMarker={saveMarker}
                    dictantStatus={student.status}
                    />
                    :null
                }
                {
                    files.length>0?
                    <FileDownload files={files} studentId={student.id}/>
                    :null
                }
                {route.params.dictantStatus === 'Проверяется' ? 
                <View>
                    <GradePicker
                currentGrade={grade}
                changeGrade={changeGrade}
                />
                <Button
                text={language.dictant.sendResult}
                height='50px'
                bg={theme.palette.buttons.primary}
                font={theme.palette.text.primary}
                onPress={handleSendResults}
                />
                </View>
                : 
                route.params.dictantStatus === 'Проверен' ? 
                    grade?
                    <GradeContainer>
                        <GradeText>{language.gradeText.teacherGrade}:</GradeText>
                        <Grade
                        grade={grade}
                        active={true}
                        />
                    </GradeContainer>  
                    : null
                    : null  
            }
            </InnerContainer>
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
            animationType={'fade'}
            >
                <InfoContainer>
                    <InfoText>{language.messages.dictantCheckSuccess}</InfoText>
                    <Button
                    text={language.dictant.backToStudents}
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


export default DictantCheck;