import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

// import CategoryCard from "../../components/CategoryCard"
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { getPurchasedList, getInvoicePDFData, subscribeLoading } from '../../store/actions/SubscribeAction';

import PurchaseCard from '../Subscription/SubscriptionComponent/PurchaseCard';


const MyPurchasedList = (props) => {

    const dispatch = useDispatch();

    const transationDetails = useSelector(state => state.subscribe.transationDetails);


    useEffect(() => {
        dispatch(getPurchasedList(props));
    }, []);

    const leftIconHandeler = () => {
        // props.navigation.goBack()
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const downloadPdfHandler = async (id) => {
        console.log("downloadPdfHandler----", id)
        dispatch(getInvoicePDFData(parseInt(id), true));
        /* let options = {
            html: '<h1>PDF TEST</h1>',
            fileName: 'test',
            directory: 'Documents',
        };

        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        alert(file.filePath); */
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
                    headerName='My Purchased List'
                    leftIcon='menu-outline'
                    leftIconHandeler={leftIconHandeler}
                />

                {/* {console.log("transationDetails-----", transationDetails)} */}
                <ImageBackground source={require('../../assets/images/background_base.png')} style={[Gstyles.imageBackgroundContainer, { paddingVertical: 10,}]} >
                    <View style={{ flex: 1}}>
                        {(transationDetails != '') ?
                            <FlatList
                                data={transationDetails}
                                contentContainerStyle={[Gstyles.purchaseListParentContainer]}
                                numColumns={2}
                                // ListEmptyComponent={this.noItemDisplay}
                                renderItem={({ item, index }) =>
                                (
                                    <PurchaseCard
                                        payment_trans_id={item.payment_trans_id}
                                        created_at={item.created_at}
                                        paid_amount={item.paid_amount}
                                        downloadPdfHandler={downloadPdfHandler}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <View style={Gstyles.noDataContainer}><Text>No Data</Text></View>
                        }
                    </View>
                </ImageBackground>



            </KeyboardAvoidingView>
        </>

    );
};

export default MyPurchasedList;