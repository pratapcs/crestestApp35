import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
// import DeviceInfo from 'react-native-device-info';
import {Image} from 'react-native';
import {fonts} from '../../styles/Crestest.config';

import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';

const trasparent = 'rgba(0,0,0,0.5)';

const ApkUpdateComponent = (props) => {

    const [status, setStaus] = useState(false);

    useEffect(() => {
        // getAppUpgradeStatus()
    }, []);

    const getAppUpgradeStatus = async () => {
        let currentVersion = DeviceInfo.getVersion();
        try {
            const data = await firestore()
                .collection('crestest_app_version')
                .doc('5l156cWKBoixuLIpC8ld')
                .get();
            const documentData = data.data();
            
            if (documentData) {
                if (parseFloat(documentData.min_version) > parseFloat(currentVersion)) {
                    Alert.alert(
                        'Alert',
                        'Your app is out of date. You must update the app to proceed.',
                        [
                            {
                                text: 'Update Now',
                                onPress: () => onUpdateHandler(),
                                style: 'cancel',
                            },
                        ],
                    );
                } else {
                    if (
                        parseFloat(documentData.latest_version) > parseFloat(currentVersion)
                    ) {
                        setTimeout(() => {
                            setStaus(true);
                        }, 2000);
                    }
                }
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };

    const onUpdateHandler = () => {
        Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.crestest&hl=en&gl=US', 
        );
      };

    if (status) {
        return (
          <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.container}>
              <View style={styles.subContainer}>
                <View style={styles.logoView}>
                  <Image style={styles.logo} source={require('../../assets/images/clv.png')} />
                  <Text style={styles.titleStyle}>
                    There is a new version on store.
                  </Text>
                </View>
                <View style={styles.btnGroupView}>
                  <TouchableOpacity
                    style={styles.laterBtnStyle}
                    onPress={() => setStaus(false)}>
                    <Text style={styles.btnTextStyle}>Later</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.laterBtnStyle}
                    onPress={() => onUpdateHandler()}>
                    <Text style={styles.btnTextStyle}>Update Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        );
      } else {
        return (
          <View style={{display: 'none'}}>
            <Text>Error</Text>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        subContainer: {
        //   marginTop: wp('20%'),
          width: wp('80%'),
          height: wp('60%'),
          borderRadius: wp('2%'),
          backgroundColor: '#ffffff',
          paddingVertical: wp('5%'),
          paddingHorizontal: wp('5%'),
        },
        btnGroupView: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        laterBtnStyle: {
          width: wp('30%'),
          height: wp('10%'),
        //   backgroundColor: lightTheme.colors.primary,
          backgroundColor: '#245c75',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: wp('2%'),
          marginHorizontal: wp('2%'),
        },
        logo: {
          width: wp('20%'),
          height: wp('20%'),
        },
        logoView: {
          flex: 1,
          alignItems: 'center',
        },
        titleStyle: {
          fontSize: wp('4%'),
          fontFamily: fonts.rRegular,
          color: '#000000',
          paddingTop: wp('2%'),
        },
        btnTextStyle: {
          color: '#ffffff',
        },
      });

export default ApkUpdateComponent;