import React, { useState, useEffect } from 'react';
import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getClassStandardData, getBoardData, getSchoolListData, } from '../../../store/actions/CommonActions';
import Emitter from '../../../utils/Emitter';
import * as Events from '../../../configs/Events';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Dimensions
} from 'react-native';

import IconAntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const trasparent = 'rgba(0,0,0,0.5)';

const AddProfileDetailsModal = (props) => {

    const dispatch = useDispatch();
    const allowSpecialCharForAddress = /^[-()#A-Za-z0-9/,.'\s/g]*$/;
    const alphabetsCheck = /^[A-Za-z\s]*$/;
    const onlyNumber = /^[0-9]+$/;

    const [pincode, setPincode] = useState('');
    const [schoolName, setSchoolName] = useState([]);
    const [schoolNameSelect, setSchoolNameSelect] = useState('');
    const [schoolNameSave, setSchoolNameSave] = useState('');

    const [manualSchoolName, setManualSchoolName] = useState("");
    const [ismanualSchoolName, setIsManualSchoolName] = useState(0); /* 0= name collect from list, 1= manual type */

    const [schoolAddress, setSchoolAddress] = useState('');
    const schoolList = useSelector(state => state.common.schoolList);

    useEffect(() => {
        async function fetcUserDataFromLocalStorage() {
            let getData = await AsyncStorage.getItem('crestestUserDetails');
            let board_id = JSON.parse(getData).board;
            dispatch(getSchoolListData(board_id, props.navigation));
        }
        fetcUserDataFromLocalStorage()
    }, []);

    useEffect(() => {
        // console.log("props?.profileData------", props?.profileData.data)
        if (props?.profileData.data?.length > 0) {
            if (props?.profileData && props?.profileData.data[0]?.school_name) {
                setSchoolNameSelect(props?.profileData.data[0]?.school_name == null || props?.profileData.data[0]?.school_name == 'null' || props?.profileData.data[0]?.school_name == undefined || props?.profileData.data[0]?.school_name == 'undefined' ? '' : props?.profileData.data[0]?.school_name)
            }
            if (props?.profileData && props?.profileData.data[0]?.pincode != 0 && props?.profileData.data[0]?.pincode != undefined) {
                setPincode(props?.profileData.data[0]?.pincode == null || props?.profileData.data[0]?.pincode == 'null' || props?.profileData.data[0]?.pincode == undefined || props?.profileData.data[0]?.pincode == 'undefined' ? '' : props?.profileData.data[0]?.pincode);
            }
            if (props?.profileData && props?.profileData.data[0]?.school_name != "" && props?.profileData.data[0]?.school_name != undefined) {
                setSchoolAddress(props?.profileData.data[0]?.school_address == null || props?.profileData.data[0]?.school_address == 'null' ? '' : props?.profileData.data[0]?.school_address);
            }
            setManualSchoolName(props?.profileData.data[0]?.school_name == null || props?.profileData.data[0]?.school_name == 'null' || props?.profileData.data[0]?.school_name == undefined || props?.profileData.data[0]?.school_name == 'undefined' ? '' : props?.profileData.data[0]?.school_name)
        }
    }, [props?.profileData]);

    useEffect(() => {

        if (schoolList != '') {
            Emitter.emit(Events.SHOW_PRELOADER);
            setSchoolName([])
            let creact_new = "Create new";
            let school_name = [];
            schoolList.forEach((ele) => {
                school_name.push(ele.school_name)
            })
            school_name.unshift(creact_new)
            setSchoolName(school_name);
            Emitter.emit(Events.HIDE_PRELOADER);
        }
    }, [schoolList]);

    const addressSpecialCharacter = (event) => {
        // console.log("$$$$----",  event)
        if (!/[-#A-Za-z0-9/,.\s/g]/.test(event.key)) {
            event.preventDefault();
        }
    }

    const validateData = async () => {
        const enteredPincode = pincode
        //check all validations
        return new Promise(function (resolve, reject) {
            setPincode(enteredPincode)

            if (enteredPincode == '') {
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Postal code is missing!" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredPincode.length < 6) {
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Minimum 6 Character is Required" });
                resolve({ success: 0, message: 'failure' });

            } else if (!onlyNumber.test(enteredPincode)) {
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Postal code allow only number" });
                resolve({ success: 0, message: 'failure' });

            } else if (enteredPincode == "000000") {
                // pincodeRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Not a valid postal code" });
                resolve({ success: 0, message: 'failure' });

            } /* else if (!alphabetsCheck.test(schoolNameSave)) {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name allow only alphabets" });
                resolve({ success: 0, message: 'failure' });

            } */ else if (schoolNameSelect == '' && ismanualSchoolName == 0) {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name is missing" });
                resolve({ success: 0, message: 'failure' });
            } /* else if (schoolNameSelect == 'Create new' && schoolNameSave == '') {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name is missing" });
                resolve({ success: 0, message: 'failure' });
            } */ else if (ismanualSchoolName == 1 && manualSchoolName == '') {
                // passwordRef.current.focus();
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School name is missing!" });
                resolve({ success: 0, message: 'failure' });
            } /* else if (!allowSpecialCharForAddress.test(schoolAddress)) {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "Allowed only those Special characters ',./-()# '" });
                resolve({ success: 0, message: 'failure' });
            } */ else if (schoolAddress == '') {
                error: 1;
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: "School Address is missing!" });
                resolve({ success: 0, message: 'failure' });
            } else {
                resolve({ success: 1, message: 'success' });
            }
        });
    }

    const submitHandeler = async () => {
        console.log("@123-schoolNameSelect--", schoolNameSelect)
        validateData()
            .then((response) => {
                if (response.success == 1) {
                    // let schoolNameSelected = schoolNameSelect != "Create new" ? schoolNameSelect : schoolNameSave
                    let schoolNameSelected = ismanualSchoolName === 0 ? schoolNameSelect : manualSchoolName;

                    let profileUpdateData = {
                        pincode, schoolNameSelected, schoolAddress
                    }
                    props.onProfileSubmit(profileUpdateData);
                    setPincode("")
                    setSchoolNameSelect("")
                    setSchoolAddress("")
                    setSchoolNameSave('')
                } else {
                    //validation error
                }
            });
    }

    const showSchoolList = () => {
        setIsManualSchoolName(0);
        setSchoolNameSelect('');
        /* setSchoolNameSelect('');
        setSchoolAddress('');
        setSchoolNameSave(''); */
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.isVisable}
            >

                <View style={styles.modalParentContainer}>

                    <View style={styles.modalWhiteArea}>
                        <View style={styles.modalTopContainer}>
                            <Text style={styles.modalHeadingText}>Student Information</Text>
                        </View>
                        <View style={styles.modalmiddleContainer}>
                            <View style={styles.inputContainer}>
                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                    <Text style={Gstyles.inputLabel}>Postal Code</Text>
                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(pincode) => setPincode(pincode)}
                                    value={pincode.toString()}
                                    placeholder="Enter postal code"
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    autoCapitalize='none' //words: first letter of each word.
                                />
                            </View>

                            {/* {schoolNameSelect != 'Create new' ? */}
                            {ismanualSchoolName === 0 ?
                                <View style={styles.inputContainer}>
                                    <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                        <Text style={Gstyles.inputLabel}>School name</Text>
                                        <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                    </View>
                                    <SelectDropdown

                                        data={schoolName}
                                        // defaultValueByIndex={1}
                                        defaultValue={schoolNameSelect}
                                        onSelect={(selectedItem, index) => {
                                            // console.log(selectedItem, index);
                                            setSchoolNameSelect(selectedItem);
                                            if (selectedItem != 'Create new') {
                                                let school_address = schoolList.find(element => element.school_name === selectedItem)
                                                setSchoolAddress(school_address.school_address)
                                            } else {
                                                // setSchoolAddress('')
                                                // setSchoolNameSave('')
                                                setIsManualSchoolName(1)
                                            }
                                        }}
                                        // defaultButtonText={'Select school name'}
                                        defaultButtonText={schoolNameSelect != '' ? schoolNameSelect : 'Select school name'}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem;
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item;
                                        }}
                                        buttonStyle={Gstyles.dropdown1BtnStyle}
                                        buttonTextStyle={schoolNameSelect == '' ? Gstyles.dropdown1BtnTxtBlankStyle : Gstyles.dropdown1BtnTxtStyle}
                                        renderDropdownIcon={isOpened => {
                                            return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.inputText} size={22} />;
                                        }}
                                        dropdownIconPosition={'right'}
                                        dropdownStyle={Gstyles.dropdown1DropdownStyle}
                                        // rowStyle={schoolName[0] == 'Create new' ? Gstyles.dropdownNewRowStyle : Gstyles.dropdown1RowStyle}
                                        rowStyle={Gstyles.dropdown1RowStyle}
                                        rowTextStyle={Gstyles.dropdown1RowTxtStyle}

                                        search
                                        searchInputStyle={styles.dropdown1searchInputStyleStyle}
                                        searchPlaceHolder={'Search here'}
                                        searchPlaceHolderColor={'darkgrey'}
                                        renderSearchInputLeftIcon={() => {
                                            return <Icon name={'search'} color={'#444'} size={18} />;
                                        }}
                                        // disabled={boardSelect != '' ? false : true}
                                        selectedRowTextStyle={{ color: '#ff0000' }}
                                    />
                                </View>
                                :
                                <View style={styles.inputContainer}>
                                    <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                        <Text style={Gstyles.inputLabel}>School name</Text>
                                        <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                    </View>
                                    <View style={Gstyles.passwordInputContainer}>
                                        <View style={Gstyles.passwordContainer}>
                                            <TextInput
                                                style={Gstyles.input}
                                                // onChangeText={(schoolNameSave) => setSchoolNameSave(schoolNameSave)}
                                                onChangeText={(data) => { setManualSchoolName(data); setSchoolAddress("") }}
                                                value={manualSchoolName}
                                                // value={schoolNameSave.toString()}
                                                placeholder="Enter school name"
                                                maxLength={100}
                                            />
                                        </View>
                                        <View style={Gstyles.eyeContainer}>
                                            <TouchableOpacity style={Gstyles.eyePosition} onPress={showSchoolList}><IconAntDesign name="closecircle" size={width < 500 ? 20 : 33} color={colors.inputText} /></TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            }


                            <View style={styles.inputContainer}>
                                <View style={[Gstyles.fdr, Gstyles.labelMargin]}>
                                    <Text style={Gstyles.inputLabel}>School address</Text>
                                    <Text style={Gstyles.inputMandatoryMark}>*</Text>
                                </View>
                                <TextInput

                                    style={Gstyles.input}
                                    onChangeText={(schoolAddress) => setSchoolAddress(schoolAddress)}
                                    value={schoolAddress.toString()}
                                    placeholder="Enter school address"
                                    // keyboardType="number-pad"
                                    // maxLength={200}
                                    autoCapitalize='none' //words: first letter of each word.
                                    returnKeyType="next"
                                    multiline={true}
                                    onKeyPress={(e) => addressSpecialCharacter(e)}
                                    // editable={schoolNameSelect == 'Create new' ? true : false}
                                    editable={ismanualSchoolName === 0 ? false : true}
                                />
                            </View>
                        </View>
                        <View style={styles.modalBottomontainer}>

                            <TouchableOpacity onPress={props.cancelHandeler} style={[styles.button, styles.rejectBackground]}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={submitHandeler} style={[styles.button, styles.successBackground]}>
                                <Text>Submit</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

        </>
    );
};

