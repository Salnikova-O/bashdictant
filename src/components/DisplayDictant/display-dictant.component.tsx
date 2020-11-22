import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, Text, TextLayoutEventData, TextLayoutLine, useWindowDimensions, View } from 'react-native';
import RNTextSize from 'react-native-text-size';

interface DisplayDictantProps {
    text?: string;
}


const textDummy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit ut aliquam purus. Sit amet cursus sit amet dictum sit. Faucibus turpis in eu mi bibendum. Ipsum faucibus vitae aliquet nec ullamcorper sit. Amet est placerat in egestas erat imperdiet sed euismod nisi. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Mattis rhoncus urna neque viverra justo nec ultrices dui. Natoque penatibus et magnis dis parturient montes nascetur. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Tristique nulla aliquet enim tortor at auctor urna.

Tellus elementum sagittis vitae et leo duis. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Fusce ut placerat orci nulla pellentesque. Bibendum at varius vel pharetra vel turpis. Tellus elementum sagittis vitae et leo duis ut. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. A arcu cursus vitae congue mauris rhoncus aenean vel. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Venenatis lectus magna fringilla urna. A diam sollicitudin tempor id eu nisl. Curabitur vitae nunc sed velit dignissim sodales ut eu.

Purus semper eget duis at tellus at urna condimentum mattis. Pretium quam vulputate dignissim suspendisse in. Sapien et ligula ullamcorper malesuada proin libero. Molestie at elementum eu facilisis sed odio morbi. Nullam eget felis eget nunc lobortis. Mauris ultrices eros in cursus. Faucibus nisl tincidunt eget nullam. Justo donec enim diam vulputate ut. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Blandit volutpat maecenas volutpat blandit aliquam etiam. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Feugiat nisl pretium fusce id.

At urna condimentum mattis pellentesque id. Sociis natoque penatibus et magnis dis. Tempus egestas sed sed risus pretium quam. Morbi tristique senectus et netus et malesuada fames. Mattis enim ut tellus elementum sagittis vitae. Adipiscing commodo elit at imperdiet. Morbi tempus iaculis urna id volutpat lacus laoreet. Erat nam at lectus urna duis convallis. Iaculis eu non diam phasellus. Nisl rhoncus mattis rhoncus urna. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Bibendum enim facilisis gravida neque convallis a cras. Convallis tellus id interdum velit laoreet id.

Ac turpis egestas integer eget aliquet nibh praesent tristique. Adipiscing enim eu turpis egestas pretium. Vitae ultricies leo integer malesuada nunc. Non pulvinar neque laoreet suspendisse interdum. Volutpat blandit aliquam etiam erat velit. Duis at tellus at urna condimentum. Scelerisque varius morbi enim nunc faucibus a pellentesque. Tincidunt tortor aliquam nulla facilisi. Non consectetur a erat nam at. Ut sem viverra aliquet eget sit amet tellus cras. Nulla at volutpat diam ut venenatis tellus in metus vulputate.`



const DisplayDictant: React.FC<DisplayDictantProps> = () => {
    const numberOfLines = 20
    const {width} = useWindowDimensions()
    const [text, setText] = useState(textDummy)
    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {

    }, [width])

    const paginateText =(lines: TextLayoutLine[], text:string, numberOfLines: number) => {
        const pages = []
        console.log(lines.length)
        lines.forEach((line, index) => {

        })
    } 



    const handleTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        paginateText(event.nativeEvent.lines, textDummy, numberOfLines)
    }



    return (
        <View
        style={{
            width: width-40,
            position: "relative"
        }}
        >
            <Text
            numberOfLines={numberOfLines}
            style={{
                width: width-40
            }}
            >
                {
                    text.split(' ').map((word, i) => {
                        return (
                            <Text
                            key={i}
                            onPress={() => console.log(word)}
                            >
                                {word+' '}
                            </Text>
                        )
                    })
                }
            </Text>
            <Text
            numberOfLines={numberOfLines}
            onTextLayout={handleTextLayout}
            style={{
                width: width-40,
                position: "absolute",
                opacity: 0
            }}
            >
                {
                    text.split(' ').map((word, i) => {
                        return (
                            <Text
                            key={i}
                            >
                                {word+' '}
                            </Text>
                        )
                    })
                }
            </Text>
        </View>
    )
}


export default DisplayDictant;