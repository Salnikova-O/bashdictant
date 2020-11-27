import React, { useMemo, useRef } from 'react';
import { Tooltip } from 'react-native-elements';
import { useTheme } from 'styled-components';

import PinSVG from '../../../assets/pin.svg';
import Popover from '../Popover/popover.component';



const GetTooltip = (
    {deleteMarker,dictant,index,initial,saveMarker}: {    
        index:number, 
        saveMarker:any, 
        changeMarkerText:any, 
        currentMarkerText:string,
        dictant: any,
        deleteMarker: (index:number) => void,
        initial: any
    }
    ) => {
        
    const marker = useMemo(() => dictant?.markers.find((mark:any) => mark.position===index), [dictant])
    const theme = useTheme()

    console.log('render')

    return (
        <Tooltip
        popover={<Popover
            onDelete={deleteMarker}
            index={index}
            saveMarker={saveMarker}
            text={marker?.text}
            />
        }
        overlayColor={'transparent'}
        ref={initial&&initial.index===index? initial.ref: null}
        containerStyle={{
            borderRadius: 8,
            padding: 18,
            height: 'auto',
            width: 220,
            maxWidth: 220,
            elevation: 6,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.26,
            shadowRadius: 6.68,
        }}
        backgroundColor={theme.palette.background.light}
        closeOnlyOnBackdropPress={true}
        
        >
            <PinSVG height={25}/>
        </Tooltip>
    )
}



export default GetTooltip