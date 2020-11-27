import React, { Fragment, useEffect, useState, useRef } from 'react';
import {Text,TouchableOpacity,  View,NativeSyntheticEvent, TextLayoutEventData, TextLayoutLine, GestureResponderEvent, LayoutChangeEvent } from 'react-native';

import Fallback from '../common/Fallback/fallback.component';

import Pagination from '../Participation/Pagination/pagination.component';
import {
    Container,
    DictantBody,
    DictantText,
    ShadowText,
    MarkerContainer,
    DC,
    DRow,
    PopoverContainer
} from './dictant-view.styles';
import PinSVg from '../../assets/pin.svg';
import Popover from './Popover/popover.component';
import PopUp from 'react-native-popover-view';

interface DictantProps {
    dictant: {
        text:string
        markers: {
            text: string
            position:number
        }[]
    }|undefined,
    createMarker: (index:number) => void,
    saveMarker:any, 
    changeMarkerText:any, 
    currentMarkerText:string,
    deleteMarker: (index:number) => void,
    initial: any,
}

const numberOfLines = 30



const DictantView:React.FC<DictantProps> = ({
    dictant, 
    createMarker,
    changeMarkerText,
    currentMarkerText,
    deleteMarker,
    initial,
    saveMarker,
}) => {
    const [lines, setPages] = useState<any>([])
    const [currentPage, setCurrentPage]= useState(1)
    const perPage = 1
    const [loading, setLoading] = useState(false)
    const [markers, setMarkers] = useState<any>([])
    const [popover, setPopover] = useState<any>()
    const [markerRefs, setMarkerRefs] = useState<{[index:number]: React.RefObject<TouchableOpacity> }>({})


    useEffect(() => {
        
        if (dictant) {
            setMarkers(dictant.markers)
            let refs: {[index:number]: React.RefObject<TouchableOpacity> } = markerRefs
            dictant.markers.forEach((marker) => {
                if (!refs[marker.position]) {
                    refs[marker.position] = React.createRef<TouchableOpacity>()
                }
            })
            setMarkerRefs(refs)
        }
    }, [dictant])
    


    const handlePagination = (event: NativeSyntheticEvent<TextLayoutEventData>) =>{
        let wordCount = 0
        const newLines = event.nativeEvent.lines.map(line => {
            const words = line.text.split(' ')
            const newWordCount = wordCount
            wordCount = wordCount + words.length
            return {
                words: words,
                wordCount: newWordCount
            }
        })
        setPages(newLines)
    }

    
    const handlePageChange = (index: number) => {
        setCurrentPage(index)
    }
    
    const handleWordPress = (event:GestureResponderEvent, index: number) => {
        event.preventDefault()
        createMarker(index)
    }


    const closePopover = () => {
        setPopover(undefined)
    }

    const openPopover = (ref: React.RefObject<TouchableOpacity>, marker: {text:string, position: number} ) => {
        setPopover({ref,marker})
        console.log(ref)
    }

    return (
        <Container>
            <DictantBody>
                {
                    loading?
                    <Fallback/>
                    :null
                }
                <DC>
                    {
                    lines.slice((currentPage-1)*numberOfLines,currentPage*numberOfLines).map((line:{words:string[], wordCount: number}, i:number) => {
                        return (
                            <DRow key={i}>
                                {
                                line.words.map((word, index) => {
                                    const wordIndex = index+line.wordCount
                                    const marker = markers.find((marker:any) => marker.position===wordIndex)
                                    return (
                                        <View key={index  }>
                                            <DictantText
                                            onLongPress={(event) => handleWordPress(event, wordIndex)}
                                            >
                                                {word + `${index===line.words.length-1? '': ' '}`}
                                            </DictantText>
                                            {
                                                marker?
                                                <MarkerContainer
                                                ref={markerRefs[wordIndex]}
                                                onPress={() =>openPopover(markerRefs[wordIndex], marker)}
                                                >
                                                    <PinSVg height={25}/>
                                                </MarkerContainer>
                                                :null
                                            }
                                        </View>
                                    )
                                })
                                }
                            </DRow>
                        )
                    })
                    }
                </DC>
                <ShadowText
                onTextLayout={handlePagination}
                >
                    {dictant?.text}
                </ShadowText>
            </DictantBody>
            {
                lines.length>0?
                <Pagination
                currentpage={currentPage}
                perPage={perPage}
                totalAmount={(Math.ceil(lines.length/numberOfLines))}
                setCurrentPage={handlePageChange}
                />
                :null
            }
            <PopUp
            from={popover?.ref}
            isVisible={popover? true: false}
            onRequestClose={closePopover}
            >
                <PopoverContainer>
                    {
                        popover?
                        <Popover
                        index={popover.marker.position}
                        onDelete={deleteMarker}
                        saveMarker={saveMarker}
                        text={popover.marker.text}
                        />
                        :null
                    }
                </PopoverContainer>
            </PopUp>
        </Container>
    )
}


export default DictantView;