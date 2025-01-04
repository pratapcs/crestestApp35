import React from 'react';
import {
    View,
    Image,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import Gstyles from '../../styles/GlobalStyle';
import HeaderComponent from '../../components/HeaderComponent';
import { useNavigation } from '@react-navigation/native';


const ClassSchedule = ({ navigation }) => {
    // const navigation = useNavigation();

    const leftIconHandeler = () => {
        navigation.goBack()
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Class Schedule'
                leftIcon='chevron-back'
                leftIconHandeler={leftIconHandeler}
            />
            <View style={Gstyles.parentContainer}>


                <View style={styles.historyListContainer}>
                    {/* <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    > */}
                    {/* <Image source={require('../../assets/images/calender_template.png')} style={styles.imageStyle} /> */}
                        <Text>Online classes coming soon</Text>

                    {/* </ScrollView> */}
                </View>


            </View>
        </>
    );
};

const styles = StyleSheet.create(
    {
        historyListContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        imageStyle: {
            // height: 46,
            // width: 46,
            resizeMode: 'contain',
        },
    });

export default ClassSchedule;