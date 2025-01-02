import React from 'react';
import { View, Text, StyleSheet,} from 'react-native';
const rRegular = "Roboto-Regular";
const rBold = 'Roboto-Bold';
const rMedium = 'Roboto-Medium';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const CurrentStatusComponent = (props) => {

    return (
        <View style={[styles.statusBoxContainer, props.serialId <= props.work_status ? styles.activeBorder : styles.inActiveBorder ]}>
            <View style={[styles.statusIconContainer,]}>
                <IconFontAwesome5 name={props.iconName} size={25} color={props.serialId <= props.work_status ? '#176E53' : '#D9D9D9'} />
            </View>
            <View style={styles.statusTextContainer}>
                <Text style={[styles.statusTextDetails, props.serialId <= props.work_status ? styles.activeText : styles.inActiveText ]}>{props.descriptionText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        statusBoxContainer: {
            width: 300,
            height: 70,
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 5,
            borderStyle: 'solid',
            borderColor: '#227159',
            padding: 10,
            marginBottom:10,
        },
        activeBorder: {
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 5,
            borderStyle: 'solid',
            borderColor: '#227159',
        },
        inActiveBorder: {
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 5,
            borderStyle: 'solid',
            borderColor: '#D9D9D9',
        },
        statusIconContainer: {
            flex: .2,
        },
        statusTextContainer: {
            flex: 1,
        },
        statusTextDetails: {
            fontSize: 16,
            fontFamily: rRegular
        },
        activeText: {
            color: "#227159",
        },
        inActiveText: {
            color: "#D9D9D9",
        }


    });

export default CurrentStatusComponent;