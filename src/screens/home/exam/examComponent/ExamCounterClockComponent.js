import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    View,
    Text,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { alertSoundAction, timeUpAction, timeUsedForExamAction } from '../../../../store/actions/demoExamAction';
import { timeForOtpValidationAction } from '../../../../store/actions/AuthActions';

// import Gstyles from './styles/GlobalStyle';
import Gstyles from '../../../../styles/GlobalStyle';

export default function ExamCounterClockComponent(props) {

    const dispatch = useDispatch();

    const [remainingHours, setRemainingHours] = useState();
    const [remainingMinutes, setRemainingMinutes] = useState();
    const [remainingSeconds, setRemainingSeconds] = useState();
    const [isPlaying, setIsPlaying] = useState(props.isPlaying);
    const [examTime, setExamTime] = useState(props.examTime);
    const [countdownCircleTimerKey, setCountdownCircleTimerKey] = useState(1);
    const [frontColor, setfrontColor] = useState('#F7B801');
    const [examSubmit, setExamSubmit] = useState(0);

    useEffect(() => {
        setExamTime(props?.examTime);
        setIsPlaying(props?.isPlaying);
    }, [props?.examTime, props?.isPlaying])

    const timeUpWarning = useSelector((state) => state.questionNo.timeUpWarning);

    useEffect(() => {
        if (remainingHours == 0 && remainingMinutes == 4 && remainingSeconds == 59) {
            // console.log("XXXX----04-59")
            dispatch(alertSoundAction(1))
        }
        if (remainingHours == 0 && remainingMinutes == 4 && remainingSeconds == 54) {
            // console.log("XXXX----04-57")
            dispatch(alertSoundAction(0))
        }
        if (remainingHours == 0 && remainingMinutes == 0 && remainingSeconds == 0) {
            // console.log("XXXX----0-0")
            setExamSubmit(1)
            // dispatch(timeUpAction(1))
        }

        // console.log("------", remainingHours, remainingMinutes, remainingSeconds)
    }, [remainingHours, remainingMinutes, remainingSeconds])

    return (
        <>
            <View style={Gstyles.examCounterClockContainer}>
                <View style={Gstyles.examTimer_container}>
                    <CountdownCircleTimer
                        key={countdownCircleTimerKey}
                        isPlaying={isPlaying}
                        duration={examTime}
                        colors={['#F7B801', '#F7B801', '#ff0000', '#ff0000',]}
                        colorsTime={[examTime * 60, 301, 300, 0]}
                        strokeWidth={0}
                        strokeLinecap={'square'}
                        trailColor="#245c75"
                        onComplete={() => {
                            setIsPlaying(false);
                            setCountdownCircleTimerKey(countdownCircleTimerKey + 1);
                            setExamTime(0);
                            dispatch(timeUpAction(1))
                        }}
                        onUpdate={async (remainingTime) => {
                            let getData = await AsyncStorage.getItem('crestestUserDetails');
                            let token = JSON.parse(getData).token;
                            if (token == '' || !token) {
                                setIsPlaying(false)
                            }

                        }}
                    >

                        {({ remainingTime }) => {
                            // console.log("^^^^^^remainingTime^^^^^^^^^", remainingTime, isPlaying);
                            dispatch(timeForOtpValidationAction(remainingTime));
                            dispatch(timeUsedForExamAction(remainingTime));
                            const hours = isPlaying ? Math.floor(remainingTime / 3600) : !isPlaying && remainingTime > 0 && examSubmit == 0 ? Math.floor(remainingTime / 3600) : 0;
                            const minutes = isPlaying ? Math.floor((remainingTime % 3600) / 60) : !isPlaying && remainingTime > 0 && examSubmit == 0 ? Math.floor((remainingTime % 3600) / 60) : 0;
                            const seconds = isPlaying && remainingTime >= 0 ? remainingTime % 60 : !isPlaying && remainingTime > 0 && examSubmit == 0 ? remainingTime % 60 : 0;
                            //console.log("seconds", seconds);
                            return (
                                setRemainingHours(hours),
                                setRemainingMinutes(minutes),
                                setRemainingSeconds(seconds)
                            )
                        }
                        }
                    </CountdownCircleTimer>
                </View>
                {/* remainingMinutes < 5 */}
                <View>{<Text style={remainingHours == 0 && remainingMinutes <= 4 && remainingSeconds <= 59 ? Gstyles.examRemainingTextRed : Gstyles.examRemainingTextWhite}>{`${remainingHours != 0 ? remainingHours + ':' : ''}${remainingMinutes != 0 && remainingMinutes > 10 ? remainingMinutes : remainingMinutes < 10 ? '0' + remainingMinutes : '10'}:${remainingSeconds != 0 && remainingSeconds > 10 ? remainingSeconds : remainingSeconds < 10 ? '0' + remainingSeconds : '10'}`}</Text>}
                </View>
            </View>


        </>
    )
}