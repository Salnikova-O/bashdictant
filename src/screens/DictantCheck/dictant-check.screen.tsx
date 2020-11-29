import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import {Toast} from 'native-base';

import { GradeTypes, IStudent } from '../../@types/common';
import DictantView from '../../components/DictantView/dictant-view.components';
import GradePicker from '../../components/GradePicker/grade-picker.component';
import { useLanguage } from '../../components/LanguageProvider/language.provider';
import { dummyDictant } from '../../dummyList';
import { MainStackParamList } from '../../navigation/MainStack/main.stack';
import Button from '../../UI/Button/Button.component';

import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderText,
    InnerContainer
} from './dictant-check.styles';



const currentUser = {
    firstName: 'Олег',
    middleName: 'Иванович',
    type: 'expert'
}

type DictantCheckScreenRouteProp = RouteProp<MainStackParamList, 'DictantCheck'>;

const DictantCheck: React.FC = () => {
    const route = useRoute<DictantCheckScreenRouteProp>()
    const student: IStudent = JSON.parse(route.params.student as any)
    const {language} = useLanguage()
    const [dictant, setDictant]= useState<{text:string, markers: {text:string, position:number}[]}>()
    const [grade, setGrade] = useState<GradeTypes|undefined>()
    const theme = useTheme()


    useEffect(() => {
        setDictant(dummyDictant)
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
        }
    }

    return (
        <Container
        >
            <InnerContainer
            showsVerticalScrollIndicator={false}
            >
                <Header>
                    <HeaderLeft>
                        <HeaderText>{currentUser.firstName + ' ' + currentUser.middleName}</HeaderText>
                        <HeaderText>{getRoleText(currentUser.type as any)}</HeaderText>
                    </HeaderLeft>
                    <HeaderRight>
                        <HeaderText>{student?.lastName + ' ' + student?.firstName.slice(0,1) + '. ' + student?.middleName.slice(0,1) + '.'}</HeaderText>
                        <HeaderText>{student?.city}</HeaderText>
                        <HeaderText>{student? language.dictant.level[student.level]: ''}</HeaderText>
                    </HeaderRight>
                </Header>
                <DictantView
                dictant={dictant}
                createMarker={createMarker}
                deleteMarker={deleteMarker}
                saveMarker={saveMarker}
                />
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
            </InnerContainer>
        </Container>
    )
}


export default DictantCheck;