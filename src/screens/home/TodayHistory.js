import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import Gstyles from '../../styles/GlobalStyle';
import HeaderComponent from '../../components/HeaderComponent';
import EventHistoryComponent from '../../components/EventHistoryComponent';
import NoDataComponent from '../../components/NoDataComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getEventHistoryData, getEventHistoryRequestAction, likeEventHistoryData } from '../../store/actions/DashboardAction';



// import { TouchableOpacity } from 'react-native-gesture-handler';

const TodayHistory = (props) => {

    const [like, setLike] = useState(true);
    const dispatch = useDispatch();
    const eventHistoryList = useSelector(state => state.dashboard.eventHistoryList);
    const userId = useSelector((state) => state.auth.id);

    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        dispatch(getEventHistoryData(props));
    }, [like]);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const onLikeHandler = (item) => {
        setLike(!like)
        dispatch(likeEventHistoryData(item.id));
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Today in History'
                leftIcon='chevron-back'
                leftIconHandeler={leftIconHandeler}
            />
            <View style={Gstyles.parentContainer}>

                <ImageBackground source={require('../../assets/images/todayHistoryBackground.png')} style={Gstyles.imageBackgroundContainer} >
                    <View style={Gstyles.dateContainer}>
                        {/* <Text style={Gstyles.dateDetails}>05th August, 2023</Text> */}
                        <Text style={Gstyles.dateDetails}>{eventHistoryList.currentdate} {eventHistoryList.currentmonth} {eventHistoryList.currentyear}</Text>
                    </View>

                    <View style={Gstyles.historyListContainer}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {/* {console.log("currentUserId---12", eventHistoryList.data)} */}
                            {eventHistoryList.data != '' && eventHistoryList.data != undefined && eventHistoryList.data[0].title != 'No Data' ?
                                eventHistoryList.data.map((item, index) => {
                                    return (
                                        <EventHistoryComponent
                                            userId={userId}
                                            data={item}
                                            key={index}
                                            eventYear={item.title}
                                            sub_title={item.sub_title}
                                            is_liked={item.is_liked}
                                            onLikeHandler={() => onLikeHandler(item)}
                                        />
                                    );
                                })
                                :
                                <NoDataComponent />

                            }
                        </ScrollView>
                    </View>

                    {/* <View style={Gstyles.historyImageContainer}>
                        <Image source={require('../../assets/images/book.png')} style={Gstyles.bottomHistoryImage} />
                    </View> */}
                </ImageBackground>
            </View>
        </>
    );
};

export default TodayHistory;