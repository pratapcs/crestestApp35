import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    View,
    Text,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    FlatList
} from 'react-native';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';

import HeaderComponent from '../../components/HeaderComponent';
import { container } from '../../styles/Crestest.config';
import CompetitiveElibraryCard from '../Subscription/SubscriptionComponent/CompetitiveElibraryCard';
import Gstyles from '../../styles/GlobalStyle';
import { getOnlyLibraryCmData, getOnlyLibraryCmAction } from '../../store/actions/SubscribeAction';



const SubscriptionElibraryCompetitiveList = (props) => {

    const dispatch = useDispatch();

    const [type, setType] = useState('');
    const [categoty, setCategory] = useState('');
    const [isProfileUpdated, setIsProfileUpdated] = useState('')

    const eLibraryCmList = useSelector(state => state.subscribe.eLibraryCmList);

    const SubStatus = useSelector(state => state.subscribe.scSubscriptionStatus);
    const eLibrarySelectSubjectsList = useSelector(state => state.subscribe.eLibrarySelectSubjectsList);
    const subscriptionCheckBoxStatus = useSelector(state => state.subscribe.subscriptionCheckBoxStatus);
    const scholasticSubscriptionSourceData = useSelector(state => state.subscribe.scholasticSubscriptionSourceData);
    const competitiveSubscriptionSourceData = useSelector(state => state.subscribe.competitiveSubscriptionSourceData);

    const courseValidity = useSelector(state => state.subscribe.courseValidity);
    const courseAvailable = useSelector(state => state.subscribe.courseAvailable);
    const academicSessionDetals = useSelector(state => state.academic.academicSessionDetals);

    const class_id = useSelector((state) => state.auth.class_id);
    const board = useSelector((state) => state.auth.board,);

    const checkProfile = useSelector(state => state.subscribe.checkProfile);

    useEffect(() => {
        console.log("******------", props.route.params.item)
        setType(props.route.params.item.id)
        setCategory(props.route.params.item.exam_category_id)
        dispatch(getOnlyLibraryCmData(props.route.params.item.id, props));

    }, []);

    useEffect(() => {
        if (checkProfile?.isComplete == 1) {
            setIsProfileUpdated(1)
        } else {
            setIsProfileUpdated(0)
        }
    }, [checkProfile]);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const getCourseValidityDateformat = (date) => {
        let output = "NA";
        if (date) {
            let validityDate = date.split("-");
            let startDate = `${validityDate[0]}-${validityDate[1]}-${validityDate[2]}`;
            let endDate = `${validityDate[3]}-${validityDate[4]}-${validityDate[5]}`;
            let formattedStartDate = moment(startDate).format("DD/MM/YYYY");
            let formattedEndDate = moment(endDate).format("DD/MM/YYYY");
            output = `${formattedStartDate} - ${formattedEndDate}`;
        }
        return output;
    };

    const isCompleteStatusUpdate = () => {
        console.log("isCompleteStatusUpdate-----")
        setIsProfileUpdated(0)
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
                    headerName='Subscription e-Library Competitive List'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />

                <ImageBackground source={require('../../assets/images/background_base.png')} style={[Gstyles.imageBackgroundContainer, { paddingVertical: 20, }]} >
                    <View style={Gstyles.courseValidityContainer}>
                        <View>
                            {/* <Text style={Gstyles.academicYearText}>{`Academic Year: ${props?.route.params?.currentSession ? props?.route.params?.currentSession : 'NA'}`}</Text></View> */}
                            <Text style={Gstyles.academicYearText}>{`Academic Year: ${props?.route?.params?.item?.academic_year ? props?.route?.params?.item?.academic_year : 'NA'}`}</Text></View>
                        {props?.route.params?.item?.course_validity.length > 0 ?
                            <Text style={Gstyles.courseValidityText}>{`Course Validity: ${getCourseValidityDateformat(courseValidity)}`}</Text>
                            : null}
                        {courseAvailable === 1 ? null :
                            <View style={Gstyles.courseValidityInfoContainer}>
                                <Entypo name="info-with-circle" size={12} color={'#d7a300'} />

                                <Text style={Gstyles.courseValidityText2}> {`After the course validity expires, you can't access any features (All online exam and e-Library)`}</Text>
                            </View>
                        }
                    </View>

                    {(eLibraryCmList != '' && props?.route.params.item?.course_validity.length > 0) ?
                        <FlatList
                            data={eLibraryCmList}
                            contentContainerStyle={[Gstyles.subscriptionListParentContainer]}
                            renderItem={({ item, index }) =>
                            (
                                <CompetitiveElibraryCard
                                    key={item.id}
                                    id={item.id}
                                    category_id={categoty}
                                    type={type}
                                    typeName={item.type_name}
                                    class_no={class_id}
                                    exam_type_id={item.exam_type_id}
                                    library={item.library_price}
                                    isPurchased={item.is_purchased}
                                    sticker_text={item.sticker_text}
                                    is_select_elibrary_from_subscription={competitiveSubscriptionSourceData}
                                    // parentScreenaddToCartData={() => addToCart()}
                                    courseAvailable={courseAvailable}
                                    checkProfile={checkProfile}
                                    isComplete={isProfileUpdated}
                                    isCompleteStatusUpdate={isCompleteStatusUpdate}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        <View style={Gstyles.noDataContainer}><Text style={Gstyles.noSubText}>Course not available at the moment. Don't worry, new courses will be added soon!</Text></View>
                    }
                </ImageBackground>
            </KeyboardAvoidingView>
        </>

    );
};

const styles = StyleSheet.create(
    {

    });



export default SubscriptionElibraryCompetitiveList;