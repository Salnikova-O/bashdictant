import React, { useContext, useEffect, useState } from 'react';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

const initialOrientation = Orientation.getInitialOrientation()

export interface OrientationProps {
    orientation: 'PORTRAIT'|'LANDSCAPE'
}

const Orient = React.createContext<OrientationProps|null>(null) 

const OrientationProvider:React.FC = ({children}) => {
    const [orientation, setOrientation] = useState<'LANDSCAPE'|'PORTRAIT'>(initialOrientation==='LANDSCAPE-LEFT'||initialOrientation==='LANDSCAPE-RIGHT'? 'LANDSCAPE':'PORTRAIT')
    const {width, height} = useSafeAreaFrame()


    useEffect(() => {
        setOrientation(width>height? 'LANDSCAPE': 'PORTRAIT')
    }, [width, height]) 
    
    return (
        <Orient.Provider
        value={{
            orientation: orientation
        }}
        >
            {children}
        </Orient.Provider>
    )
}
export const useOrientation = () => {
    const orientation = useContext(Orient)
    if (!orientation) {
        throw new Error('useOrientation hook used outside OrientationProvider')
    }
    return orientation;
}


export default OrientationProvider;