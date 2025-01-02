import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
} from 'react-native';
import Gstyles from '../../styles/GlobalStyle';
import HeaderComponent from '../../components/HeaderComponent';
import CurrentStatusComponent from '../../components/CurrentStatusComponent';
import { useSelector } from 'react-redux';

const statusList = [
    {
        id: 1,
        descriptionText: 'Register on Crestest',
        iconName: 'user-plus',
    },
    {
        id: 2,
        descriptionText: 'Customize your own course',
        iconName: 'box-open',
    },
    {
        id: 3,
        descriptionText: 'Facilitate self discovery with online exam',
        iconName: 'clock',
    },
    {
        id: 4,
        descriptionText: 'Access CMC',
        iconName: 'laptop',
    },
    {
        id: 5,
        descriptionText: 'Join NBF new platform for online classes',
        iconName: 'desktop',
    },

]


const CurrentStatus = (props) => {

    const work_status = useSelector((state) => state.auth.work_status);
    const work_status_percentage = useSelector(state => state.auth.work_status_percentage);

    const leftIconHandeler = () => {
        props.navigation.goBack();
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Current Status'
                leftIcon='chevron-back'
                leftIconHandeler={leftIconHandeler}
            />
            <View style={Gstyles.firstContainer}>
                <View style={Gstyles.roundContainer}>
                    <Text style={Gstyles.statusHeading}>{work_status_percentage}%</Text>
                    <Text style={Gstyles.statusSubHeading}>Completed</Text>
                </View>
                <View style={Gstyles.mapBoxContainer}>
                    {
                        statusList.map((item, index) => {
                            return (
                                <CurrentStatusComponent
                                    key={item.id}
                                    serialId={item.id}
                                    iconName={item.iconName}
                                    descriptionText={item.descriptionText}
                                    work_status={work_status}
                                />
                            );
                        })
                    }

                </View>
            </View>
        </>
    );
};

export default CurrentStatus;