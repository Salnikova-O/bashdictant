import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import {Svg, Circle} from 'react-native-svg';
import { useTheme } from 'styled-components';

const Fallback: React.FC = () => {
    const theme = useTheme()
    const spinValue = useRef(new Animated.Value(0)).current
    const {width, height} = useSafeAreaFrame()


    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    
    useEffect(() => {
        Animated.timing(spinValue, {
            useNativeDriver:true,
            toValue: 1,
            duration: 1000
        }).start()
    }, [])

    return (
        <View
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            width: width-50,
            height: height-50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.background.main
        }}
        >
            <Animated.View
            style={{
                transform: [{rotate: spin}]
            }}
            >
                <Svg  height='50' width='50'
                style={{
                    
                }}
                >
                    <Circle  
                    cx='25' 
                    cy='25' 
                    r='15' 
                    fill="none" 
                    strokeWidth={5} 
                    stroke={theme.palette.buttons.primary}
                    strokeDasharray='70, 150'
                    strokeDashoffset='-10'
                    ></Circle>
                </Svg>
            </Animated.View>
        </View>
    )
} 


export default Fallback;