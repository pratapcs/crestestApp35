import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import { getData } from "../../utils/Util";

import CategoryCard from "../../components/CategoryCard"

import { getLibraryCategoryData, } from '../../store/actions/ExamCategoryAction';

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"

import { useNavigation } from '@react-navigation/native';


const PerformanceELibraryCategory = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const librarycategoryList = useSelector(state => state.category.librarycategoryList);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);

    const [userid, setUserid] = useState('');


    useEffect(() => {
        // console.log("route=====", props.route.params.id)
        dispatch(getLibraryCategoryData(props));
    }, []);

    useEffect(() => {
        async function getUserDetails() {
            let result = await getData("crestestUserDetails");
            result = JSON.parse(result);
            let userId = result['id'];
            setUserid(userId)
        };
        getUserDetails();
    }, []);


    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const goToNewPage = (id) => {
        if (id == 1) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "ELibraryScholasticPerformanceScore",
                params: { categoryId: id }
            });
        } else if (id == 2) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "ELibraryCompetitiveCategoryPerformance",
                params: { categoryId: id }
            });
        }

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
                    headerName='e-Library Performance Score'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <View style={Gstyles.insideOnlineExamParentContainer}>
                    {librarycategoryList.length !== 0 && <ScrollView
                        keyboardShouldPersistTaps="handled"
                        // contentContainerStyle={Gstyles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {librarycategoryList.map((item, ind) => (
                            <CategoryCard
                                key={ind}
                                id={item.id}
                                disabled={item?.is_access_library === 0}
                                category={item.category}
                                online_subheading={item.performance_e_library_sub_heading}
                                iconImage={item.performance_e_library}
                                goToNewPage={() => goToNewPage(item.id)}
                            // userid={c}
                            />
                        )
                        )}

                    </ScrollView>
                    }
                    {advertisementDetails?.[1] != '' ?
                        <AdComponent
                            adImage={advertisementDetails?.[1]}
                        />
                        : null}
                </View>



            </KeyboardAvoidingView>
        </>

    );
};

export default PerformanceELibraryCategory;