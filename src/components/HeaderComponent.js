import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, fonts } from '../styles/Crestest.config';
import { getData } from "../utils/Util";
import { useNavigation } from '@react-navigation/native';


const HeaderComponent = (props) => {

    const navigation = useNavigation();

    const [cartValue, setCartValue] = useState(0)
    const [profile_pic, setProfile_pic] = useState('')
    const [userid, setUserid] = useState('')

    const cartList = useSelector(state => state.subscribe.cartList);

    useEffect(() => {
        async function getUserDetails() {
            let result = await getData("crestestUserDetails");
            result = JSON.parse(result);
            let profile_pic = result['profile_pic'];
            let user_id = result['id'];
            setProfile_pic(profile_pic)
            setUserid(user_id)
        };
        getUserDetails();
    }, []);

    useEffect(() => {
        setCartValue(cartList.length)
    }, [cartList]);

    const goToProfilePage = () => {
        navigation.navigate('nonAuthScenes', {
            screen: 'Profile',
        });
    }

    const goTpCartPage = () => {
        navigation.navigate('nonAuthScenes', {
            screen: 'Cart',
        });
    }

    return (
        <View style={styles.headerParentContainer}>
            <TouchableOpacity onPress={props.leftIconHandeler}>
                <Ionicons name={props.leftIcon} size={25} color={'#fff'} />
            </TouchableOpacity>
            <View><Text style={[styles.headerText, { fontSize: props.headerName.length > 32 ? 12 : 14 }]}>{props.headerName}</Text></View>
            <View style={styles.rightContainer}>

                {profile_pic != '' && profile_pic != null ?
                    props.headerProfileImage ?
                        null
                        :
                        <>
                            <TouchableOpacity onPress={() => userid == 0 ? null : goToProfilePage()} style={styles.profileImageContainer}>
                                <Image source={{ uri: profile_pic }} style={styles.imageStyle} />
                            </TouchableOpacity>
                        </>
                    :
                    props.headerProfileImage ? null :
                        <TouchableOpacity onPress={() => userid == 0 ? null : goToProfilePage()} style={styles.profileImageContainer}>
                            {/* <Image source={{ uri: profile_pic }} style={styles.imageStyle} /> */}
                            <Image source={require('../assets/images/profile.png')} style={styles.imageStyle} />
                        </TouchableOpacity>
                }

                {userid > 0 ?
                    <TouchableOpacity onPress={() => goTpCartPage()} style={styles.cartParentContainer}>
                        <Ionicons name={cartValue > 0 ? 'cart' : 'cart-outline'} size={25} color={'#fff'} onPress={props.rightIconHandeler} />
                        {cartValue > 0 ?
                            <View style={styles.cartCounterContainer}>
                                <Text style={styles.cartCounterValue}>{cartValue > 0 ? cartValue : ''}</Text>
                            </View>
                            : null}
                    </TouchableOpacity>
                    : null}

            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        headerParentContainer: {
            // marginTop: 23,
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            paddingHorizontal: 20,
            height: 40,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.headerBackground,
        },
        headerText: {
            fontFamily: fonts.rLight,
            color: "#fff",
        },
        cartCounterContainer: {
            height: 15,
            width: 15,
            borderRadius: 20,
            backgroundColor: '#ff0000',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: -2,
            right: 1,
        },
        cartCounterValue: {
            top: -2,
            textAlign: 'center',
            // fontSize: 12,
            color: '#fff',
            fontFamily: fonts.rBold,
            fontSize: 12,
        },
        rightContainer: {
            flexDirection: 'row',
            justifyContent: 'center',

        },
        profileImageContainer: {
            width: 26,
            height: 26,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            borderStyle: 'solid',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        },
        cartParentContainer: {
            marginLeft: 12.5,
        },
        imageStyle: {
            width: 26,
            height: 26,
            borderRadius: 20,
            borderWidth: 1,
            // resizeMode:'contain'
        },

    });

export default HeaderComponent;