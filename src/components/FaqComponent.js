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

import Ionicons from 'react-native-vector-icons/Ionicons';

import Collapsible from 'react-native-collapsible';

import AsyncStorage from '@react-native-async-storage/async-storage';


const FaqComponent = (props) => {

    const [userId, setUserId] = useState("")
    const [collapsed, setCollapsed] = useState(true)

    useEffect(() => {
        useDetailsData();
    }, []);

    async function useDetailsData() {
        let getData = await AsyncStorage.getItem('crestestUserDetails');
        let userId = JSON.parse(getData).id;
        setUserId(userId);
    }

    const regex = /(<([^>]+)>)/ig;
    // const result = props.data.description.replace(regex, '');
    // <Text>{props.question}</Text>
    // <Text>{props.answer}</Text>

    return (
        <>
            <TouchableOpacity style={styles.parentCotainer} onPress={() => setCollapsed(!collapsed)}>
                <View style={styles.counterContainer}>
                    <Text>{props.listNumber}</Text>
                </View>
                <View style={styles.questionParentContainer}>
                    <View style={styles.questionContainer}>
                        <Text>{props.question}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        
                        <Ionicons name={collapsed ? 'chevron-forward-outline' : 'chevron-down-sharp'} size={22} color={'#000000'} />
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                <Collapsible collapsed={collapsed} style={styles.collapsedParentContainer} align="center">

                    <View style={styles.textContent}>
                        <Text>{props.answer}</Text>
                    </View>
                </Collapsible>
            </View>

        </>
    );
};

const styles = StyleSheet.create(
    {
        parentCotainer: {
            width: '100%',
            // justifyContent:'space-between',
            alignItems: 'center',
            // borderWidth:1,
            height: 60,
            marginBottom: 5,
            flexDirection: 'row',
            paddingHorizontal: 10,
            backgroundColor: '#FCBF04',
            borderRadius: 5,
        },
        counterContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 5,
            backgroundColor: '#ff0',
            marginRight: 10,
        },
        questionParentContainer: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
        },
        questionContainer: {
            width: '85%'
        },
        arrowContainer: {
            width: 20,
            height: 20,
            marginLeft: 20,
        },
        collapsedParentContainer:
        {
        },
        textContent: {
            marginBottom:10,
            backgroundColor:'#FFFA99',
            padding:10,
        }

    });

export default FaqComponent;