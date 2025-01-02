import React, { useState, useEffect } from 'react';
import { colors, fonts } from '../styles/Crestest.config';
import Gstyles from '../styles/GlobalStyle';
import ntse from '../assets/images/exam_type/ntse.png';
import nstse from '../assets/images/exam_type/nstse.png';
import geo_genious from '../assets/images/exam_type/geo_genious.png';
import nso from '../assets/images/exam_type/nso.png';
import imo from '../assets/images/exam_type/imo.png';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';


const CompetitiveSubTypeCategoryCard = (props) => {

    const [purchsedSet, setPurchsedSet] = useState('');
    const [matPurchsedSet, setMatPurchsedSet] = useState('');
    const [iconSize, setIconSize] = useState(12);

    useEffect(() => {
        // console.log("******", props)
        // console.log("***33***", props.matCount)
        // console.log("***33***", props)
    }, []);

    useEffect(() => {

        const setTotalData = [];
        var setText = null;
        for (let i = 0; i < props.satCount.no_set; i++) {
            let setText = {};
            setText['name'] = "ComSet " + (i + 1);
            setText['com_set_no'] = i + 1;
            setTotalData.push(setText);
        }
        setPurchsedSet(setTotalData)

        if (props.imageId == 1) {
            const setMatTotalData = [];
            var setText = null;
            for (let i = 0; i < props.matCount.no_set; i++) {
                let setText = {};
                setText['name'] = "ComSet " + (i + 1);
                setText['com_set_no'] = i + 1;
                setMatTotalData.push(setText);
            }
            setMatPurchsedSet(setMatTotalData)
        }

    }, [props.satCount, props.matCount]);

    const goToExamPage = (subscription_id, set_no, subtype) => {
        // console.log("goToExamPage------------", subscription_id, set_no, subtype, props.imageId)

        props.navigation.navigation.navigate('nonAuthScenes', {
            screen: "OnlineExamsDetails",
            params: { exam_type: props.imageId == 1 ? "NTSE" : "NSTSE", subscription_id: subscription_id, set_no: set_no, subtype: props.imageId == 1 ? subtype : 0, branchSortCode: subtype, chapter: 0, examFrom: 3, exam_category_id: 2, subject_id: 0, group_subject_id: 0 }
        })
    }

    return (
        props.imageId == 1 ?
            <>
                <View style={styles.parentContainer}>
                    <View style={[styles.leftContainer, styles.imageBox]}>
                        <Image source={props.imageId == 1 ? ntse : props.imageId == 2 ? nstse : props.imageId == 3 ? geo_genious : props.imageId == 4 ? nso : props.imageId == 5 ? imo : null} style={styles.imageStyle} />
                    </View>

                    <View style={styles.middleContainer} >
                        <Text style={styles.categoryHeading}>{props.subHeading}</Text>
                        <Text style={styles.categorySubHeading}>{props.subDetails}</Text>
                    </View>
                    <View style={[styles.rightContainer]}>
                        <Image source={props.imageId == 1 ? ntse : props.imageId == 2 ? nstse : props.imageId == 3 ? geo_genious : props.imageId == 4 ? nso : props.imageId == 5 ? imo : null} style={styles.rightImageStyle} tintColor={"#29A5B8"} />
                    </View>
                </View>
                {/* {console.log("{props.satCount.interm_count == 0-----", props.satCount.interm_count)} */}
                <View style={styles.setParentCotainer}>
                    {/* ==SAT */}
                    {purchsedSet != '' && props.id == 0 ?
                        purchsedSet.map((item, index) => {
                            return (
                                index + 1 == props.satCount.current_exam_set && props.satCount.is_active == 1 ?
                                    <TouchableOpacity onPress={() => goToExamPage(props.satCount.no_set, (index + 1), 1)} style={[styles.setindividualCotainer, styles.activeBackground]} key={index}>
                                        <Text style={styles.textWhite}>Set {index + 1} {props.satCount.interm_count == 0 ? '' : `(${props.satCount.interm_count}/3)`}</Text>
                                    </TouchableOpacity>
                                    :
                                    index + 1 < props.satCount.current_exam_set ?
                                        <View style={[styles.setindividualCotainer, styles.doneBackground]} key={index}>
                                            <Text style={styles.textWhite}>Set {index + 1} <FeatherIcon name="check-circle" size={iconSize} color={'#fff'} /></Text>
                                        </View>
                                        :
                                        <View style={[styles.setindividualCotainer, styles.notdoneBackground]} key={index}>
                                            <Text style={styles.textBlack}>Set {index + 1} </Text>
                                        </View>
                            )
                        })
                        :
                        null}

                    {/* ==MAT */}
                    {matPurchsedSet != '' && props.id == 1 && props.imageId == 1 ?
                        matPurchsedSet.map((item, index) => {
                            return (
                                index + 1 == props.matCount.current_exam_set && props.matCount.is_active == 1 ?
                                    <TouchableOpacity onPress={() => goToExamPage(props.matCount.no_set, (index + 1), 2)} style={[styles.setindividualCotainer, styles.activeBackground]} key={index}>
                                        <Text style={styles.textWhite}>Set {index + 1} {props.matCount.interm_count == 0 ? '' : `(${props.matCount.interm_count}/3)`}</Text>
                                    </TouchableOpacity>
                                    :
                                    index + 1 < props.matCount.current_exam_set ?
                                        <View style={[styles.setindividualCotainer, styles.doneBackground]} key={index}>
                                            <Text style={styles.textWhite}>Set {index + 1} <FeatherIcon name="check-circle" size={iconSize} color={'#fff'} /></Text>
                                        </View>
                                        :
                                        <View style={[styles.setindividualCotainer, styles.notdoneBackground]} key={index}>
                                            <Text style={styles.textBlack}>Set {index + 1} </Text>
                                        </View>
                            )
                        })
                        :
                        null}
                </View>
            </>
            :
            <>
                <View style={styles.parentContainer}>
                    <View style={[styles.leftContainer, styles.imageBox]}>
                        <Image source={props.imageId == 1 ? ntse : props.imageId == 2 ? nstse : props.imageId == 3 ? geo_genious : props.imageId == 4 ? nso : props.imageId == 5 ? imo : null} style={styles.imageStyle} />
                    </View>

                    <View style={styles.middleContainer} >
                        <Text style={styles.categoryHeading}>{props.subHeading}</Text>
                        <Text style={styles.categorySubHeading}>{props.subDetails}</Text>
                    </View>
                    <View style={[styles.rightContainer]}>
                        <Image source={props.imageId == 1 ? ntse : props.imageId == 2 ? nstse : props.imageId == 3 ? geo_genious : props.imageId == 4 ? nso : props.imageId == 5 ? imo : null} style={styles.rightImageStyle} tintColor={"#29A5B8"} />
                    </View>
                </View>

                <View style={styles.setParentCotainer}>
                    {/* ==SAT */}
                    {purchsedSet != '' && props.id == 0 ?
                        purchsedSet.map((item, index) => {
                            return (
                                index + 1 == props.satCount.current_exam_set ?
                                    <TouchableOpacity onPress={() => goToExamPage(props.satCount.no_set, (index + 1), 1)} style={[styles.setindividualCotainer, styles.activeBackground]} key={index}>
                                        <Text style={styles.textWhite}>Set {index + 1} {props.satCount.interm_count == 0 ? '' : `(${props.satCount.interm_count}/3)`}</Text>
                                    </TouchableOpacity>
                                    :
                                    index + 1 < props.satCount.current_exam_set ?
                                        <View style={[styles.setindividualCotainer, styles.doneBackground]} key={index}>
                                            <Text style={styles.textWhite}>Set {index + 1} <FeatherIcon name="check-circle" size={iconSize} color={'#fff'} /></Text>
                                        </View>
                                        :
                                        <View style={[styles.setindividualCotainer, styles.notdoneBackground]} key={index}>
                                            <Text style={styles.textBlack}>Set {index + 1} </Text>
                                        </View>
                            )
                        })
                        :
                        null}
                </View>
            </>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            width: "95%",
            height: 70,
            borderRadius: 10,
            backgroundColor: colors.competitiveCategoryBackground,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 7,
            marginBottom: 10,
            alignSelf: 'center'
        },
        imageBox: {
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: 7,
            alignSelf: 'center',
            justifyContent: 'center'
        },
        imageStyle: {
            flex: .8,
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        },
        rightImageStyle: {
            flex: .9,
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            opacity: 0.8,
        },
        leftContainer: {
            flex: .25,
            backgroundColor: "#ff0000",
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        middleContainer: {
            flex: 1,
            // backgroundColor: "#00ff00",
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 10,
        },
        rightContainer: {
            flex: .25,
            // backgroundColor: "#ff0000",
        },
        categoryHeading: {
            fontFamily: fonts.rMedium,
            color: colors.textWhite,
            fontSize: 16,
            textTransform: 'uppercase'
        },
        categorySubHeading: {
            fontFamily: fonts.rLight,
            color: colors.textWhite,
            fontSize: 12,
        },
        //disable
        parentDisableContainer: {
            width: "95%",
            height: 70,
            borderRadius: 10,
            backgroundColor: colors.disableBackground,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 7,
            marginBottom: 10,
        },
        disableImageBox: {
            width: "100%",
            height: "100%",
            backgroundColor: colors.disableWhiteBackground,
            borderRadius: 7,
            alignSelf: 'center',
            justifyContent: 'center'
        },

        setParentCotainer: {
            // width: "100%",
            // backgroundColor: '#00fff0',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginBottom: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            marginHorizontal: 10,
        },

        setindividualCotainer: {
            width: 75,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#8389E0',
            borderRadius: 5,
            margin: 5,
            // flexWrap:'wrap',
        },
        doneBackground: {
            backgroundColor: '#8389E0'
        },
        activeBackground: {
            backgroundColor: '#02879B'
        },
        notdoneBackground: {
            backgroundColor: '#E7E7E7',
            borderColor: '#C6C6C6',
            borderStyle: 'solid',
            borderWidth: 1,
        },
        textWhite: {
            color: '#fff'
        },
        textBlack: {
            color: '#000'
        }

    });

export default CompetitiveSubTypeCategoryCard;