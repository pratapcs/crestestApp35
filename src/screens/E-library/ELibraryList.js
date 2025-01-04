import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import ELibrarySubjectCard from './ElibraryComponents/ELibrarySubjectCard';
import moment from 'moment';

import AlertComponent from "../../components/AlertComponent"

import { elibraryGetsubjectListDetails, elibraryGetsubjectListAction } from '../../store/actions/LibraryAction';

import { getAcademicSessionExistForExamDetails } from '../../store/actions/AcademicActions';

const ELibraryList = (props) => {

    const dispatch = useDispatch();

    const [subExpiryMessage, setSubExpiryMessage] = useState(false)

    const elibraryGetsubjectList = useSelector(state => state.elibrary.elibraryGetsubjectList,);

    const courseValidity = useSelector(state => state.subscribe.courseValidity);
    const courseAvailable = useSelector(state => state.subscribe.courseAvailable);
    const academicSessionDetals = useSelector(state => state.academic.academicSessionDetals);

    useEffect(() => {
        console.log("route=====", props.route.params) //2 = SCholastic 3 = Competitive
        if (props.route.params.isScholasticOrCompetitive == 2) {
            dispatch(elibraryGetsubjectListDetails(1, '', props));
            dispatch(getAcademicSessionExistForExamDetails(1, props));
        } else if (props.route.params.isScholasticOrCompetitive == 3) {
            dispatch(elibraryGetsubjectListDetails(2, props.route.params.item.id, props));
        }
    }, []);

    useEffect(() => {
        if (academicSessionDetals?.couese_exist !== 1 && academicSessionDetals?.msg) {
            //   swal(props.academicSessionDetals?.msg);
            setSubExpiryMessage(true)
        } else if (
            academicSessionDetals?.couese_exist == 1 &&
            academicSessionDetals?.show_alert_msg == 1 && academicSessionDetals?.msg
        ) {
            //   swal(props.academicSessionDetals?.msg);
            setSubExpiryMessage(true)
        }
    }, [academicSessionDetals]);

    useEffect(() => {
        return () => {
            dispatch(elibraryGetsubjectListAction([]));
        }
    }, []);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const goToSubjectWiseListPage = (item) => {
        // console.log("pageName--", item)
        props.navigation.navigate('nonAuthScenes', {
            screen: 'ELibraryListSubjectWise',
            params: { subject_id: item.subject_id, item: item, isScholasticOrCompetitive: props.route.params.isScholasticOrCompetitive, type_name: props.route.params.item.type_name }
        });
    }

    const getCourseValidityDate = (startDate, endDate) => {
        let output = "NA";
        if (startDate && endDate) {
            let formattedStartDate = moment(startDate).format("DD/MM/YYYY");
            let formattedEndDate = moment(endDate).format("DD/MM/YYYY");
            output = `${formattedStartDate} - ${formattedEndDate}`;
        }
        return output;
    }

    const modalShowOff = () => {
        setSubExpiryMessage(false)
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                {/* {console.log("props.route.params.item.type_name-----,", props.route.params.item.type_name)} */}
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName={`${props.route.params.isScholasticOrCompetitive == 2 ? 'Scholastic' : props.route.params.isScholasticOrCompetitive == 3 ? 'Competitive' : null} e-Library ${props.route.params.item.type_name != undefined ? props.route.params.item.type_name : ''} List`}
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                {/* {console.log("+++++111", elibraryGetsubjectList)} */}

                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    {props.route.params.isScholasticOrCompetitive === 2 ?
                        <View style={Gstyles.courseInfoContainer}>
                            <Text style={Gstyles.courseValidityText}>{`Academic Year : ${academicSessionDetals.academic_year}`}</Text>
                            <Text style={Gstyles.courseValidityText}>{`Course Validity: ${getCourseValidityDate(academicSessionDetals?.course_start_date, academicSessionDetals?.course_end_date)}`}</Text>
                        </View>
                        : null}

                    <View style={Gstyles.insideParentContainer}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={Gstyles.scrollViewContainer}
                            showsVerticalScrollIndicator={false}
                        >

                            {
                                elibraryGetsubjectList.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ELibrarySubjectCard
                                                subject_name={item.name}
                                                library_exist={item.library_exist}
                                                subject_color_code={item.subject_color_code}
                                                subject_id={item.subject_id}
                                                subject_elibrary_image={item.subject_elibrary_image}
                                                goToSubjectWiseListPage={() => goToSubjectWiseListPage(item)}
                                            />
                                        </React.Fragment>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
                </ImageBackground>

                {
                    academicSessionDetals && props.route.params.isScholasticOrCompetitive === 2 ?
                        <AlertComponent
                            isVisable={subExpiryMessage}
                            modalHeading={'Warning'}
                            modalDetails={academicSessionDetals.msg}
                            closeModal={() => modalShowOff()}
                            isCloseRequire={true}
                            isOkRequire={false}
                        />
                        :
                        null
                }

            </KeyboardAvoidingView>
        </>

    );
};

export default ELibraryList;