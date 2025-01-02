import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Dimensions,
} from 'react-native';
import Gstyles from '../../styles/GlobalStyle';
import HeaderComponent from '../../components/HeaderComponent';
import NoDataComponent from '../../components/NoDataComponent';
import CourseComponent from '../../components/CourseComponent';


const Course = ({ navigation }) => {

    const leftIconHandeler = () => {
        navigation.goBack()
    }
    
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='Course'
                leftIcon='chevron-back'
                leftIconHandeler={leftIconHandeler}
            />
            <View style={Gstyles.parentContainer}>
                

                <View style={Gstyles.historyListContainer}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <CourseComponent 
                        width={Dimensions.get('window').width-30}
                         marginHorizontal={15}
                         marginTop={30}
                            CourseName='S'
                        />
                        <CourseComponent 
                         width={Dimensions.get('window').width-30}
                         marginHorizontal={15}
                         marginTop={30}
                            CourseName='C'
                        />
                        
                    </ScrollView>
                </View>


            </View>
        </>
    );
};

export default Course;