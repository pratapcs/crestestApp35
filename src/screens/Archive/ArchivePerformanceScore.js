import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    View,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
    Text,
    Dimensions
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';
import { container } from '../../styles/Crestest.config';
import SelectDropdown from 'react-native-select-dropdown';

import DashboardBoxComponent from '../../components/DashboardBoxComponent';
import { getAdvertisementDetails } from '../../store/actions/AuthActions';
import { getArchiveStandardListDetails } from '../../store/actions/ClassStandardAction';
import { getArchiveClassAction } from '../../store/actions/ExamCategoryAction';

import Gstyles from '../../styles/GlobalStyle';

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"

import { colors, fonts } from '../../styles/Crestest.config';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const performanceDashboardList = [

    {
        id: 1,
        label: 'Online exam',
        labelImage: require('../../assets/images/onlineexam.png'),
        isImage: true,
        page: 'ArchivePerformanceCategory', /* Onlineexam */
    },
    {
        id: 2,
        label: 'e-Library',
        labelImage: require('../../assets/images/eLibrary.png'),
        isImage: true,
        page: 'ArchivePerformanceELibraryCategory', /* ELibrary */
    },
]


const ArchivePerformanceScore = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const [standard, setStandard] = useState();
    const [standardSelect, setStandardSelect] = useState();
    const [standardSave, setStandardSave] = useState('');

    const userId = useSelector(state => state.auth?.user_id);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);
    const profileArchiveList = useSelector(state => state.standard.profileArchiveList);

    useEffect(() => {
        dispatch(getAdvertisementDetails(props));
        dispatch(getArchiveStandardListDetails(props));
    }, []);

    useEffect(() => {
        let class_name = [];
        profileArchiveList.forEach((ele) => {
            class_name.push(ele.class_no)
        })
        setStandard(class_name);

    }, [profileArchiveList]);

    // console.log(userId, "Archive USER ID");

    const leftIconHandeler = () => {
        // console.log("$$$$$$")
        props.navigation.goBack();
        /* if (userId == 0) {
            console.log("$$$$$$")
        } else {
            console.log("####", navigation)
            navigation.dispatch(DrawerActions.toggleDrawer())
        } */
    }

    const goToNewPage = (pageName, listId) => {
        // console.log("pageName--", pageName)
        props.navigation.navigate('nonAuthScenes', {
            screen: `${pageName}`,
            params: { id: listId, class_id: standardSave.toString() }
        });
        dispatch(getArchiveClassAction(standardSave.toString()))
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='Archive Performance Score'
                    leftIcon='grid-outline' /* 'menu-outline' */  /* grid-outline */
                    leftIconHandeler={leftIconHandeler}
                />

                <ImageBackground source={require('../../assets/images/background_base.png')} style={[Gstyles.imageBackgroundContainer, { position: 'relative' }]} >
                    <View style={Gstyles.watermarkImageContainer}>
                        <Image
                            style={Gstyles.watermarkImage}
                            source={require('../../assets/images/crestest-logo.png')}
                        />
                    </View>
                    {/* {console.log("profileArchiveList-----------", profileArchiveList)} */}
                    {profileArchiveList.length > 0 ?
                        <>
                            <View style={Gstyles.dorpdownContainer}>
                                <SelectDropdown
                                    data={standard}
                                    defaultValue={standardSelect}
                                    onSelect={(selectedItem, index) => {
                                        // console.log(selectedItem, index);
                                        let class_details = profileArchiveList.find(element => element.class_no === selectedItem)
                                        setStandardSelect(selectedItem);
                                        setStandardSave(class_details.class_no)
                                    }}
                                    disabled={profileArchiveList.length > 0 ? false : true}
                                    defaultButtonText={'Select standard'}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item;
                                    }}
                                    buttonStyle={Gstyles.dropdown1BtnStyle}
                                    buttonTextStyle={standardSelect == '' ? Gstyles.dropdown1BtnTxtBlankStyle : Gstyles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={colors.inputText} size={22} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={Gstyles.dropdown1DropdownStyle}
                                    rowStyle={Gstyles.dropdown1RowStyle}
                                    rowTextStyle={Gstyles.dropdown1RowTxtStyle}
                                />
                            </View>

                            <View style={Gstyles.insideParentContainer}>
                                <ScrollView
                                    keyboardShouldPersistTaps="handled"
                                    contentContainerStyle={Gstyles.scrollViewContainer}
                                    showsVerticalScrollIndicator={false}
                                >
                                    {
                                        performanceDashboardList.map((item, index) => {
                                            return (
                                                <DashboardBoxComponent
                                                    disabled={standardSelect === 0 || standardSelect === undefined}
                                                    key={item.id}
                                                    isImage={item.isImage}
                                                    imageName={item.labelImage}
                                                    labelName={item.label}
                                                    goToNewPage={() => goToNewPage(item.page, item.id)}

                                                />
                                            );
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </>
                        :
                        <>
                            <View style={[ Gstyles.aic, Gstyles.flex1, { marginTop:30}]}>
                                <View style={{ width: 300, height: 100, borderRadius: 10,  justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: fonts.rBold, fontWeight: "400", fontSize: width < 500 ? 16 : height * 0.020,
}}>Archive list is empty</Text>
                                </View>
                            </View>

                            {/* <View style={Gstyles.noDataContainer}><Text>Archive List is Empty</Text></View> */}
                        </>
                    }

                    {advertisementDetails?.[7] != '' ?
                        <AdComponent
                            adImage={advertisementDetails?.[7]}
                        />
                        : null}

                </ImageBackground>
            </KeyboardAvoidingView>
        </>
    );
};

export default ArchivePerformanceScore;