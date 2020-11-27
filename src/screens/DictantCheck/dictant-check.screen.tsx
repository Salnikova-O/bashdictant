import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';


import { IStudent } from '../../@types/common';
import DictantView from '../../components/DictantView/dictant-view.components';
import { useLanguage } from '../../components/LanguageProvider/language.provider';
import { dummyDictant } from '../../dummyList';
import { MainStackParamList } from '../../navigation/MainStack/main.stack';

import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderText,
    InnerContainer
} from './dictant-check.styles';
import { useTheme } from 'styled-components';



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
    const [initial, setInitial] = useState<any>()
    const theme = useTheme()
    const [currentMarkerText, setCurrentMarkerText] = useState('')
   
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


    const changeMarkerText = (text: string) => {
        setCurrentMarkerText(text)
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
                    </HeaderRight>
                </Header>
                <DictantView
                dictant={dictant}
                createMarker={createMarker}
                changeMarkerText={changeMarkerText}
                currentMarkerText={currentMarkerText}
                deleteMarker={deleteMarker}
                initial={initial}
                saveMarker={saveMarker}
            
                />
            </InnerContainer>
        </Container>
    )
}


export default DictantCheck;