import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    View,
    Text,

} from 'react-native';

// import { alertSoundAction, timeUpAction, timeUsedForExamAction } from '../../../../store/actions/demoExamAction';
import { timeForOtpValidationAction } from '../store/actions/AuthActions';

import Gstyles from '../styles/GlobalStyle';

export default function CounterClockComponent(props) {

    const dispatch = useDispatch();


    const [remainingHours, setRemainingHours] = useState()
    const [remainingMinutes, setRemainingMinutes] = useState()
    const [remainingSeconds, setRemainingSeconds] = useState()
    const [isPlaying, setIsPlaying] = useState(props.isPlaying)
    const [examTime, setExamTime] = useState(props.examTime)
    const [frontColor, setfrontColor] = useState('#F7B801')

    useEffect(() => {
        setExamTime(props.examTime);
        setIsPlaying(props.isPlaying)
    }, [props.examTime, props.isPlaying])

    useEffect(() => {
        if (remainingHours == 0 && remainingMinutes == 4 && remainingSeconds == 59) {
            // console.log("XXXX----04-59")
            // dispatch(alertSoundAction(1))
        }
        if (remainingHours == 0 && remainingMinutes == 4 && remainingSeconds == 57) {
            // console.log("XXXX----04-57")
            // dispatch(alertSoundAction(0))
        }
        if (remainingHours == 0 && remainingMinutes == 0 && remainingSeconds == 0) {
            // console.log("XXXX----0-0")
            // dispatch(timeUpAction(1))
        }

        // console.log("------", remainingHours, remainingMinutes, remainingSeconds)
    }, [remainingHours, remainingMinutes, remainingSeconds])

    return (
        <>
            <View style={Gstyles.counterClockContainer}>
                <View style={Gstyles.timer_container}>
                    <CountdownCircleTimer
                        // isPlaying={isPlaying}
                        isPlaying
                        // duration={examTime * 60}
                        duration={props.duration * 60}
                        // duration={0.10 * 60}
                        colors={['#F7B801', '#F7B801', '#ff0000', '#ff0000',]}
                        // colorsTime={[60, 50, 49, 0]}
                        colorsTime={[50, 20, 20, 0]}
                        strokeWidth={props.strokeWidth} /* 25 */
                        strokeLinecap={props.strokeLinecap} /* round | square | butt */
                        trailColor="#245c75"
                        onComplete={() => [true, 1000]}
                        // initialRemainingTime={examTime * 60}
                        initialRemainingTime={examTime}
                        size={props.size}
                    >
                        {/* {({ remainingTime }) => <Text>{remainingTime}</Text>} */}
                        {/* {({ remainingTime }) => remainingTime} */}
                        {({ remainingTime }) => {
                            // console.log("^^^^^^remainingTime^^^^^^^^^", remainingTime)
                            dispatch(timeForOtpValidationAction(remainingTime));
                            const hours = Math.floor(remainingTime / 3600)
                            const minutes = Math.floor((remainingTime % 3600) / 60)
                            const seconds = remainingTime % 60;
                            return (
                                setRemainingHours(hours),
                                setRemainingMinutes(minutes),
                                setRemainingSeconds(seconds)
                            )
                        }
                        }
                    </CountdownCircleTimer>
                </View>
                <View className="time_counter">{<Text style={Gstyles.remainingText}>Remaining Time : {remainingHours != 0 ? remainingHours + ':' : ''}{remainingMinutes != 0 ? remainingMinutes : remainingMinutes <= 9 ? '0' + remainingMinutes : ''}:{remainingSeconds != 0 && remainingSeconds >= 10 ? remainingSeconds : remainingSeconds <= 9 ? '0' + remainingSeconds : '00'}</Text>}
                </View>
            </View>


        </>
    )
}