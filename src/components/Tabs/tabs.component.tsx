import React, { Fragment, useEffect, useState } from 'react';
import {Platform, UIManager, LayoutAnimation} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Toast} from 'native-base';


import { IStudent } from '../../@types/common';
import { setRedirect } from '../../redux/redirect/redirect.actions';
import { userSelectors } from '../../redux/user/user.selectors';


import {
    OptionText,
    OptionWrapper,
    OptionsContainer,
    TabsContainer
} from './tabs.styles';
import { useLanguage } from '../LanguageProvider/language.provider';
import { redirectSelectors } from '../../redux/redirect/redirect.selectors';


interface TabsProps {
    children: React.ReactNode[],
    defaultIndex?: number,
    tabNames: string[],
    onTabChange?: (tab:number) => void

}


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

const levelTypes = ['start', 'advanced', 'dictant']

const Tabs: React.FC<TabsProps> = ({children, defaultIndex, tabNames, onTabChange}) => {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex? defaultIndex: 0)
    const currentUser = useSelector(userSelectors.currentUser) as IStudent
    const dispatch = useDispatch()
    const {language }= useLanguage()
    const redirectRoute = useSelector(redirectSelectors.redirectRoute)

    useEffect(() => {
        onTabChange? onTabChange(currentIndex): null
    }, [currentIndex])

    useEffect(() => {
        redirectRoute==='checkPersonal'? setCurrentIndex(0):null
        dispatch(setRedirect(undefined))
    }, [redirectRoute])



    const handleChangeTab = (index:number) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
        if (currentIndex===0&&currentUser?.role==='student'&&!levelTypes.includes(currentUser.level)) {
            dispatch(setRedirect('noLevel'))
            Toast.show({
                text: language.errors.noDictantLevel,
                buttonText: 'OK',
                duration: 6000,
                type: 'warning',
                position: 'bottom',
                style: {
                    backgroundColor: '#ff7961',
                }
            })
        } else {
            setCurrentIndex(index)
        }
    } 


    return (
        <Fragment>
            <TabsContainer>
                <OptionsContainer>
                    {
                        tabNames.map((name, index) => {
                            return (
                                <OptionWrapper
                                key={index}
                                onPress={() => handleChangeTab(index)}
                                active={currentIndex===index}
                                >
                                    <OptionText
                                    active={currentIndex===index}
                                    >
                                        {name}
                                    </OptionText>
                                </OptionWrapper>
                            )
                        })
                    }
                    {/* <ActiveLine/> */}
                </OptionsContainer>
                {
                    children? children[currentIndex]: null
                }
            </TabsContainer>
        </Fragment>
    )


}



export default Tabs;