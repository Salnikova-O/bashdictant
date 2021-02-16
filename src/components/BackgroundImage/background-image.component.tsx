import React from 'react'
import { StyleSheet, useWindowDimensions, View, Platform } from 'react-native'

import ImageBigSVG from '../../assets/background-big.svg'
import ImageSmallSVG from '../../assets/background-small.svg'
import { useOrientation } from '../OrientationProvider/orientation.provider'

const  BackgroundImage: React.FC = () => {
    const screenHeight = useWindowDimensions().height
    const screenWidth = useWindowDimensions().width
    const {orientation} = useOrientation()

    const isIOS = Platform.OS === 'ios'

    return (
        <View style={{height: screenHeight, position: 'absolute', width: screenWidth}}>
            <ImageSmallSVG  opacity={0.3} height={268} width={268} 
            style={{
            left: orientation === 'LANDSCAPE' ? (isIOS ? '-15%' : '-15%') : (isIOS ? '-40%' : '5%'), 
            top: orientation === 'LANDSCAPE' ? '5%' : '5%'}} 
            />
            <ImageBigSVG opacity={0.3} height={470} 
            style={{ 
            top: orientation === 'LANDSCAPE' ? '-55%' : '-10%', 
            right: orientation === 'LANDSCAPE' ? (isIOS ? '-40%' : '-40%') : (isIOS ? '15%' : '-15%')}} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundWrap: {
        position: 'absolute',
    },
})

export default BackgroundImage