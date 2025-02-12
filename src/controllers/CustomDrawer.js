import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Share from 'react-native-share';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Linking } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/AuthActions';
import Gstyles from '../styles/GlobalStyle';
import { scrollViewContainer } from '../styles/Crestest.config';
import { drawerMenuActiveIdUpdateAction } from '../store/actions/DashboardAction';

const menuList = [
  {
    id: 1,
    name: "Dashboard",
    page: 'Dashboard',
    icon: 'grid-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: '',
    submenueItem: [],
  },
  {
    id: 2,
    name: "Online Exams",
    page: 'Online Exams',
    icon: 'document-text-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: '',
    submenueItem: [],
  },
  {
    id: 3,
    name: "e-library",
    page: 'e-library',
    icon: 'book-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: '',
    submenueItem: [],
  },
  {
    id: 4,
    name: "Online Classes",
    page: 'Online Classes',
    icon: 'tv-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: 'AUTH',
    submenueItem: [],
  },
  {
    id: 5,
    name: "Subscription",
    page: 'Subscription',
    icon: 'cart-plus',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 2,
    permission: 'AUTH',
    submenueItem: [],
  },
  {
    id: 6,
    name: "Performance Score",
    page: 'Performance Score',
    icon: 'bar-chart-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: 'AUTH',
    submenueItem: [],
  },
  {
    id: 7,
    name: "My Purchase",
    page: 'My Purchase',
    icon: 'list',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: 'AUTH',
    submenueItem: [],
  },
  {
    id: 8,
    name: "About Us",
    page: '',
    icon: 'people-sharp',
    submenu: true,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: 'AUTH',
    isOpenSubmenueItem: false,
    submenueItem: [
      {
        parentId: 8,
        id: 81,
        name: "Terms & Conditions",
        page: 'TermsCondition',
        icon: 'newspaper-outline',
      },
      {
        parentId: 8,
        id: 82,
        name: "Privacy Policy",
        page: 'PrivacyPolicy',
        icon: 'documents-outline',
      }
    ]
  },
  {
    id: 9,
    name: "Feedback",
    page: '',
    icon: 'book-edit-outline',
    submenu: true,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 2,
    permission: 'AUTH',
    isOpenSubmenueItem: false,
    submenueItem: [
      {
        parentId: 9,
        id: 91,
        name: "Feedback",
        page: 'Feedback',
        icon: 'chatbubble-ellipses-outline',
      },
      {
        parentId: 9,
        id: 92,
        name: "Contact us",
        page: '',
        icon: 'logo-whatsapp',
      }
    ]
  },
  {
    id: 10,
    name: "FAQs",
    page: 'Faqs',
    icon: 'comment-search-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 2,
    permission: 'AUTH',
    submenueItem: [],
  },
  {
    id: 11,
    name: "Settings",
    page: '',
    icon: 'settings-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: 'AUTH',
    submenueItem: [],
  },
  {
    id: 12,
    name: "Rate Us",
    page: '',
    icon: 'star-half-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 1,
    permission: 'AUTH',
    submenueItem: [],
  },
  {
    id: 13,
    name: "Archive Performance Score",
    page: 'Archive Performance Score',
    icon: 'archive-check-outline',
    submenu: false,
    upArrow: 'chevron-forward-outline',
    downArrow: 'chevron-down',
    iconName: 2,
    permission: 'AUTH',
    submenueItem: [],
  },
]

