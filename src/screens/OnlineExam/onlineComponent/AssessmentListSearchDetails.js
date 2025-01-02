import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';

//styles
import { colors, containerInside, iconeSize } from '../../../styles/Crestest.config';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';

import Emitter from '../../../utils/Emitter';
import * as Events from '../../../configs/Events';

import Gstyles from '../../../styles/GlobalStyle';

import { getCategoryData } from '../../../store/actions/ExamCategoryAction';
import { useNavigation } from '@react-navigation/native';

import { getPurchasedGroupListData, getPurchasedSubjectslistScholasticData, getPurchasedSubjectslistScholasticAction, getPurchasedSubjectData } from '../../../store/actions/SubjectAction';

const AssessmentListSearchDetails = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [category, setCategory] = useState([]);
    const [categorySelect, setCategorySelect] = useState('');
    const [categorySave, setCategorySave] = useState('');

    const [group, setGroup] = useState([]);
    const [groupSelect, setGroupSelect] = useState('');
    const [groupSave, setGroupSave] = useState('');

    const [subject, setSubject] = useState([]);
    const [subjectSelect, setSubjectSelect] = useState('');
    const [subjectSave, setSubjectSave] = useState('');

    const categorylist = useSelector(state => state.category.examcategoryList);
    const getpurchasedGrouplist = useSelector(state => state.subject.getpurchasedGrouplist);
    const getpurchasedSubjectListAsPerGroupId = useSelector(state => state.subject.getpurchasedSubjectListAsPerGroupId);


    useEffect(() => {
        Emitter.emit(Events.HIDE_PRELOADER);
        // console.log( "@2222----AssessmentListSearchDetails--", props.params.questionList )
    }, []);

    useEffect(() => {
        dispatch(getCategoryData(props));
        dispatch(getPurchasedGroupListData(props))
        return () => {

        };

    }, []);

    useEffect(() => {
        let category_name = [];
        categorylist.forEach((ele) => {
            category_name.push(ele.category);
        })
        setCategory(category_name)
    }, [categorylist]);

    useEffect(() => {
        let group_subject_name = [];
        getpurchasedGrouplist.forEach((ele) => {
            group_subject_name.push(ele.subject_name);
        })
        setGroup(group_subject_name)
    }, [getpurchasedGrouplist]);

    useEffect(() => {
        let sub_subject_name = [];
        getpurchasedSubjectListAsPerGroupId.forEach((ele) => {
            sub_subject_name.push(ele.subject_name);
        })
        setSubject(sub_subject_name)
    }, [getpurchasedSubjectListAsPerGroupId]);

    const closeVerificationOption = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    const subjectDataHandeler = (groupId, index) => {
        dispatch(getPurchasedSubjectslistScholasticData(groupId, props))
    }


    const dataResetHandaler = () => {
        
        setCategorySave('');
        setCategorySelect('');

        setGroupSave('');
        setGroupSelect('');

        setSubjectSave('');
        setSubjectSelect('');
    }

    const submitHandaler = () => {
        props.assessmentFilterData(categorySave, groupSave, subjectSave)
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
    }

    return (
        <>

            <View style={[containerInside, Gstyles.rbSheetStyle]}>

                <TouchableOpacity style={Gstyles.modalRbCloseButtonContainer} onPress={closeVerificationOption}>
                    <EntypoIcon name="cross" size={25} color={colors.backgroundDeepGray} />
                </TouchableOpacity>

                <View style={Gstyles.bottomParentContainer}>

                    <View style={Gstyles.topHeadingContainer}>
                        <Text style={[Gstyles.textCenter, Gstyles.font18, Gstyles.textBlue, Gstyles.marginTopBottom15, { height: 20 }]}>Assessment List Filter</Text>
                    </View>
                    {/* {console.log("categorySelect------", categorySelect)} */}
                    <View style={Gstyles.scholasticDropdownContainer}>
                        <SelectDropdown
                            data={category}
                            defaultValue={categorySelect}
                            onSelect={(selectedItem, index) => {
                                setCategorySelect(selectedItem);
                                let category_details = categorylist.find(element => element.category === selectedItem)
                                setCategorySave(category_details.id)
                            }}
                            defaultButtonText={'Select Category'}

                            buttonTextAfterSelection={(selectedItem, index) => {
                                return categorySave == '' ? 'Select Category' : selectedItem;
                                // return selectedItem;
                            }}

                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={Gstyles.assessmentDropdownBtnStyle}
                            buttonTextStyle={Gstyles.assessmentDropdownBtnTxtBlankStyle}
                            renderDropdownIcon={isOpened => {
                                return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowBlue} size={iconeSize.dorpdownArrowSize} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={Gstyles.scholasticDropdownStyle}
                            rowStyle={Gstyles.scholasticRowStyle}
                            rowTextStyle={Gstyles.scholasticRowTxtStyle}
                        />
                    </View>

                    <View style={Gstyles.scholasticDropdownContainer}>
                        <SelectDropdown
                            disabled={categorySave == 2 || categorySave == '' ? true : false}
                            data={group}
                            defaultValue={groupSelect}
                            onSelect={(selectedItem, index) => {
                                setGroupSelect(selectedItem);
                                let group_details = getpurchasedGrouplist.find(element => element.subject_name === selectedItem)
                                setGroupSave(group_details.subejct_id.toString())
                                subjectDataHandeler(group_details.subejct_id, index)
                            }}
                            defaultButtonText={'Select Group'}

                            buttonTextAfterSelection={(selectedItem, index) => {
                                return groupSave == '' ? 'Select Group' : selectedItem;
                                // return selectedItem;
                            }}

                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={categorySave == 2 || categorySave == '' ? Gstyles.assessmentDropdownBtnStyleDisable : Gstyles.assessmentDropdownBtnStyle}
                            buttonTextStyle={Gstyles.assessmentDropdownBtnTxtBlankStyle}
                            renderDropdownIcon={isOpened => {
                                return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowBlue} size={iconeSize.dorpdownArrowSize} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={Gstyles.scholasticDropdownStyle}
                            rowStyle={Gstyles.scholasticRowStyle}
                            rowTextStyle={Gstyles.scholasticRowTxtStyle}
                        />
                    </View>

                    <View style={Gstyles.scholasticDropdownContainer}>
                        <SelectDropdown
                            disabled={categorySave == 2 || categorySave == '' ? true : false}
                            data={subject}
                            defaultValue={subjectSelect}
                            onSelect={(selectedItem, index) => {
                                setSubjectSelect(selectedItem);
                                let subject_details = getpurchasedSubjectListAsPerGroupId.find(element => element.subject_name === selectedItem)
                                setSubjectSave(subject_details.subject_id)
                            }}
                            defaultButtonText={'Select Subject'}

                            buttonTextAfterSelection={(selectedItem, index) => {
                                return subjectSave == '' ? 'Select Subject' : selectedItem;
                                return selectedItem;
                            }}

                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={categorySave == 2 || categorySave == '' ? Gstyles.assessmentDropdownBtnStyleDisable : categorySave == 1 && groupSave == '' ? Gstyles.assessmentDropdownBtnStyleDisable : Gstyles.assessmentDropdownBtnStyle}
                            buttonTextStyle={Gstyles.assessmentDropdownBtnTxtBlankStyle}
                            renderDropdownIcon={isOpened => {
                                return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.arrowBlue} size={iconeSize.dorpdownArrowSize} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={Gstyles.scholasticDropdownStyle}
                            rowStyle={Gstyles.scholasticRowStyle}
                            rowTextStyle={Gstyles.scholasticRowTxtStyle}
                        />
                    </View>

                    <View style={Gstyles.filterSubmitContainer}>
                        <TouchableOpacity onPress={dataResetHandaler} style={[Gstyles.btnContainer, Gstyles.resetBackground]}>
                            <Text style={Gstyles.btnText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={submitHandaler} style={[Gstyles.btnContainer, Gstyles.submitBackground]}>
                            <Text style={Gstyles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </>
    );
};

export default AssessmentListSearchDetails;

const styles = StyleSheet.create(
    {


    })