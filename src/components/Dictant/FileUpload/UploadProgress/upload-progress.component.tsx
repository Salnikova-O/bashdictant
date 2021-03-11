import { Spinner, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useLanguage } from '../../../LanguageProvider/language.provider';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

interface ProgressProps {
    progress: number|null,
}


const UploadProgress: React.FC<ProgressProps> = ({progress}) => {
    const {width,height} = useSafeAreaFrame();
    const {language} = useLanguage()

    // console.log(progress)

    return (
        <View
        style={{
            width: width,
            height:height,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            {
                progress||progress===0?
                <Text
                style={{
                    color: '#fff',
                    fontSize: 17,
                    marginBottom: 30
                }}
                >
                    {language.upload}    
                </Text>
                :null
            }
            {
                progress||progress===0?
                <AnimatedCircularProgress
                size={70}
                width={8}
                fill={progress}
                tintColor='#aed581'
                backgroundColor="transparent">
                {
                    (fill) => (
                    <Text
                    style={{
                        color: '#fff',
                        fontSize: 17, 
                    }}
                    >
                        { progress }%
                    </Text>
                    )
                }
                </AnimatedCircularProgress>
                :
                <Spinner color='#aed581'/>
            }
        </View>
    )
}

export default UploadProgress;