const styles = StyleSheet.create(
    {
        modalParentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: trasparent,
        },
        modalWhiteArea: {
            backgroundColor: 'white',
            padding: 15,
            width: '80%',
            borderRadius: 10,
            height: 380,
            justifyContent: 'space-between',
        },
        modalHeadingText: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left'
        },
        modalTopContainer: {
            // flex: .8,
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            paddingBottom: 10,
            // alignSelf: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3'
        },

        modalmiddleContainer: {
            marginTop: 10,
            flex: 1.4,
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3',
            marginBottom: 15,
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        modalBottomontainer: {
            // flex: .5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        button: {
            width: 90,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,

        },
        rejectBackground: {
            backgroundColor: '#f85a5b',
        },
        successBackground: {
            backgroundColor: '#3da083',
        },
        modalHeading: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 18,
            textAlign: 'center'
        },
        modaldetails: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 12,
            textAlign: 'center'
        },
        inputContainer: {
            width: '100%',
        },
        input: {
            width: '100%',
            height: width < 500 ? 50 : height * 0.060,
            marginBottom: 12,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: colors.backgroundWhite,
            borderColor: colors.inputBorder,
            borderRadius: 10,
            fontSize: width < 500 ? 14 : height * 0.020,
            color: colors.inputText,
        },
    });

export default AddProfileDetailsModal;