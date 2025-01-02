import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import { getData } from "../../utils/Util";

import CategoryCard from "../../components/CategoryCard"

import { getLibraryCategoryData, getArchiveLibraryCategoryData,} from '../../store/actions/ExamCategoryAction';

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"


const ArchivePerformanceELibraryCategory = (props) => {

    const dispatch = useDispatch();

    const librarycategoryList = useSelector(state => state.category.librarycategoryList);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);

    const [userid, setUserid] = useState('');
    const [elibraryCategory, setElibraryCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log("route=====", props.route.params.id)
        // dispatch(getLibraryCategoryData(props));
        dispatch(
            getArchiveLibraryCategoryData(
                props.route.params.class_id,
                archiveLibraryCategoryCallBack,
                props
            )
        );
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

    const archiveLibraryCategoryCallBack = (data) => {
        setElibraryCategory(data);
        setLoading(false);
    };

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const goToNewPage = (id) => {
        if (id == 1) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "ArchiveELibraryScholasticPerformanceScore",
                params: { categoryId: id, class_id: props.route.params.class_id }
            });
        } else if (id == 2) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "ArchiveELibraryCompetitiveCategoryPerformance",
                params: { categoryId: id, class_id: props.route.params.class_id }
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
                    headerName='Archive e-Library Performance Score'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <View style={Gstyles.insideOnlineExamParentContainer}>
                    {elibraryCategory.length !== 0 && <ScrollView
                        keyboardShouldPersistTaps="handled"
                        // contentContainerStyle={Gstyles.scrollViewContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {elibraryCategory.map((item, ind) => (
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

export default ArchivePerformanceELibraryCategory;