const CustomDrawer = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation()
  const routeNames = props.state.routeNames;


  const drawerMenuActiveId = useSelector(state => state.dashboard.drawerMenuActiveId);

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [profile_pic, setProfile_pic] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [board_name, setBoard_name] = useState('')
  const [class_id, setclass_id] = useState('')
  const [appVersion, setAppVersion] = useState('')
  const [activeTextColor, setActiveTextColor] = useState('#fff')
  const [inActiveTextColor, setInActiveTextColor] = useState('#333')

  const [activeMenu, setActiveMenu] = useState(1)
  const [activeMenuParentId, setActiveMenuParentId] = useState('')

  const [activeSubmenueItem, setActiveSubmenueItem] = useState('')
  const [isOpenSubmenu, setIsOpenSubmenu] = useState(false)
  const [ispageRefresh, setIspageRefresh] = useState(false)

  const [checkInModal, setCheckInModal] = useState(false);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0))
  const [animatedOpacity] = useState(new Animated.Value(0))
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);


  React.useEffect(() => {
    // const callUpdateUserDetails = props.navigation.addListener('focus', () => {
    let version = DeviceInfo.getVersion();
    setAppVersion(version)
    async function getUserDetails() {
      // let result = await getData("crestestUserDetails");
      let result = await AsyncStorage.getItem('crestestUserDetails');;
      // console.log("resultresultresult--", result)
      result = JSON.parse(result);
      if (result != null && result != undefined) {
        let fname = result['fname'];
        let lname = result['lname'];
        let profile_pic = result['profile_pic'];
        let email = result['email'];
        let userId = result['id'];
        let board_name = result['board_name'];
        let class_id = result['class_id'];
        let standard = result['standard'];
        setFname(fname);
        setLname(lname);
        setProfile_pic(profile_pic)
        setEmail(email)
        setUserId(userId)
        setBoard_name(board_name)
        // setclass_id(class_id)
        setclass_id(standard)
      }
    };

    getUserDetails()
    // })

  }, [props]);

  useEffect(() => {
    setActiveMenu(drawerMenuActiveId == 0 ? 1 : drawerMenuActiveId)
  }, [props]);

  useEffect(() => {
    objIndex = menuList.findIndex(obj => obj.id == activeMenuParentId);

    if (objIndex != '' && objIndex != undefined && menuList[objIndex]?.submenueItem != '' && menuList[objIndex]?.submenueItem != undefined) {
      if (menuList[objIndex].isOpenSubmenueItem == false) {
        menuList[objIndex].isOpenSubmenueItem = true
      } else {
        menuList[objIndex].isOpenSubmenueItem = false
      }
    }
    setIsOpenSubmenu(!isOpenSubmenu)

  }, [activeMenuParentId, menuList, ispageRefresh]);

  useEffect(() => {
    return () => {
      dispatch(drawerMenuActiveIdUpdateAction(1))
      menuList.map(u => u.isOpenSubmenueItem = false);
    }
  }, []);

  const toggleDropdown = () => {
    if (expanded == true) {
      // collapse dropdown
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start()

    } else {
      // expand dropdown
      Animated.timing(animatedHeight, {
        toValue: 100,
        duration: 1500,
        useNativeDriver: false
      }).start()
    }
    setExpanded(!expanded)
  }

  const interpolatedHeight = animatedHeight.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 90]
  })

  const interpolatedOpacity = animatedOpacity.interpolate({
    inputRange: [0, 100],
    outputRange: [0.0, 1.0]
  })


  const onLogout = () => {
    dispatch(logout(props));

  }
  const closeDrawerButton = () => {
    props.navigation.closeDrawer();
  }

  const goToProfilePage = () => {
    navigation.navigate('nonAuthScenes', {
      screen: 'Profile',
    })
  }

  const selectMenu = (item) => {
    if (item.id == 11) {
      // To open app settings
      Linking.openSettings();
      // openSettings();
      // To open settings
      // Linking.sendIntent('android.settings.SETTINGS');

      // To open GPS Location setting
      // Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
    }
    if (item.id == 12) {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.schemaphic.crestest&hl=en&gl=US',
      );
    }
    dispatch(drawerMenuActiveIdUpdateAction(item.id))
    setActiveMenu(item.id)
    setActiveSubmenueItem('')
    if (item.submenu && !item.isOpenSubmenueItem) {
      setActiveMenuParentId(item.submenueItem[0].parentId)

      setIspageRefresh(!ispageRefresh)
    } else if (item.submenu && item.isOpenSubmenueItem) {
      setActiveMenuParentId(item.submenueItem[0].parentId)
      setIspageRefresh(!ispageRefresh)
      toggleDropdown();
    }
    if (item.page != '') {
      navigation.navigate('drawerScenes', {
        screen: item.page,
        params: { data: 0 },
      });
    }
  }

  const selectSubMenu = (item) => {
    setActiveSubmenueItem(item.id)

    if (item.id == 92) {
      let text = 'Hello!'
      let whatsappNumber = '916289581169'
      // Linking.openURL(`whatsapp://send?text=${text}`);
      shareToWhatsAppWithContact(text, whatsappNumber)
    }

    if (item.page != '') {
      navigation.navigate('drawerScenes', {
        screen: item.page,
        params: { data: 0 },
      });
    }
  }

  const shareHandeler = async () => {
    const shareOption = {
      message: 'This is test message'
    }
    try {
      const ShareResponse = await Share.open(shareOption);

    } catch (err) {
      err && console.log(err);
    };

  }

  const shareToWhatsAppWithContact = (text, phoneNumber) => {
    Linking.openURL(`whatsapp://send?text=${text}&phone=${phoneNumber}`);
  }

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 100
    }).start();
  }

  return (
    <View style={[styles.parentContainer, styles.containerTopStyle]}>
      {/* <DrawerContentScrollView {...props}
        contentContainerStyle={styles.containerStyle}
      > */}
      <View style={styles.userDetailsContainer}>
        <View style={styles.userImageContainer}>

          <View disabled={userId == 0 ? true : false} style={styles.imageContainer}>

            {profile_pic != '' && profile_pic != null && profile_pic != undefined ?
              <>
                <Image source={{ uri: profile_pic }} style={Gstyles.imageStyle} />
              </>
              :
              <Image source={require('../assets/images/profile.png')} style={Gstyles.imageStyle} tintColor={"#137999"} />
            }
          </View>
          <TouchableOpacity onPress={closeDrawerButton} style={styles.closeButton}>
            <Ionicons name="close" color={'#000'} size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.nameDetails}>{fname + ' ' + lname}</Text>

          {userId != 0 ?
            <Text style={styles.classDetails}>Board: <Text style={styles.classDetailsBold}>{board_name},</Text> Class: <Text style={styles.classDetailsBold}>{class_id}</Text></Text>
            : null
          }
        </View>

        {/* <Text style={{ color: "#fff", fontSize: 18 }}>User</Text> */}
      </View>
      <TouchableOpacity onPress={() => userId == 0 ? null : goToProfilePage()} style={{ flexDirection: 'row', margin: 10, paddingLeft: 5, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#d4d4d4', paddingBottom: 10, }}>
        <Image
          source={require('../assets/images/clv.png')}
          style={{ width: 25, height: 25, marginRight: 10, }}
        />
        <Text style={styles.textBlackColor}>MY CLV Profile</Text>
      </TouchableOpacity>

      <ScrollView
        overScrollMode={'never'}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[scrollViewContainer, { flexGrow: 1, }]}
      >
        {/* <DrawerItemList {...props} /> */}
        <View style={styles.itemParentContainer}>
          {
            menuList != '' && menuList != undefined ?
              menuList.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {userId == 0 && item.permission != 'AUTH' || userId != 0 ?
                      <>
                        <TouchableOpacity style={[styles.itemIndividualContainer, activeMenu == item.id ? styles.activeBackgroundtColor : null]}
                          onPress={() => selectMenu(item)}
                        >

                          <View style={styles.itemLeftContainer}>
                            {item.iconName == 1 ?
                              <Ionicons name={item.icon} size={22} color={activeMenu == item.id ? activeTextColor : inActiveTextColor} />
                              : item.iconName == 2 ?
                                <MaterialCommunityIcons name={item.icon} size={22} color={activeMenu == item.id ? activeTextColor : inActiveTextColor} />
                                : null
                            }
                          </View>

                          <View style={styles.itemMiddleContainer}>
                            <Text style={activeMenu == item.id ? styles.activeTextColor : styles.inActiveTextColor}>{item.name}</Text>
                          </View>
                          {item.submenu ?
                            <View style={styles.itemRightContainer}>
                              <Ionicons name={activeMenuParentId == item.id && item.isOpenSubmenueItem ? item.downArrow : item.upArrow} size={22} color={activeMenu == item.id ? activeTextColor : inActiveTextColor} />
                            </View>
                            : null}

                        </TouchableOpacity>

                        {/* {item.submenueItem && activeMenuParentId == item.id && isOpenSubmenu ? */}
                        {item.submenueItem && item.isOpenSubmenueItem ?
                          <>
                            {/* <Animated.View style={[styles.container, { height: interpolatedHeight }]}> */}
                            {item.submenueItem.map((subitem, j) => {
                              return (
                                // <Animated.View style={[styles.subItemContainer, { height: interpolatedHeight }]} key={j}>
                                <TouchableOpacity style={[styles.subItemContainer, subitem.id == activeSubmenueItem ? styles.subItemContainerBackgroundColor : null]} key={j} onPress={() => selectSubMenu(subitem)}>
                                  <Ionicons name={subitem.icon} size={22} color={activeMenu == subitem.id ? activeTextColor : inActiveTextColor} style={styles.mr5} />
                                  <Text style={activeMenu == subitem.id ? styles.activeTextColor : styles.inActiveTextColor}>{subitem.name}</Text>
                                </TouchableOpacity>
                              )
                            })}
                            {/* </Animated.View> */}
                          </>
                          : null}

                      </>
                      : null}
                  </React.Fragment>
                );
              })
              : null
          }
        </View>
      </ScrollView >

      {/* </DrawerContentScrollView> */}
      < View style={styles.shareContainer} >
        <TouchableOpacity onPress={shareHandeler} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, }}>
          <Ionicons name="share-social-outline" color={'#000'} size={22} />
          <Text style={[styles.textBlackColor, { marginLeft: 5 }]}>Share to friend</Text>
        </TouchableOpacity>
      </View >

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={onLogout} style={{ flexDirection: 'row', alignItems: 'center', padding: 20, }}>
          <Ionicons name="exit-outline" color={'#000'} size={22} />
          <Text style={[styles.textBlackColor, { marginLeft: 5 }]}>Log Out</Text>
        </TouchableOpacity>
        <View style={{ marginRight: 20, }}>
          <Text style={[styles.textBlackColor, { fontSize: 10 }]}>Version:{appVersion}</Text>
        </View>
      </View>

    </View >
  )

};

