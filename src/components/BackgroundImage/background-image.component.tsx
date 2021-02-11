import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'

import ImageBigSVG from '../../assets/background-big.svg'
import ImageSmallSVG from '../../assets/background-small.svg'
import { useOrientation } from '../OrientationProvider/orientation.provider'

const  BackgroundImage: React.FC = () => {
    const screenHeight = useWindowDimensions().height
    const {orientation} = useOrientation()
    console.log(orientation)

    return (
        <View style={{height: screenHeight, position: 'absolute'}}>
            <ImageSmallSVG  opacity={0.3} height={268} style={{left: orientation === 'LANDSCAPE' ? '-75%' : '-37%', top: orientation === 'LANDSCAPE' ? '-10%' : '5%'}} />
            <ImageBigSVG opacity={0.3} height={470} style={{position: 'absolute', top: orientation === 'LANDSCAPE' ? '0%' : '30%', right: orientation === 'LANDSCAPE' ? '-73%' : '-43%'}} />
            {/* <ImageSmallSVG  opacity={0.3} height={268} style={{left: '-37%', top: '5%'}} />
            <ImageBigSVG opacity={0.3} height={470} style={{position: 'absolute', top: '30%', right: '-43%'}} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundWrap: {
        position: 'absolute',
    },
})

export default BackgroundImage