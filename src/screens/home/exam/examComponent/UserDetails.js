import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

//styles
import { colors, containerInside } from '../../../../styles/Crestest.config';

import EntypoIcon from 'react-native-vector-icons/Entypo';


import Emitter from '../../../../utils/Emitter';
import * as Events from '../../../../configs/Events';

import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../../styles/GlobalStyle';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserDetails = (props) => {
    // const navigation = useNavigation();

    const [isShowResendOtp, setIsShowResendOtp] = useState(0);

    const time_used = useSelector(state => state.auth.time_used);

    const onlyNumber = /^[0-9]+$/;

    const dispatch = useDispatch();

    const [userId, setUserId] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [userImage, setUserImage] = useState("")
    const [standard, setStandard] = useState("")
    const [boardName, setBoardName] = useState("")

    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
        // console.log("@2222----route--", props.params)
        // console.log("@11111----route--", props)
    }, []);

    useEffect(() => {
        useDetailsData()
    }, []);

    async function useDetailsData() {

        let getData = await AsyncStorage.getItem('crestestUserDetails');
        // console.log("+++++++222+++++", getData)
        let token = JSON.parse(getData).token;
        let userId = JSON.parse(getData).id;
        let fname = JSON.parse(getData).fname;
        let lname = JSON.parse(getData).lname;
        let profile_pic = JSON.parse(getData).profile_pic;
        let standard = JSON.parse(getData).standard;
        let board_name = JSON.parse(getData).board_name;
        setUserId(userId);
        setFname(fname);
        setLname(lname);
        setUserImage(profile_pic);
        setStandard(standard);
        setBoardName(board_name);

    }

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    return (
        <>

            <View style={[containerInside, Gstyles.rbSheetStyle]}>

                <TouchableOpacity style={Gstyles.modalRbCloseButtonContainer} onPress={closeVerificationOption}>
                    <EntypoIcon name="cross" size={25} color={colors.backgroundDeepGray} />
                </TouchableOpacity>

                <View style={Gstyles.userDetailsParentContainer}>

                    <View style={Gstyles.userDetailsContainer}>
                        <View style={Gstyles.userHeading}><Text style={Gstyles.userHeadingText}>User Details</Text></View>
                        <View style={Gstyles.userImageContainer}>
                            {userImage != '' && userImage != null ?
                                <Image source={{ uri: userImage }} style={Gstyles.imageStyle} />
                                :
                                <Image source={require('../../../../assets/images/profile.png')} style={Gstyles.imageStyle} tintColor={"#2d637b"} />
                            }
                        </View>
                        <View>
                            <View style={Gstyles.userHeading}>
                                <Text style={Gstyles.userHeadingText}>{fname} {lname}</Text>
                            </View>
                            {userId != 0 ?
                                <View style={Gstyles.userdetailsContainer}>
                                    <View style={Gstyles.userdetailsIndividualContainer}><Text style={Gstyles.userdetailsIndividualText}>Class: <Text style={Gstyles.userdetailsIndividualHighlightText}>{standard}</Text></Text></View>
                                    <View style={Gstyles.userdetailsIndividualContainer}><Text style={Gstyles.userdetailsIndividualText}>Board: <Text style={Gstyles.userdetailsIndividualHighlightText}>{boardName}</Text></Text></View>
                                </View>
                                : null}
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

export default UserDetails;

const styles = StyleSheet.create(
    {


    })