import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { DrawerActions } from '@react-navigation/native';
import Gstyles from '../../styles/GlobalStyle';
import { container } from '../../styles/Crestest.config';


const OnlineClasses = ({ navigation }) => {
    const [input, setInput] = useState('');

    const leftIconHandeler = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='Online Classes'
                    leftIcon='menu-outline'
                    leftIconHandeler={leftIconHandeler}
                />

                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    {/* <View style={Gstyles.insideOnlineExamParentContainer}> */}
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1,]}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.flex1 ]}>
                            <View style={{ width: 300, height: 200, borderRadius:10, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
                                <Text>Online classes coming soon</Text>
                            </View>
                        </View>
                    </ScrollView>
                    {/* </View> */}
                </ImageBackground>

            </KeyboardAvoidingView>
        </>
    );
};

export default OnlineClasses;