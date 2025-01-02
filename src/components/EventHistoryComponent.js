import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal
} from 'react-native';
const rBold = 'Roboto-Bold';
const rRegular = "Roboto-Regular";

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import Collapsible from 'react-native-collapsible';

import AsyncStorage from '@react-native-async-storage/async-storage';

const trasparent = 'rgba(0,0,0,0.5)';

const EventHistoryComponent = (props) => {
    // "11th August, 1962",
    const [year, setYear] = useState(props.eventYear)
    const [onlyEventYear, setOnlyEventYear] = useState("")
    const [currentUserId, setCurrentUserId] = useState(props.userId)
    const [collapsed, setCollapsed] = useState(true)

    const [userId, setUserId] = useState("")

    useEffect(() => {
        // console.log("currentUserId---", currentUserId, props.userId, props.eventYear)
        // let onlyYear = year.split(' ')
        // let finalYear = onlyYear[onlyYear.length - 1];
        setOnlyEventYear(year.trim().slice(-4))

        useDetailsData();
    }, []);

    async function useDetailsData() {

        let getData = await AsyncStorage.getItem('crestestUserDetails');
        // console.log("+++++++222+++++", getData)
        let userId = JSON.parse(getData).id;

        setUserId(userId);
    }

    const regex = /(<([^>]+)>)/ig;
    const result = props.data.description.replace(regex, '');

    return (
        <>
            <View style={styles.parentCotainer}>
                <View style={styles.boxParentContainer}>
                    <View style={styles.leftBoxContainer}>
                        <Text style={styles.eventYear}>{onlyEventYear}</Text>
                        {/* <TouchableOpacity
                            onPress={() => setCollapsed(!collapsed)} style={styles.detailsContainer}
                        >
                            <Text style={styles.detailsText}>Details</Text>
                        </TouchableOpacity> */}
                    </View>
                    <TouchableOpacity onPress={() => setCollapsed(!collapsed)} style={styles.middleBoxContainer}>
                        <ScrollView
                            overScrollMode={'never'}
                            // style={{ zIndex: 10 }}
                            scrollEventThrottle={16}
                            keyboardShouldPersistTaps="handled"
                            // contentContainerStyle={styles.middleBoxContainer}
                            showsVerticalScrollIndicator={false}

                        >
                            <Text style={styles.eventDescription}>{props.sub_title}</Text>

                        </ScrollView>
                    </TouchableOpacity>

                    {/* {console.log("data----", props.data)} */}
                    <View style={styles.rightBoxContainer}>
                        {userId != 0 ?
                            props.is_liked == 0 ?
                                <TouchableOpacity style={styles.likeContainer} onPress={props.onLikeHandler}>
                                    <IconFontAwesome name="thumbs-o-up" size={20} color={'#fff'} />
                                </TouchableOpacity>
                                :
                                <View style={styles.alreadyLikeContainer}>
                                    <IconFontAwesome name="thumbs-up" size={20} color={'#245C75'} />
                                </View>
                            :
                            null
                        }
                    </View>
                </View>
                <View>
                    {/* {console.log("props.data.event_image---", props.data.event_image)} */}
                    {/* <Image source={{ uri: 'https://admin.clvdev.in/assets/special_charectors/tag_image-1705388286337.jpeg' }} style={styles.imageStyle} /> */}
                    <Collapsible collapsed={collapsed} style={styles.collapsedParentContainer} align="center">

                        <View style={styles.textContent}>
                            <Text style={styles.titleHeading}>{props.data.title}</Text>
                            <Text style={styles.titleDescription}>
                                {/* {props.data.description} */}
                                {result}
                            </Text>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: props.data.event_image }} style={styles.imageStyle} />
                            </View>
                        </View>
                    </Collapsible>
                </View>
            </View>
            
        </>
    );
};

const styles = StyleSheet.create(
    {
        parentCotainer: {
            flexDirection: 'column',
            /* elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            shadowOpacity: 1, */
            marginHorizontal: 15,
            marginBottom: 15,
            // borderWidth: 2,
            // borderColor: '#AEB3B2',
            // borderBottomRightRadius: 10,
            // borderBottomLeftRadius: 10,
            // backgroundColor: '#ff0000',
            // minHeight: 70,
            // maxHeight: 100,
            // height: 100,
        },
        boxParentContainer: {
            // width: 160,
            minHeight: 70,
            maxHeight: 100,
            // height: 100,
            borderRadius: 5,
            backgroundColor: "#fff",
            borderStyle: 'solid',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            position: 'relative'
        },
        leftBoxContainer: {
            flex: .3,
            height: '100%',
            backgroundColor: '#90B817',
            justifyContent: 'center',
            alignItems: 'center'
        },
        middleBoxContainer: {
            flex: 1,
            height: '100%',
            padding: 5,
            justifyContent: 'center',
        },
        rightBoxContainer: {
            flex: .3,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: '#ff0000',
        },
        eventYear: {
            fontSize: 16,
            fontFamily: rRegular,
            color: '#fff'
        },
        eventDescription: {
            fontSize: 14,
            fontFamily: rRegular,
            color: '#245C75'
        },
        likeContainer: {
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: "#245C75",
            justifyContent: 'center',
            alignItems: 'center'
        },
        alreadyLikeContainer: {
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#245C75",
            borderStyle: 'solid',
            justifyContent: 'center',
            alignItems: 'center'
        },
        collapsedParentContainer: {
            position: 'absolute',
            width: '100%',
            backgroundColor: '#CCCCCC',
            // borderWidth: 1,
            // borderColor: '#ff0000',
            // zIndex: 100,
            // top: -10,
            // borderBottomRightRadius: 10,
            // borderBottomLeftRadius: 10,
            padding: 5,
            paddingHorizontal:10,
            flexDirection: 'row'
        },
        imageContainer: {
            flex: 1,
            height: 170,
            // width: 100,
            // borderWidth: 1,
            // borderColor: '#ff0000',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageStyle: {
            flex: .7,
            width: 120,
            height: 120,
            // width: 100,
            // height: 100,
            resizeMode: 'contain',
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 100,
        },
        detailsText: {
            // alignSelf:'flex-end',
            fontSize: 12,
            fontFamily: rRegular,
            color: '#245C75'
        },
        detailsContainer: {
            padding: 2,
            width: 50,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            // alignSelf: 'flex-end',
            marginTop: 10,
            borderRadius: 5,
        },
        titleHeading: {
            fontSize: 16,
            fontFamily: rRegular,
            color: '#245C75'
        },
        titleDescription: {
            fontSize: 14,
            fontFamily: rRegular,
            color: '#245C75'
        },
        



    });

export default EventHistoryComponent;