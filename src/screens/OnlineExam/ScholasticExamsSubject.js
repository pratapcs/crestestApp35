import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderComponent from '../../components/HeaderComponent';
import { colors, fonts, iconeSize } from '../../styles/Crestest.config';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import ModuleMockChapterOption from './onlineComponent/ModuleMockChapterOption'

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import moment from 'moment';

import AlertComponent from "../../components/AlertComponent"
// import AlertComponent from "../../OnlineExam/onlineComponent/AlertOnlineExam"

import { getBoardData, loadingBoardAction } from '../../store/actions/BoardActions';
import { getClassStandardData, loadingClassStandardAction } from '../../store/actions/ClassStandardAction';
import { getBranchScholasticData, loadingBranchScholasticAction, } from '../../store/actions/ScholasticAction';
import { getChapterData, loadingChapterAction, getExamCompletedListData, getChapterAction, examCompletedListSuccessAction } from '../../store/actions/ChapterAction';

import { getPurchasedSubjectData, purchasedSubjectsListRequestAction, getPurchasedGroupListData, getPurchasedSubjectslistScholasticData } from '../../store/actions/SubjectAction';

import { onlineRequestAction, getOnlineScholasticModuleQuestionListData, getOnlineScholasticMockQuestionListData, getscholasticexamsdetailsCasestudytData } from '../../store/actions/OnlineExamAction';

import { getAcademicSessionExistForExamDetails } from '../../store/actions/AcademicActions';



