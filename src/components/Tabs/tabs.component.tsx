import React, { Fragment, useState } from 'react';

import {
    OptionText,
    OptionWrapper,
    OptionsContainer,
    TabsContainer
} from './tabs.styles';


interface TabsProps {
    children: React.ReactNode[],
    defaultIndex?: number,
    tabNames: string[]
}

const Tabs: React.FC<TabsProps> = ({children, defaultIndex, tabNames}) => {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex? defaultIndex: 0)


    return (
        <Fragment>
            <TabsContainer>
                <OptionsContainer>
                    {
                        tabNames.map((name, index) => {
                            return (
                                <OptionWrapper
                                key={index}
                                onPress={() => setCurrentIndex(index)}
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