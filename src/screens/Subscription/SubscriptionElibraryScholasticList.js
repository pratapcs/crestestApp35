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
import ScholasticElibraryCard from '../Subscription/SubscriptionComponent/ScholasticElibraryCard';
import Gstyles from '../../styles/GlobalStyle';

import { getOnlyLibraryScData } from '../../store/actions/SubscribeAction';

const SubscriptionElibraryScholasticList = (props) => {

    const dispatch = useDispatch();

    const eLibraryScList = useSelector(state => state.subscribe.eLibraryScList);

    const [categoty, setCategory] = useState(props.route.params.category);
    const [type, setType] = useState('');
    const [classname, setClassName] = useState('');
    // const [board, setBoard] = useState('');
    const [isClass, setIsClass] = useState(true);
    const [defalutSelectValue, setDefalutSelectValue] = useState();

    const [isProfileUpdated, setIsProfileUpdated] = useState('')

    const SubStatus = useSelector(state => state.subscribe.scSubscriptionStatus);
    const eLibrarySelectSubjectsList = useSelector(state => state.subscribe.eLibrarySelectSubjectsList);
    const subscriptionCheckBoxStatus = useSelector(state => state.subscribe.subscriptionCheckBoxStatus);
    const scholasticSubscriptionSourceData = useSelector(state => state.subscribe.scholasticSubscriptionSourceData);
    const competitiveSubscriptionSourceData = useSelector(state => state.subscribe.competitiveSubscriptionSourceData);

    const class_id = useSelector((state) => state.auth.class_id);
    const board = useSelector((state) => state.auth.board,);

    const courseValidity = useSelector(state => state.subscribe.courseValidity);
    const courseAvailable = useSelector(state => state.subscribe.courseAvailable);
    const academicSessionDetals = useSelector(state => state.academic.academicSessionDetals);

    const checkProfile = useSelector(state => state.subscribe.checkProfile);

    useEffect(() => {
        // console.log("%%----", props.route.params.item)
        dispatch(getOnlyLibraryScData(props));
        // dispatch(getOnlyLibraryScData(board, event.target.value != "Select Class" ? event.target.value : '', history));
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

    const addToCart = () => {
        console.log("addToCart----Subscribe----")
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
                    headerName='Subscription e-Library Scholastic List'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />

                {/* {console.log("eLibraryScList---", eLibraryScList != '' ? eLibraryScList : "No Data")} */}
                <ImageBackground source={require('../../assets/images/background_base.png')} style={[Gstyles.imageBackgroundContainer, { paddingVertical: 20, }]} >


                    <View style={Gstyles.courseValidityContainer}>
                        <View>
                            <Text style={Gstyles.academicYearText}>{`Academic Year: ${props?.route.params?.currentSession ? props?.route.params?.currentSession : 'NA'}`}</Text></View>
                        {props?.route.params?.currentSession ?
                            <Text style={Gstyles.courseValidityText}>{`Course Validity: ${getCourseValidityDateformat(courseValidity)}`}</Text>
                            : null}
                        {eLibraryScList.length > 0 && courseValidity ? (
                            courseAvailable == 1 ? null :
                                <View style={Gstyles.courseValidityInfoContainer}>
                                    <Entypo name="info-with-circle" size={12} color={'#d7a300'} />

                                    <Text style={Gstyles.courseValidityText2}> {`After the course validity expires, you can't access any features (All online exam and e-Library)`}</Text>
                                </View>

                        ) : null}
                    </View>

                    {(eLibraryScList != '' && courseValidity != '') ?
                        <FlatList
                            data={eLibraryScList}
                            contentContainerStyle={[Gstyles.subscriptionListParentContainer]}
                            renderItem={({ item, index }) =>
                            (
                                <ScholasticElibraryCard
                                    key={item.id}
                                    id={item.id}
                                    subjectName={item.subject_name}
                                    // card_id={item.combo_elibrary_subject_id}
                                    card_id={item.combo_elibrary_subject_id}
                                    /* subject_id={elibrarySelectFromSubscription.filter(function (obj) {      
                                        return item.combo_elibrary_subject_id.indexOf(obj) !== -1;
                                    })} */
                                    /* subject_id={eLibrarySelectSubjectsList.map(obj => {
                                        //if (item.combo_elibrary_subject_id.includes(obj)) {
                                            // return obj;
                                        //}
                                        return obj;
                                    })} */
                                    // subject_id={scholasticSubscriptionSourceData.map(obj => {
                                    // 	//if (item.combo_elibrary_subject_id.includes(obj)) {
                                    // 	// return obj;
                                    // 	//}
                                    // 	return obj.subject_id;
                                    // })}

                                    subject_cards={scholasticSubscriptionSourceData}
                                    combo_subject_ids={item.combo_elibrary_subject_id}

                                    category_id={categoty}
                                    board={board}
                                    class_no={class_id}
                                    library={item.library_price}
                                    isPurchased={item.is_purchased}
                                    sticker_text={item.sticker_text}
                                    subject_image={item.subject_image}
                                    // subscriptionSelectElibrary={eLibrarySelectSubjectsList}
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



export default SubscriptionElibraryScholasticList;