const ScholasticExamsSubject = (props) => {

    const dispatch = useDispatch();

    const getpurchasedGrouplist = useSelector(state => state.subject.getpurchasedGrouplist);
    const getpurchasedSubjectListAsPerGroupId = useSelector(state => state.subject.getpurchasedSubjectListAsPerGroupId);
    const chapterList = useSelector(state => state.chapter.chapterList);
    const examCompletedChapterList = useSelector(state => state.chapter.examCompletedChapterList);

    const [group, setGroup] = useState([]);
    const [groupSelect, setGroupSelect] = useState('');
    const [groupSave, setGroupSave] = useState('');

    const [subject, setSubject] = useState([]);
    const [subjectSelect, setSubjectSelect] = useState('');
    const [subjectSave, setSubjectSave] = useState('');

    const [chapterTest, setChapterTest] = useState([]);
    const [chapterTestSelect, setChapterTestSelect] = useState('');
    const [chapterTestSave, setChapterTestSave] = useState('');

    const [caseStudy, setCaseStudy] = useState([]);
    const [caseStudySelect, setCaseStudySelect] = useState('');
    const [caseStudySave, setCaseStudySave] = useState('');

    const [module, setModule] = useState([]);
    const [moduleSelect, setModuleSelect] = useState('');
    const [moduleSave, setmoduleSave] = useState('');

    const [mock, setMock] = useState([]);
    const [mockSelect, setMockSelect] = useState('');
    const [mockSave, setMockSave] = useState('');

    const [maxChapterSelect, setMaxChapterSelect] = useState(false)
    const [maxChapterSelectMock, setMaxChapterSelectMock] = useState(false)
    const [casestudy_current_no, setCasestudy_current_no] = useState('')
    const [moduleInterm, setModuleInterm] = useState();
    const [mockInterm, setMockInterm] = useState();
    const [module_current_no, setModule_current_no] = useState()
    const [mock_current_no, setMock_current_no] = useState();
    const [purchsedSet, setPurchsedSet] = useState([]);
    const [caseStudyPurchase, setcaseStudyPurchase] = useState('');
    const [moduleDetails, setModuleDetails] = useState('');
    const [disablMmoduleList, setDisablMmoduleList] = useState([]);
    const [mockDetails, setMockDetails] = useState('')
    const [disablMockList, setDisablMockList] = useState([]);

    const [moduleMockChaterList, setModuleMockChaterList] = useState([]);

    const [exam_type, setExam_type] = useState(0)
    const [setlectSet, setSetlectSet] = useState('')
    const [selectModuleMockData, setSelectModuleMockData,] = useState('')
    const [moduleOrMock, setModuleOrMock,] = useState('')

    const [examCategoryId, setExamCategoryId] = useState('')
    const [branchSortCode, setBranchSortCode] = useState('');

    const [subExpiryMessage, setSubExpiryMessage] = useState(false)

    const courseValidity = useSelector(state => state.subscribe.courseValidity);
    const courseAvailable = useSelector(state => state.subscribe.courseAvailable);
    const academicSessionDetals = useSelector(state => state.academic.academicSessionDetals);

    React.useEffect(() => {

        const callUpdateUserDetails = props.navigation.addListener('focus', () => {
            // console.log("focus----1")
            dispatch(examCompletedListSuccessAction([]))
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return callUpdateUserDetails;

    }, []);

    useEffect(() => {
        dispatch(getPurchasedGroupListData(props))
        dispatch(getAcademicSessionExistForExamDetails(1, props));
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
        let group_name = [];
        getpurchasedGrouplist.forEach((ele) => {
            group_name.push(ele.subject_name);
        })
        setGroup(group_name)

    }, [getpurchasedGrouplist]);

    useEffect(() => {
        let subject_name = [];
        getpurchasedSubjectListAsPerGroupId.forEach((ele) => {
            subject_name.push(ele.subject_name);
        })
        setSubject(subject_name)
    }, [getpurchasedSubjectListAsPerGroupId]);

    useEffect(() => {
        // console.log("$$$$--", exam_type, moduleInterm, exam_type, mockInterm )
        // if (examCompletedChapterList != '') {
        setModuleMockChaterList(examCompletedChapterList)
        // console.log("moduleInterm----123--useEffect", moduleInterm)
        // if (exam_type == 2 || exam_type == 3 && moduleInterm == 0) {
        if (exam_type == 2 && moduleInterm == 0 || exam_type == 3 && mockInterm == 0) {
            Emitter.emit(Events.SHOW_PRELOADER);
            ModuleMockChapterOptionHandeler(selectModuleMockData, moduleOrMock, examCompletedChapterList, maxChapterSelect, maxChapterSelectMock, moduleMockChaterList)
        }
        /*}  */

    }, [examCompletedChapterList, maxChapterSelect, maxChapterSelectMock, moduleInterm]);
    // }, [examCompletedChapterList, maxChapterSelect, maxChapterSelectMock, moduleInterm]);  

    useEffect(() => {

        return () => {
            dispatch(examCompletedListSuccessAction([]))
            dispatch(getChapterAction([]));
        };
    }, []);

    useEffect(() => {

        // console.log("----------", exam_type)
        if (exam_type == 1 && chapterTestSave != '') {
            setModuleMockChaterList([])
            dispatch(getExamCompletedListData(chapterTestSave, subjectSave, 1, exam_type, '', groupSave, props))
        } else if (exam_type == 2) {
            setModuleMockChaterList([])
            dispatch(getExamCompletedListData(0, subjectSave, 1, exam_type, '', groupSave, props))
        } else if (exam_type == 3) {
            setModuleMockChaterList([])
            dispatch(getExamCompletedListData(0, subjectSave, 1, exam_type, '', groupSave, props))
        } else if (exam_type == 4) {
            setModuleMockChaterList([])
            dispatch(getExamCompletedListData(0, subjectSave, 1, exam_type, '', groupSave, props))
        }

    }, [exam_type, chapterTestSave]);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const quitRbHandeler = () => {
        setExam_type(0)
        setSubjectSave('')
        dispatch(examCompletedListSuccessAction([]));
        dispatch(getChapterAction([]));
        setChapterTestSave('');
        setmoduleSave('');
        setMockSave('');
        setCaseStudySave('');
    }

    const subjectListHandler = (group_id) => {
        setSubjectSave('')
        setSubject([])
        dispatch(getChapterAction([]));
        setChapterTestSave('');
        setChapterTestSelect('')
        setChapterTest([])
        setSetlectSet('');

        setPurchsedSet([]);

        setmoduleSave('');
        setModule([]);
        setModuleSelect('')

        setMockSave('');
        setMock([]);
        setMockSelect('')

        setCaseStudySave('');
        setCaseStudy([]);
        setCaseStudySelect('')

        dispatch(getPurchasedSubjectslistScholasticData(group_id, props))
    }

    const chtestModuleMockSetHandeler = (subject_id, index) => {
        // console.log("subject_id, index---", subject_id, index)
        setPurchsedSet([]);

        setChapterTestSave('');
        setChapterTest([])
        setChapterTestSelect('')
        dispatch(getChapterAction([]));

        setSetlectSet('');

        setmoduleSave('');
        setModule([]);
        setModuleSelect('')

        setMockSave('');
        setMock([]);
        setMockSelect('')

        setCaseStudySave('');
        setCaseStudy([]);
        setCaseStudySelect('')

        if (subject_id != '') {
            setMaxChapterSelect(getpurchasedSubjectListAsPerGroupId[index].max_chapter_select)
            setMaxChapterSelectMock(getpurchasedSubjectListAsPerGroupId[index].max_chapter_select_mock)

            /* creat ch test list */
            const setTotalData = [];
            var setCountValue = getpurchasedSubjectListAsPerGroupId[index].set_count

            setCountValue.forEach(el => {
                let setText = {};
                setText['name'] = "Test " + JSON.parse(el);
                setText['set_no'] = el;
                setTotalData.push(setText);
            })

            if (getpurchasedSubjectListAsPerGroupId[index].casestudy_count > 0) {
                let caseStudyText = null;
                var caseStudyValue = [getpurchasedSubjectListAsPerGroupId[index].casestudy_count]
                caseStudyValue.forEach(el => {
                    let caseStudyText = {};
                    // caseStudyText['name'] = "Case Study " + JSON.parse(el);
                    caseStudyText['name'] = "Case Studies";
                    caseStudyText['set_no'] = 'cs1';
                    setTotalData.push(caseStudyText);
                })
            }

            setPurchsedSet(setTotalData)

            let chapter_name = [];
            setCountValue.forEach((ele) => {
                let setNumberText = {};
                setNumberText = "Test " + ele
                chapter_name.push(setNumberText);
            })
            if (caseStudyValue) {
                caseStudyValue.forEach((ele) => {
                    let setNumberText = {};
                    setNumberText = "Case Studies"
                    chapter_name.push(setNumberText);
                })
            }
            setChapterTest(chapter_name)

            //caseStudy

            /* const caseStudyTotalData = [];
            var caseText = null;

            for (let i = 0; i < getpurchasedSubjectListAsPerGroupId[index].casestudy_count; i++) {
                let caseText = {};
                caseText['name'] = "Case Study " + (i + 1);
                caseText['casestudy_no'] = i + 1;
                caseStudyTotalData.push(caseText);
            }
            setcaseStudyPurchase(caseStudyTotalData) */

            let caseStudy_name = [];
            for (let i = 0; i < getpurchasedSubjectListAsPerGroupId[index].casestudy_count; i++) {
                let setCaseStudyText = {};
                setCaseStudyText = "Case Study " + (i + 1);
                caseStudy_name.push(setCaseStudyText);
            }
            setCaseStudy(caseStudy_name)
            // console.log("getpurchasedSubjectListAsPerGroupId[index].module_interm", getpurchasedSubjectListAsPerGroupId[index].module_interm)
            setCasestudy_current_no(getpurchasedSubjectListAsPerGroupId[index].casestudy_current_no)
            setModuleInterm(getpurchasedSubjectListAsPerGroupId[index].module_interm)

            //moduleDetails
            const moduleData = [];
            let moduleText = null;
            for (let i = 0; i < getpurchasedSubjectListAsPerGroupId[index].module_count; i++) {
                let moduleText = {};
                moduleText['name'] = "Module " + (i + 1);
                moduleText['module_no'] = i + 1;
                moduleData.push(moduleText);
            }
            setModuleDetails(moduleData)

            let notCurrentNumberModule = []
            moduleData.forEach((ele, i) => {
                if (ele.module_no != getpurchasedSubjectListAsPerGroupId[index].module_current_no) {
                    notCurrentNumberModule.push(i)
                }
            })
            setDisablMmoduleList(notCurrentNumberModule)
            {console.log("getpurchasedSubjectListAsPerGroupId[index]=====", getpurchasedSubjectListAsPerGroupId[index])}
            const moduleData_name = [];
            for (let i = 0; i < getpurchasedSubjectListAsPerGroupId[index].module_count; i++) {
                let setModuleText = '';
                if ((i + 1) < getpurchasedSubjectListAsPerGroupId[index].module_current_no) {
                    setModuleText = <Text style={{ color: "#56c760" }}>Module {(i + 1)} <IconIonicons name={'checkbox-outline'} color={'#56c760'} size={20} /> </Text>;
                } else if ((i + 1) == getpurchasedSubjectListAsPerGroupId[index].module_current_no) {
                    setModuleText = <Text style={{ color: "#245C75" }}>Module {(i + 1)} {getpurchasedSubjectListAsPerGroupId[index].module_interm == 0 || getpurchasedSubjectListAsPerGroupId[index].module_interm == undefined ? '' : `(${getpurchasedSubjectListAsPerGroupId[index].module_interm}/3)`}</Text>;
                } else if ((i + 1) > getpurchasedSubjectListAsPerGroupId[index].module_current_no) {
                    setModuleText = <Text style={{ color: "#484848" }}>Module {(i + 1)} </Text>;
                }
                moduleData_name.push(setModuleText);
            }
            setModule(moduleData_name)

            setModule_current_no(getpurchasedSubjectListAsPerGroupId[index].module_current_no)
            setMockInterm(getpurchasedSubjectListAsPerGroupId[index].mock_interm)

            //mockDetails
            const mockData = [];
            for (let i = 0; i < getpurchasedSubjectListAsPerGroupId[index].mock_count; i++) {
                let mockText = {};
                mockText['name'] = "Mock " + (i + 1);
                mockText['mock_no'] = i + 1;
                mockData.push(mockText);
            }
            setMockDetails(mockData)


            let notCurrentNumberMock = []
            moduleData.forEach((ele, i) => {
                if (ele.module_no != getpurchasedSubjectListAsPerGroupId[index].mock_current_no) {
                    notCurrentNumberMock.push(i)
                }
            })
            setDisablMockList(notCurrentNumberMock)


            const mockData_name = [];
            for (let i = 0; i < getpurchasedSubjectListAsPerGroupId[index].mock_count; i++) {
                let setMockText = '';
                if ((i + 1) < getpurchasedSubjectListAsPerGroupId[index].mock_current_no) {
                    setMockText = <Text style={{ color: "#56c760" }}>Mock {(i + 1)} <IconIonicons name={'checkbox-outline'} color={'#56c760'} size={20} /> </Text>;
                } else if ((i + 1) == getpurchasedSubjectListAsPerGroupId[index].mock_current_no) {
                    setMockText = <Text style={{ color: "#245C75" }}>Mock {(i + 1)} {getpurchasedSubjectListAsPerGroupId[index].mock_interm == 0 || getpurchasedSubjectListAsPerGroupId[index].mock_interm == undefined ? '' : `(${getpurchasedSubjectListAsPerGroupId[index].mock_interm}/3)`}</Text>;
                } else if ((i + 1) > getpurchasedSubjectListAsPerGroupId[index].mock_current_no) {
                    setMockText = <Text style={{ color: "#484848" }}>Mock {(i + 1)} </Text>;
                }
                mockData_name.push(setMockText);
            }

            setMock(mockData_name)

            setMock_current_no(getpurchasedSubjectListAsPerGroupId[index].mock_current_no)

        }
    }

    const chapterListHandeler = (set_no) => {
        // console.log("set_no=======", set_no, subjectSave, set_no, groupSave)
        setSetlectSet([set_no.toString()]);
        setExam_type(1)
        if (set_no != '') {
            dispatch(getChapterData(subjectSave, set_no, groupSave, props));
        }
    }

    const GoToExamScreenHandeler = (item, index) => {
        setExamCategoryId(item.exam_category_id)
        // console.log("======", "branchSortCode:", item.branch, "chapter:", item.short_code, 'exam_type:', exam_type, 'setlectSet:', setlectSet, 'subject_id:', subjectSave, 'set_no:', chapterTestSave, 'chapter_no:', index + 1, 'group_subject_id:', groupSave)
        // console.log("item-----", item)

        /* examFrom : 1: set, 2: mockMoudle, 3: competitive */
        /* call Online exam -------------- */
        props.navigation.navigate('nonAuthScenes', {
            screen: "OnlineExamsDetails",
            params: { branchSortCode: item.branch, chapter: item.short_code, exam_type: exam_type, setlectSet: setlectSet, subject_id: subjectSave, set_no: chapterTestSave, chapter_no: index + 1, group_subject_id: groupSave, examFrom: 1, exam_category_id: item.exam_category_id }
        })

        /* props.navigation.navigate('nonAuthScenes', {
            screen: `${pageName}`,
            params: {
                branchSortCode: item.branch, chapter: item.short_code, exam_type, setlectSet, subject_id: subjectSave, set_no: set_no, chapter_no: index + 1, group_subject_id: groupSave
            }
        }); */
    }

    /* quitExam={quitExam} startExam={startExam} params={{ mobile: 'mobileNumber', email: 'emailId', }} */
    const ModuleMockChapterOptionHandeler = (data, moduleOrMock, listData) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <ModuleMockChapterOption navigation={props} quitRbHandeler={quitRbHandeler} params={{ data: data, isModuleOrMock: moduleOrMock, listData: listData, maxChapterSelect: maxChapterSelect, maxChapterSelectMock: maxChapterSelectMock, exam_type: exam_type, selectModuleMockData: selectModuleMockData, subjectId: subjectSave, groupSubjectId: groupSave, exam_category_id: 1 }} />,
                'componentHeight': 350,
            });
    }

    const mouduleListHandeler = async (module_data) => {
        let subjectData = getpurchasedSubjectListAsPerGroupId.filter(i => i.subject_id === subjectSave)
        // console.log("mouduleListHandeler---", module_data)
        setSelectModuleMockData(module_data)
        setModuleOrMock(1)

        setChapterTestSave('');
        dispatch(getChapterAction([]));
        setMockSave('');
        setCaseStudySave('');
        if (module_data == '') {
            setExam_type(0)
        } else {
            setExam_type(2)
            if (subjectData[0].module_interm == 0) {
                console.log("module_interm--")
                // Emitter.emit(Events.SHOW_PRELOADER);
                // ModuleMockChapterOptionHandeler(module_data, 1, moduleMockChaterList)
                // setModuleMockChaterList(examCompletedChapterList)
            } else {
                const selectChapterId = [];
                // console.log("@@@@1111---", "isModuleOrMock:", moduleOrMock, "exam_type:", 0, "branchSortCode:", branchSortCode, "chapter:", 'CH0', "set_no:", module_data, "subject_id:", subjectSave, "selectChapterId:", selectChapterId, "group_subject_id:", groupSave, "examFrom:", 2, "exam_category_id:", 1)

                props.navigation.navigate('nonAuthScenes', {
                    screen: "OnlineExamsDetails",
                    params: { isModuleOrMock: 1, exam_type: 2, branchSortCode: branchSortCode, chapter: 'CH0', set_no: module_data, subject_id: subjectSave, selectChapterId, group_subject_id: groupSave, examFrom: 2, exam_category_id: 1 }
                })
                /* console.log("Module Data-----", "isModuleOrMock: 1", "exam_type: 2", "branchSortCode:->", branchSortCode, "chapter->:", 'CH0', "set_no->:", module_data, "subject_id->:",subject.split(',')[0], "selectChapterId->", selectChapterId, "group_subject_id->:", parseInt(groupSubject.split(',')[0]) )

                // history.push({ pathname: '/page-scholastic-exam-moudle-mock', state: { isModuleOrMock: 1, exam_type: 2, branchSortCode: branchSortCode, chapter: 'CH0', set_no: module_data, subject_id: subject.split(',')[0], selectChapterId, group_subject_id: parseInt(groupSubject.split(',')[0])  } }); */
            }
        }
    }

    const mockListHandeler = (mock_data) => {

        setSelectModuleMockData(mock_data)

        let subjectData = getpurchasedSubjectListAsPerGroupId.filter(i => i.subject_id === subjectSave)

        setModuleOrMock(2)
        setChapterTestSave('');
        dispatch(getChapterAction([]));
        setmoduleSave('')
        setCaseStudySave('');

        if (mock_data == '') {
            setExam_type(0)
        } else {
            setExam_type(3)
            if (subjectData[0].mock_interm == 0) {
                console.log("Mock_interm--")
                // dispatch(getExamCompletedListData(0, subject.split(',')[0], 1, exam_type, props.history))
                // setModuleMockChapterModal(true)
                // setModuleMockChaterList(props.examCompletedChapterList)
            } else {

                const selectChapterId = [];

                // console.log("#####---", 'isModuleOrMock:', 2, "exam_type:", 3, "branchSortCode:", branchSortCode, "chapter:", 'CH0', "set_no:", mock_data, "subject_id:", subjectSave, selectChapterId, "group_subject_id:", groupSave, "examFrom:", 2, "exam_category_id:", 1)

                props.navigation.navigate('nonAuthScenes', {
                    screen: "OnlineExamsDetails",
                    params: { isModuleOrMock: 2, exam_type: 3, branchSortCode: branchSortCode, chapter: 'CH0', set_no: mock_data, subject_id: subjectSave, selectChapterId, group_subject_id: groupSave, examFrom: 2, exam_category_id: 1 }
                })
                // dispatch(onlineRequestAction(true));
                // dispatch(getOnlineScholasticMockQuestionListData(selectChapterId, subject.split(',')[0], branchSortCode, mock_data, props.history));
                //history.push({ pathname: '/page-scholastic-exam-moudle-mock', state: { isModuleOrMock: 2, exam_type: 3, branchSortCode: branchSortCode, chapter: 'CH0', set_no: mock_data, subject_id: subject.split(',')[0], selectChapterId, group_subject_id: parseInt(groupSubject.split(',')[0]) } });
            }
        }
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

    const getCourseValidityDate = (startDate, endDate) => {
        let output = "NA";
        if (startDate && endDate) {
          let formattedStartDate = moment(startDate).format("DD/MM/YYYY");
          let formattedEndDate = moment(endDate).format("DD/MM/YYYY");
          output = `${formattedStartDate} - ${formattedEndDate}`;
        }
        return output;
      };
      

    const modalShowOff = () => {
        setSubExpiryMessage(false)
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
                    headerName='Scholastic Exam Subject'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />


                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >

                    <View style={Gstyles.courseInfoContainer}>
                        <Text style={Gstyles.courseValidityText}>{`Academic Year : ${academicSessionDetals.academic_year}`}</Text>
                        {/* <Text style={Gstyles.courseValidityText}>{`Course Validity: ${getCourseValidityDateformat(courseValidity)}`}</Text> */}
                        <Text style={Gstyles.courseValidityText}>{`Course Validity: ${getCourseValidityDate(academicSessionDetals?.course_start_date, academicSessionDetals?.course_end_date)}`}</Text>
                        
                    </View>

                    {/* 
                
                */}
                    <View style={Gstyles.scholasticInsideParentContainer}>

                        {/* Select Group---------- */}
                        <View style={Gstyles.scholasticDropdownContainer}>
                            <SelectDropdown
                                data={group}
                                defaultValue={groupSelect}
                                onSelect={(selectedItem, index) => {
                                    setGroupSelect(selectedItem);
                                    let group_subject_details = getpurchasedGrouplist.find(element => element.subject_name === selectedItem)
                                    setGroupSave(group_subject_details.subejct_id.toString())
                                    subjectListHandler(group_subject_details.subejct_id)
                                }}
                                defaultButtonText={'Select Group'}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                buttonStyle={Gstyles.scholasticBtnStyle}
                                buttonTextStyle={Gstyles.scholasticBtnTxtBlankStyle}
                                renderDropdownIcon={isOpened => {
                                    return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowWhite} size={iconeSize.dorpdownArrowSize} />;
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={Gstyles.scholasticDropdownStyle}
                                rowStyle={Gstyles.scholasticRowStyle}
                                rowTextStyle={Gstyles.scholasticRowTxtStyle}
                            />
                        </View>

                        {groupSave != '' ?
                            <>
                                {/* Select Subjext---------- */}

                                <View style={Gstyles.scholasticDropdownContainer}>
                                    <SelectDropdown
                                        data={subject}
                                        defaultValue={subjectSelect}
                                        onSelect={(selectedItem, index) => {
                                            setSubjectSelect(selectedItem);
                                            let subject_details = getpurchasedSubjectListAsPerGroupId.find(element => element.subject_name === selectedItem)
                                            setSubjectSave(subject_details.subject_id)
                                            chtestModuleMockSetHandeler(subject_details.subject_id, index)
                                        }}
                                        defaultButtonText={'Select Subject'}

                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return subjectSave == '' ? 'Select Subject' : selectedItem;
                                        }}

                                        rowTextForSelection={(item, index) => {
                                            return item;
                                        }}
                                        buttonStyle={Gstyles.scholasticBtnStyle}
                                        buttonTextStyle={Gstyles.scholasticBtnTxtBlankStyle}
                                        renderDropdownIcon={isOpened => {
                                            return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowWhite} size={iconeSize.dorpdownArrowSize} />;
                                        }}
                                        dropdownIconPosition={'right'}
                                        dropdownStyle={Gstyles.scholasticDropdownStyle}
                                        rowStyle={Gstyles.scholasticRowStyle}
                                        rowTextStyle={Gstyles.scholasticRowTxtStyle}
                                    />
                                </View>
                                {subjectSave != '' ?
                                    <>
                                        {/* Select Chapter Test---------- */}

                                        <View style={Gstyles.scholasticDropdownContainer}>
                                            <SelectDropdown
                                                data={chapterTest}
                                                defaultValue={chapterTestSelect}
                                                onSelect={(selectedItem, index) => {
                                                    setChapterTestSelect(selectedItem);
                                                    let chapterTestDetails = purchsedSet.find(element => element.name === selectedItem)
                                                    setChapterTestSave(chapterTestDetails.set_no)
                                                    chapterListHandeler(chapterTestDetails.set_no)
                                                }}
                                                defaultButtonText={'Select Chapter Test'}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return chapterTestSave == '' ? 'Select Chapter Test' : selectedItem;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item;
                                                }}
                                                buttonStyle={Gstyles.scholasticBtnStyle}
                                                buttonTextStyle={Gstyles.scholasticBtnTxtBlankStyle}
                                                renderDropdownIcon={isOpened => {
                                                    return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowWhite} size={iconeSize.dorpdownArrowSize} />;
                                                }}
                                                dropdownIconPosition={'right'}
                                                dropdownStyle={Gstyles.scholasticDropdownStyle}
                                                rowStyle={Gstyles.scholasticRowStyle}
                                                rowTextStyle={Gstyles.scholasticRowTxtStyle}

                                            />
                                        </View>
                                        {/* Select Case Studies---------- */}
                                        {/* {caseStudy != '' ?
                                            <>
                                                < View style={Gstyles.scholasticDropdownContainer}>
                                                    <SelectDropdown
                                                        data={caseStudy}
                                                        defaultValue={caseStudySelect}
                                                        onSelect={(selectedItem, index) => {
                                                            setCaseStudySelect(selectedItem);
                                                            let caseStudiesDetails = caseStudyPurchase.find(element => element.name === selectedItem)
                                                            setCaseStudySave(caseStudiesDetails.casestudy_no)
                                                        }}
                                                        defaultButtonText={'Select Chapter Test Case Studies'}
                                                        buttonTextAfterSelection={(selectedItem, index) => {
                                                            return caseStudySave == '' ? 'Select Chapter Test Case Studies' : selectedItem;
                                                        }}
                                                        rowTextForSelection={(item, index) => {
                                                            return item;
                                                        }}
                                                        buttonStyle={Gstyles.scholasticBtnStyle}
                                                        buttonTextStyle={Gstyles.scholasticBtnTxtBlankStyle}
                                                        // buttonTextStyle={'#fff'}
                                                        renderDropdownIcon={isOpened => {
                                                            return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowWhite} size={iconeSize.dorpdownArrowSize} />;
                                                        }}
                                                        dropdownIconPosition={'right'}
                                                        dropdownStyle={Gstyles.scholasticDropdownStyle}
                                                        rowStyle={Gstyles.scholasticRowStyle}
                                                        rowTextStyle={Gstyles.scholasticRowTxtStyle}

                                                    />
                                                </View>
                                            </>
                                            : null} */}

                                        {/* Select Moudule---------- */}
                                        {moduleDetails != '' ?
                                            < View style={Gstyles.scholasticDropdownContainer}>
                                                <SelectDropdown
                                                    data={module}
                                                    defaultValue={moduleSelect}
                                                    onSelect={(selectedItem, index) => {
                                                        setModuleSelect(selectedItem);
                                                        let select_moduleDetails = moduleDetails.find(element => element.name === (index == 0 ? 'Module 1' : index == 1 ? 'Module 2' : 'Module 3'))
                                                        setmoduleSave(select_moduleDetails.module_no)
                                                        mouduleListHandeler(select_moduleDetails.module_no)
                                                    }}
                                                    defaultButtonText={'Select Module Test'}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return moduleSave == '' ? 'Select Module Test' : selectedItem;
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item;
                                                    }}
                                                    buttonStyle={Gstyles.scholasticBtnStyle}
                                                    buttonTextStyle={Gstyles.scholasticBtnTxtBlankStyle}

                                                    renderDropdownIcon={isOpened => {
                                                        return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowWhite} size={iconeSize.dorpdownArrowSize} />;
                                                    }}
                                                    dropdownIconPosition={'right'}
                                                    dropdownStyle={Gstyles.scholasticDropdownStyle}
                                                    rowStyle={Gstyles.scholasticRowStyle}
                                                    rowTextStyle={Gstyles.scholasticRowTxtStyle}
                                                    disabledIndexs={disablMmoduleList}

                                                />
                                            </View>
                                            : null}


                                        {/* Select Mock---------- */}
                                        {mockDetails != '' ?
                                            <View style={Gstyles.scholasticDropdownContainer}>
                                                <SelectDropdown
                                                    data={mock}

                                                    defaultValue={mockSelect}
                                                    onSelect={(selectedItem, index) => {
                                                        setMockSelect(selectedItem);
                                                        let select_mockDetails = mockDetails.find(element => element.name === (index == 0 ? 'Mock 1' : index == 1 ? 'Mock 2' : 'Mock 3'))
                                                        setMockSave(select_mockDetails.mock_no)
                                                        mockListHandeler(select_mockDetails.mock_no)
                                                    }}
                                                    defaultButtonText={'Select Mock Test'}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return mockSave == "" ? 'Select Mock Test' : selectedItem;
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item;
                                                    }}
                                                    buttonStyle={Gstyles.scholasticBtnStyle}
                                                    buttonTextStyle={Gstyles.scholasticBtnTxtBlankStyle}

                                                    renderDropdownIcon={isOpened => {
                                                        return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowWhite} size={iconeSize.dorpdownArrowSize} />;
                                                    }}
                                                    dropdownIconPosition={'right'}
                                                    dropdownStyle={Gstyles.scholasticDropdownStyle}
                                                    rowStyle={Gstyles.scholasticRowStyle}
                                                    rowTextStyle={Gstyles.scholasticRowTxtStyle}
                                                    disabledIndexs={disablMockList}
                                                />
                                            </View>
                                            : null}
                                    </>
                                    : null}
                            </>
                            : null}


                    </View>
                    <View style={Gstyles.scholasticBottomParentContainer}>
                        <View style={Gstyles.scholasticBottominsideTopContainer}>
                            <Text style={Gstyles.scholasticChapterListHeading}>Select Chapter/s ({purchsedSet != '' ? `${chapterList.length}` : 0})</Text>
                        </View>
                        <View style={Gstyles.scholasticBottominsideBottomContainer}>
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={Gstyles.chapterListScrollViewContainer}
                                showsVerticalScrollIndicator={false}
                            >

                                {chapterList.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {chapterTestSave != '' ?
                                                examCompletedChapterList == undefined ?
                                                    <TouchableOpacity onPress={() => GoToExamScreenHandeler(item, index)} style={Gstyles.chapterListIndividualContainer}>
                                                        <View>
                                                            <View>
                                                                <Text style={Gstyles.chapterNumber}>Chapter: {index + 1}</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={Gstyles.chapterSubHeading}>{item.sub_heading}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    !examCompletedChapterList.find(element => element.chapter_id == item.id) ?
                                                        <TouchableOpacity onPress={() => GoToExamScreenHandeler(item, index)} style={Gstyles.chapterListIndividualContainer}>
                                                            <View style={{ width: '90%', }}>
                                                                <View>
                                                                    <Text style={Gstyles.intermChapterNumber}>Chapter: {index + 1} {item.interm_count == 0 ? null : <>({item.interm_count}/3)</>}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={Gstyles.intermChapterSubHeading}>{item.sub_heading}</Text>
                                                                </View>
                                                            </View>
                                                            <View >{item.interm_count == 0 ? null : <Text><IconMaterialCommunityIcons name={'square-edit-outline'} color={'#f38f76'} size={25} /> </Text>}</View>
                                                        </TouchableOpacity>
                                                        :
                                                        <View style={Gstyles.chapterListIndividualContainer}>
                                                            <View style={{ width: '90%', }}>
                                                                <View>
                                                                    <Text style={Gstyles.doneChapterNumber}>Chapter: {index + 1}</Text>
                                                                </View>
                                                                <View >
                                                                    <Text style={Gstyles.doneChapterSubHeading}>{item.sub_heading} </Text>
                                                                </View>
                                                            </View>
                                                            <View><Text><IconIonicons name={'checkbox-outline'} color={'#56c760'} size={25} /> </Text></View>
                                                        </View>
                                                : null}
                                        </React.Fragment>
                                    )
                                })
                                }

                            </ScrollView>

                        </View>


                    </View>

                </ImageBackground>

                {
                    academicSessionDetals ?
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

            </KeyboardAvoidingView >
        </>

    );
};

export default ScholasticExamsSubject;