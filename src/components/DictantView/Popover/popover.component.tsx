import React, { Fragment, useEffect, useRef, useState } from 'react';

import {
    CustomTextInput,
    IconButton,
    InputContainer,
    Text
} from './popover.styles';
import CloseSVG from '../../../assets/times.svg';
import TrashSVG from '../../../assets/trash.svg';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../redux/user/user.selectors';
import { useLanguage } from '../../LanguageProvider/language.provider';

interface PopoverProps {
    onDelete?: (index:number) => void,
    text:string,
    index: number,
    saveMarker: (marker: {text:string, position:number}) => void,
    onClose: () => void
}





const Popover: React.FC<PopoverProps> = ({onDelete,text, index,saveMarker, onClose}) => {
    const [markerText, setMarkerText]= useState('')
    const ref = useRef<string>(text)
    const delRef = useRef(false)
    const currentUser = useSelector(userSelectors.currentUser)
    const {language} = useLanguage()


    useEffect(() => {
        setMarkerText(text)
        return () => {
            if(!delRef.current&&currentUser?.role==='teacher') {
                saveMarker({text: ref.current, position: index})
            }
        }
    }, [saveMarker, index, text])

    const handleChange = (t:string) => {
        setMarkerText(t)
        ref.current=(t)
    }

    return (
        <Fragment>
            {
                currentUser?.role==='teacher'?
                <InputContainer>
                    <CustomTextInput
                    value={markerText}
                    onChangeText={handleChange}
                    multiline={true}
                    placeholder={language.comment}
                    />
                    <IconButton
                    onPress={() => {
                        delRef.current=true
                        onDelete? onDelete(index) :null
                        onClose()
                    }}
                    >
                        <TrashSVG height={16} width={16}/>
                    </IconButton>
                </InputContainer>
                : 
                <InputContainer>
                    <Text>{text}</Text>
                    <IconButton
                    onPress={() => {
                        onClose()
                    }}
                    >
                        <CloseSVG height={20} width={20}/>
                    </IconButton>
                </InputContainer>
            }
        </Fragment>
    )
}


export default Popover;