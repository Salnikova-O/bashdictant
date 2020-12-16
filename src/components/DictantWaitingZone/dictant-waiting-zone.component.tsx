import React, { useEffect, useState } from 'react';
import moment, {Moment} from 'moment';

import { ZoneContainer, Time,TimerTitle } from './dictant-waiting-zone.styles';
import Button from '../../UI/Button/Button.component';
import { useLanguage } from '../LanguageProvider/language.provider';
import { useTheme } from 'styled-components';

interface WaitingProps {
    showDictant?: () => void,
    startingDate: Date,
    hideButton?:boolean,
    reverseColors?: boolean
}

const DictantWaitingZone: React.FC<WaitingProps> = ({showDictant, startingDate, hideButton, reverseColors}) => {
    const {language} = useLanguage()
    const theme = useTheme()
    const [timeLeft, setTimeLeft] = useState<number>(moment(startingDate).utc().isAfter(moment().utc())? moment(startingDate).utc().diff(moment()): 0)
    


    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(c => {
                if (c<1000) {
                    clearInterval(interval)
                    return 0
                } else {
                    return c - 1000
                }
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])



    return (
        <ZoneContainer>
            <TimerTitle reverse={reverseColors}>{timeLeft<86400001?language.timer.title: language.timer.longTitle}</TimerTitle>
            <Time reverse={reverseColors}>{timeLeft<86400001? moment(timeLeft).utc().format('HH:mm:ss'): moment(startingDate).format('DD/MM/YYYY HH:mm')}</Time>
            {
                !hideButton&&showDictant?
                <Button
                text={language.timer.connect}
                bg={theme.palette.buttons.primary}
                font={theme.palette.text.primary}
                height={'50px'}
                onPress={showDictant}
                disabled={timeLeft!==0}
                />
                : null
            }
        </ZoneContainer>
    )
}


export default DictantWaitingZone;