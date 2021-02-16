import React, {  useEffect, useRef, useState } from 'react';
import {TouchableOpacity,  View,NativeSyntheticEvent, TextLayoutEventData,  GestureResponderEvent, LayoutChangeEvent } from 'react-native';

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
    PopoverContainer,
    PrevNextButtons
} from './dictant-view.styles';
import PinSVg from '../../assets/pin.svg';
import Popover from './Popover/popover.component';
import PopUp from 'react-native-popover-view';
import Button from '../../UI/Button/Button.component';
import { useTheme } from 'styled-components';
import { useLanguage } from '../LanguageProvider/language.provider';
import { Text } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

interface DictantProps {
    dictant: {
        text:string
        markers: {
            text: string
            position:number
        }[]
    }|undefined,
    createMarker?: (index:number) => void,
    saveMarker?:any, 
    deleteMarker?: (index:number) => void,
    grade?:any
    dictantStatus?: string
}
const numberOfLines = 30



const DictantView:React.FC<DictantProps> = ({
    dictant, 
    createMarker,
    deleteMarker,
    saveMarker,
    grade,
    dictantStatus
}) => {
    const [lines, setPages] = useState<any>([])
    const [currentPage, setCurrentPage]= useState(1)
    const perPage = 1
    const [loading, setLoading] = useState(true)
    const [markers, setMarkers] = useState<any>([])
    const [popover, setPopover] = useState<any>()
    const [markerRefs, setMarkerRefs] = useState<{[index:number]: React.RefObject<TouchableOpacity> }>({})
    const theme = useTheme()
    const {language}  = useLanguage()
    const textRef = useRef<Text>(null)
    const {width} = useSafeAreaFrame()

    useEffect(() => {
        console.log(dictantStatus)
        
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
    
    const handleWordPress = (event:GestureResponderEvent, index: number, ref:React.RefObject<View>) => {
        event.preventDefault()
        if (createMarker) {
            createMarker(index)
        }
    }


    const closePopover = () => {
        setPopover(undefined)
    }

    const openPopover = (ref: React.RefObject<TouchableOpacity>, marker: {text:string, position: number} ) => {
        setPopover({ref,marker})
    }


    const handlePageLoaded = (event: LayoutChangeEvent) => {
        if (event.nativeEvent.layout.height>15) {
            setLoading(false)
        }
    }

    return (
        <Container>
            <DictantBody>
                {
                    loading?
                    <Fallback/>
                    :null
                }
                <DC
                onLayout={handlePageLoaded}
                >
                    {
                    lines.slice((currentPage-1)*numberOfLines,currentPage*numberOfLines).map((line:{words:string[], wordCount: number}, i:number) => {
                        return (
                            <DRow key={i}>
                                {
                                line.words.map((word, index) => {
                                    const wordIndex = index+line.wordCount
                                    const marker = markers.find((marker:any) => marker.position===wordIndex)
                                    const ref = React.createRef<View>()
                                    return (
                                        <View key={index  } ref={ref}>
                                            <DictantText
                                            onLongPress={(event) => handleWordPress(event, wordIndex, ref)}
                                            >
                                                {word + `${index===line.words.length-1? '': ' '}`}
                                            </DictantText>
                                            {
                                                marker?
                                                <MarkerContainer
                                                ref={markerRefs[wordIndex]}
                                                onPress={() =>openPopover(markerRefs[wordIndex], marker) }
                                                >
                                                    <PinSVg height={30}/>
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
                ref={textRef}
                style={{
                    width: width<452? width-88: 452
                }}
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
            {
                grade?
                grade
                :null
            }
            {
                lines.length>0?
                <PrevNextButtons>
                    <Button
                    bg={theme.palette.buttons.secondary}
                    font={theme.palette.text.secondary}
                    border={theme.palette.text.secondary}
                    text={language.dictant.previousPage}
                    disabled={currentPage===1}
                    height='40px'
                    onPress={() => setCurrentPage(c => c-1)}
                    />
                    <Button
                    bg={theme.palette.buttons.secondary}
                    font={theme.palette.text.secondary}
                    border={theme.palette.text.secondary}
                    text={language.dictant.nextPage}
                    disabled={currentPage===Math.ceil(lines.length/numberOfLines)}
                    height='40px'
                    onPress={() => setCurrentPage(c => c+1)}
                    />
                </PrevNextButtons>
                :null
            }
            <PopUp
            from={popover?.ref}
            isVisible={popover? true: false}
            onRequestClose={closePopover}
            backgroundStyle={{
                backgroundColor: 'transparent'
            }}
            popoverStyle={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 9,
            }}
            >
                <PopoverContainer
                >
                    {
                        popover?
                        <Popover
                        editDisabled={dictantStatus !== 'Проверяется'}
                        index={popover.marker.position}
                        onDelete={deleteMarker}
                        saveMarker={saveMarker}
                        text={popover.marker.text}
                        onClose={closePopover}
                        />
                        :null
                    }
                </PopoverContainer>
            </PopUp>
        </Container>
    )
}


export default DictantView;