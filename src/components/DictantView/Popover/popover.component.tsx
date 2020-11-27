import React, { Fragment, useEffect, useRef, useState } from 'react';

import {
    CustomTextInput,
    IconButton,
    InputContainer,
    Text
} from './popover.styles';
import CloseSVG from '../../../assets/close.svg';

interface PopoverProps {
    onDelete: (index:number) => void,
    text:string,
    index: number,
    saveMarker: (marker: {text:string, position:number}) => void
}

const currentUser = {
    firstName: 'Олег',
    middleName: 'Иванович',
    type: 'expert'
}



const Popover: React.FC<PopoverProps> = ({onDelete,text, index,saveMarker}) => {
    const [markerText, setMarkerText]= useState('')
    const ref = useRef<string>(text)
    const delRef = useRef(false)

    useEffect(() => {
        setMarkerText(text)
        return () => {
            if(!delRef.current) {
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
                currentUser.type==='expert'?
                <InputContainer>
                    <CustomTextInput
                    value={markerText}
                    onChangeText={handleChange}
                    multiline={true}
                    numberOfLines={4}
                    />
                    <IconButton
                    onPress={() => {
                        onDelete(index)
                        delRef.current=true
                    }}
                    >
                        <CloseSVG height={16} width={16}/>
                    </IconButton>
                </InputContainer>
                : <Text>{text}</Text>
            }
        </Fragment>
    )
}


export default Popover;