const styles = StyleSheet.create(
  {

    parentContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderBottomRightRadius: 40,
      borderTopRightRadius: 170,
      padding: 0,
      margin: 0,
    },
    containerStyle: {
      marginTop: -4,
    },
    containerTopStyle: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    logoutContainer: {
      backgroundColor: '#F0A901',
      borderBottomRightRadius: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    },
    userDetailsContainer: {
      backgroundColor: '#F0A901',
      borderTopRightRadius: 40,
    },
    userImageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    closeButton: {
      backgroundColor: "#fff",
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginRight: 20,
      marginTop: 20,
    },

    imageStyle: {
      height: 76,
      width: 76,
      borderRadius: 40,
      /* 
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#fff',
      */
    },
    imageContainer: {
      height: 76,
      width: 76,
      borderRadius: 40,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    userDetails: {
      paddingLeft: 20,
      paddingBottom: 20,
    },
    nameDetails: {
      fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: "bold",
      fontStyle: "normal",
      color: "#245C75",
      marginBottom: 10
    },
    useridDetails:
    {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: "600",
      fontStyle: "normal",
      color: "#245C75"
    },
    classDetails: {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: "600",
      fontStyle: "normal",
      color: "#245C75"
    },
    classDetailsBold: {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: "bold",
      fontStyle: "normal",
      color: "#245C75"
    },
    shareContainer: {
      backgroundColor: '#fff',
      // borderBottomRightRadius: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: '#d4d4d4'
    },
    /* New Design */
    itemParentContainer: {
      flex: 1,
      // borderWidth: 1
    },
    itemIndividualContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: 10,
      marginRight: 10,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#DEDEDE',
      borderStyle: 'solid'
    },
    itemLeftContainer: {
      width: 40,
      // height:40,
      // borderWidth:1
    },
    itemMiddleContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // borderWidth:1,
    },
    itemRightContainer: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth:1,
    },
    container: {
      // backgroundColor: 'red',
      borderRadius: 25,
      // width: width * 0.95,
      marginBottom: 5,
      marginHorizontal: 5,
      paddingVertical: 15,
      paddingHorizontal: 15
    },
    activeTextColor: {
      color: '#fff'
    },
    inActiveTextColor: {
      color: '#333'
    },
    activeBackgroundtColor: {
      backgroundColor: '#137897',
    },
    subItemContainer: {
      paddingVertical: 10,
      marginLeft: 70,
      marginBottom: 10,
      marginRight: 12,
      borderRadius: 6,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    subItemContainerBackgroundColor: {
      backgroundColor: '#A2C7D2',
    },
    mr5: {
      marginRight: 5,
    },
    textBlackColor: {
      color:'#000'
    }


  }
);

export default CustomDrawer;