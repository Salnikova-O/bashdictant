import React from 'react';
import {View} from 'react-native';

import {Spinner} from 'native-base';
import { useSafeAreaFrame } from 'react-native-safe-area-context';


const Fallback:React.FC = () => {
    const {height} = useSafeAreaFrame()
    return (
        <View
        style={{
            width:'100%',
            height: height-270,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <Spinner color='#aed581'/>
        </View>
    )
}


export default Fallback;