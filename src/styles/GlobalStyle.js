import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { colors, fonts, textSize, rbSheetBorderRdious, fontSize } from './Crestest.config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const rRegular = "Roboto-Regular";
const rBold = 'Roboto-Bold';
const rMedium = 'Roboto-Medium';

const Gstyles = StyleSheet.create(
    {
        fdr: {
            flexDirection: 'row',
        },
        w50: {
            width: '50%'
        },
        labelMargin: {
            marginLeft: 10,
            marginBottom: 5,
        },
        inputLabel: {
            fontFamily: fonts.rRegular,
            fontSize: 14,
            color: colors.inputText,
        },
        inputMandatoryMark: {
            fontFamily: fonts.rRegular,
            fontSize: 14,
            color: colors.mandatoryMark,
            marginLeft: 5
        },
        topParentContainer:
        {
            height: (55 / 72) * width,
            // height: (width / height) * width,
            // marginBottom: 5,
        },
        signupTopParentContainer:
        {
            height: hp('50%'),
        },

        imageContainer: {

        },
        topImage:
        {
            width: '100%',
            height: '100%',
            resizeMode: (Platform.OS === 'ios') ? 'cover' : 'stretch',
            // borderBottomLeftRadius: 20,
            // borderBottomRightRadius: 20,
        },

        bottomParentContainer:
        {
            flex: 1,
            paddingHorizontal: 20,
            alignContent: 'flex-start',
            // backgroundColor: '#d8b002'
        },
        signupBottomParentContainer:
        {
            flex: 1,
            paddingHorizontal: 20,
            alignContent: 'flex-start',
            backgroundColor: '#d8b002'
        },
        heading: {
            fontFamily: fonts.rMedium,
            textAlign: 'left',
            // fontSize: width < 500 ? 25 : height * 0.040,
            // fontSize: 35,
            fontSize: wp('7%'),
            fontWeight: "500",
            color: colors.headingTextRed,
        },
        details: {
            fontFamily: fonts.rRegular,
            marginTop: 5,
            // alignSelf: 'center',
            textAlign: 'left',
            // fontSize: width < 500 ? 14 : height * 0.022,
            fontSize: 14,
            fontWeight: "400",
            color: colors.subheadingGreytext,
        },
        bolddetails: {
            fontFamily: fonts.rBold,
            alignSelf: 'center',
            fontSize: width < 500 ? 14 : height * 0.020,
            fontWeight: "400",
            color: colors.subheadingGreytext
        },
        signupText: {
            alignSelf: 'center',
            flexDirection: 'row',
            fontSize: width < 500 ? 14 : height * 0.020,
            fontWeight: "400",
            color: colors.subheadingGreytext
        },
        inputContainer: {
            marginTop: 20,
            marginBottom: 20,
        },
        inputContainerTwo: {
            marginTop: 10,
            // marginBottom: 20,
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
        dropdownInput: {
            width: '100%',
            height: width < 500 ? 50 : height * 0.060,
            marginBottom: 12,
            borderWidth: 1,
            // padding: 10,
            backgroundColor: colors.backgroundWhite,
            borderColor: colors.inputBorder,
            borderRadius: 10,
            fontSize: width < 500 ? 14 : height * 0.020,
            color: colors.inputText,
        },
        passwordInput: {
            width: '100%',
            height: width < 500 ? 50 : height * 0.060,
            // marginBottom: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: colors.backgroundWhite,
            borderColor: colors.inputBorder,
            borderRadius: 10,
            fontSize: width < 500 ? 14 : height * 0.020,
            color: colors.inputText,
        },
        inputTouchable: {
            height: width < 500 ? 50 : height * 0.060,
            width: '100%',
            // backgroundColor: '#f00',
            opacity: 0,
            position: 'absolute',
            bottom: 11,
        },
        buttonContainer: {
            alignSelf: 'center',
            width: width < 500 ? '100%' : '80%',
            height: width < 500 ? 50 : height * 0.070,
            // backgroundColor: colors.baseColor,
            borderRadius: width < 500 ? 30 : 50,
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
            padding: width < 500 ? 4 : 10,
            marginTop: 20,
            marginBottom: 20,
        },

        singlebuttonContainer: {
            alignSelf: 'center',
            width: width < 500 ? '100%' : '80%',
            height: width < 500 ? 50 : height * 0.070,
            // backgroundColor: colors.baseColor,
            borderRadius: width < 500 ? 30 : 50,
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            padding: width < 500 ? 4 : 10,
            marginTop: 20,
            marginBottom: 20,
        },
        rbButtonContainer: {
            alignSelf: 'center',
            width: width < 500 ? '100%' : '80%',
            height: width < 500 ? 50 : height * 0.070,
            // backgroundColor: colors.baseColor,
            borderRadius: width < 500 ? 30 : 50,
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
            padding: width < 500 ? 4 : 10,
            marginVertical: 10,
        },

        buttonLeftContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '48%',
            // backgroundColor: colors.buttonYellow,
            borderRadius: 30,
            // borderColor: colors.buttonBorderBlack,
            // borderWidth: 1,
            // borderStyle: 'solid',
            color: colors.buttonTextWhite
        },
        disableButtonBackground: {
            backgroundColor: colors.buttonDisableBackground
        },
        yellowButtonBackground: {
            backgroundColor: colors.buttonYellow,
        },
        signupBackground: {
            backgroundColor: '#962424',
        },
        blueButtonBackground: {
            backgroundColor: colors.buttonBlue,
        },
        dangerButtonBackground: {
            backgroundColor: colors.dangerBackground,
        },
        successButtonBackground: {
            backgroundColor: colors.successBackground,
        },
        disableButtonBackground: {
            backgroundColor: colors.notAttendedBackgroundColor,
        },
        yellowBackground: {
            backgroundColor: colors.backgroundYellow,
        },
        buttonRightContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '48%',
            backgroundColor: colors.buttonBlue,
            borderRadius: 30,
            // borderColor: colors.buttonBorderBlack,
            // borderWidth: 1,
            // borderStyle: 'solid',
        },
        buttonText: {
            fontFamily: fonts.rBold,
            // color: colors.buttonTextWhite,
            fontSize: width < 500 ? 14 : height * 0.020,
        },
        disableText: {
            color: colors.disableText,
        },
        buttonWhiteText: {
            color: colors.buttonTextWhite,
        },
        whiteText: {
            color: colors.textWhite,
        },
        signupNormalText: {
            fontFamily: fonts.rMedium,
            color: colors.textBlue,
            fontSize: width < 500 ? 14 : height * 0.020,
            marginRight: 5,
        },
        signupLinkText: {
            fontFamily: fonts.rBold,
            color: colors.linkBlue,
            fontSize: width < 500 ? 14 : height * 0.020,
        },
        passwordInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        passwordContainer:
        {
            width: '100%',
        },
        eyeContainer: {
            height: width < 500 ? 50 : height * 0.060,
            width: width < 500 ? '12%' : height * 0.060,
            position: 'absolute',
            top: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center'
        },
        eyePosition: {
            /* alignContent: 'center',
            bottom: width < 500 ? 5 : 10,
            right: width < 500 ? 30 : 50, */
        },

        //Setlect dropdown list style--------------
        dropdown3BtnStyle: {
            width: '100%',
            height: 50,
            backgroundColor: '#FFF',
            paddingHorizontal: 0,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#444',
        },

        dropdown1BtnStyle: {
            width: '100%',
            height: 50,
            backgroundColor: '#FFF',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            marginBottom: 12,
        },
        dropdown1BtnTxtStyle: {
            color: colors.inputText,
            textAlign: 'left',
            fontSize: width < 500 ? 14 : height * 0.020,
            left: 5
        },
        dropdown1BtnTxtBlankStyle: {
            color: colors.inputPlaceText,
            textAlign: 'left',
            fontSize: width < 500 ? 14 : height * 0.020,
            left: 5
        },
        dropdown1RowStyle: {
            backgroundColor: '#EFEFEF',
            borderBottomColor: '#C5C5C5',
            height: 40,
        },
        dropdownNewRowStyle: {
            backgroundColor: '#60C5F1',
            borderBottomColor: '#C5C5C5',
            height: 40,
        },
        dropdown1DropdownStyle: {
            backgroundColor: '#EFEFEF',
        },
        dropdownSchoolNameListStyle:{
            backgroundColor: '#EFEFEF',
            height:240,
        },
        dropdown1RowTxtStyle: {
            color: '#444',
            textAlign: 'left',
            fontSize: width < 500 ? 14 : height * 0.020,
            color: colors.inputText,
        },

        //end Setlect dropdown list style

        bottomContainer: {
            width: '100%',
            height: 50,
            backgroundColor: colors.buttonBlue,
            justifyContent: 'center',
            alignItems: 'center',
        },
        hintsText: {
            fontSize: textSize.hintText,
            color: colors.hintText,
            marginHorizontal: 10,
            marginBottom: 12,
            textAlign: 'justify',
        },
        modalRbCloseButtonContainer:
        {
            width: 25,
            height: 25,
            borderRadius: 50,
            backgroundColor: colors.backgroundWhite,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 200,
        },
        timer_container: {
            width: 50,
            justifyContent: 'center',
            alignContent: 'center'
        },
        examTimer_container: {
            width: 10,
            justifyContent: 'center',
            alignContent: 'center',
        },

        counterClockContainer: {
            // flexDirection:'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        examCounterClockContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth:1,
            height: 30,
        },

        remainingText: {
            color: colors.inputText,
        },
        examRemainingText: {
            color: colors.inputText,
            fontSize: 18,
        },
        examRemainingTextWhite: {
            color: colors.textWhite,
            fontSize: 14,
        },
        examRemainingTextRed: {
            color: "#ff0000",
            fontSize: 14,
        },
        timerCounter: {
            marginTop: 10,
        },
        rbSheetStyle: {
            height: 530,
            borderTopLeftRadius: rbSheetBorderRdious.topLeftRadius,
            borderTopRightRadius: rbSheetBorderRdious.topRightRadius,
        },
        bottomContainer: {
            backgroundColor: '#fff',
            width: '100%',
            // height:'100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        imageStyle: {
            height: 76,
            width: 76,
            borderRadius: 40,
            // resizeMode:'contain'
        },
        imageContainerforUser: {
            height: 76,
            width: 76,
            borderRadius: 40,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#fff'
        },
        topUserDetails: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 150,
            paddingHorizontal: 20,
        },
        topUserTextDetails: {
            color: colors.textWhite,
            fontSize: 15,
            fontFamily: rRegular
        },
        studentName: {
            color: colors.textWhite,
            fontSize: 16,
            fontFamily: fonts.rLight
        },
        wishesDetails: {
            color: colors.textWhite,
            fontSize: 15,
            fontFamily: fonts.rLight
        },
        imageBackgroundContainer: {
            flex: 1,
            width: '100%',
        },
        insideParentContainer: {
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            flex: 1,
            // borderWidth:1,
            // borderStyle:'solid',
            // borderColor:'#ff0000'
        },
        scrollViewContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        firstContainer: {
            flex: 1,
            backgroundColor: '#7FDFC2',
            alignItems: 'center',
            justifyContent: 'center',
        },
        roundContainer: {
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: '#0B3E3F',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 80,
        },
        statusHeading: {
            color: "#E7BC00",
            fontSize: 40,
            fontFamily: rBold,
            lineHeight: 40,
        },
        statusSubHeading: {
            color: colors.textWhite,
            fontSize: 16,
            fontFamily: rRegular
        },
        parentContainer:
        {
            flex: 1,
            justifyContent: 'space-between'
        },
        dateContainer: {
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            marginVertical: 10,
        },
        dateDetails: {
            color: colors.textBlue2,
            fontSize: 20,
            fontFamily: rBold,
        },
        historyListContainer: {
            flex: 1,
            /* borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#ff0000', */
        },
        historyImageContainer: {
            flex: .2,
            alignItems: 'flex-end',
        },
        bottomHistoryImage:
        {
            // width: '100%',
            height: '100%',
            resizeMode: 'contain',
            alignSelf: 'flex-end'
        },
        insideOnlineExamParentContainer: {
            flex: 1,
            width: '100%',
            backgroundColor: '#fff',
            // borderRadius:20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 20,
        },
        examParentContainer: {
            flex: 1,
        },
        examHeading: {
            fontSize: 14,
            fontFamily: rRegular,
            color: colors.textWhite,
            marginBottom: 10,
        },
        examTopContainer: {
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
            // width:'100%',
            // borderWidth: 2,
            // borderStyle: 'solid',
            // borderColor: '#ff0000',
        },
        examSubmitContainer: {
            width: '100%',
            height: 50,
            backgroundColor: colors.textBlue2,
            justifyContent: 'center',
            alignItems: 'center'
        },


        examSubmitText: {
            fontSize: 14,
            fontFamily: rBold,
            color: colors.textWhite,
        },
        examInsideTopContainer: {
            backgroundColor: colors.textBlue2,
            // paddingHorizontal: 10,
            padding: 5,
            height: 40,
            marginBottom: 15,
        },
        examOptionContainer: {
            alignItems: 'center',
            paddingVertical: 20,
        },
        examTopOptionContainer: {
            flex: 1,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 15,
        },
        lightSky: {
            backgroundColor: '#55BAD8'
        },
        lightGreen: {
            backgroundColor: '#90B817'
        },
        dashboardIconBackground: {
            backgroundColor: '#D89455'
        },
        dashboardQuestionNumberIconBackground: {
            backgroundColor: '#56C760'
        },
        dashboardInfoIconBackground: {
            backgroundColor: '#E0B326'
        },
        dashboardUserIconBackground: {
            backgroundColor: '#B2A2A2'
        },
        OptionItemContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 35,
            height: 35,
            borderRadius: 100,
            // backgroundColor:'#ff0000'
        },
        examInfoContainer: {
            height: 40,
            width: '100%',
            // backgroundColor: '#ff0000',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
        },
        examInfoInsideContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            // height:30,
            // borderWidth:1,
        },
        examInfoTextContainer: {
            marginLeft: 4,
        },
        examInfoText: {
            fontFamily: fonts.rRegular,
            fontSize: 16,
            color: colors.textBlue2,
        },

        showQuestionContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'relative',
        },
        showAssessmentContainer: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'relative',
        },
        showAnswerContainer: {
            flex: .5,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'#ff0000'
            // marginHorizontal: 10,
        },

        showAnswerInsideContainer: {
            flex: 1,
            // borderWidth: 1,
            // borderColor: '#00ff00',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },

        answerContainer: {
            flex: .9,
            backgroundColor: '#fff',
            borderRadius: 5,
            // marginRight: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 4,
            marginBottom: 5,
            padding: 5,
            justifyContent: 'center',
            // borderWidth: 1,
            // borderColor: '#0000ff',
        },
        answerSubmitContainer: {
            flex: .12,
            // backgroundColor: '#ff0000',
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },

        answerSubmitInsideContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.textBlue2,
            width: 60,
            height: 60,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 4,
        },

        previousQuestionContainer: {
            width: 20,
            height: 70,
            backgroundColor: '#AEB3B2',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },

        previousQuestionNewContainer: {
            width: "80%",
            height: 40,
            backgroundColor: '#E0E0E0',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        previousQuestionNewBigHeightContainer: {
            height: 40,
        },
        previousQuestionNewSmallHeightContainer: {
            height: 20,
        },
        previousQuestionDisableContainer: {
            width: 20,
            height: 70,
            backgroundColor: '#AEB3B2',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: .2,
        },
        previousQuestionContainerDisable: {
            width: 20,
            height: 70,
            // backgroundColor: '#AEB3B2',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        currentQuestionContainer: {
            // width:'100%',
            flex: .93,
            height: '100%',
            marginHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 4,
            marginBottom: 10,
        },

        questionRightSideOption: {
            position: 'absolute',
            right: 0,
            top: 50,
            marginBottom: 20,
            height: '90%',
            width: 30,
            // backgroundColor:'#ff0000',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
        },
        questionRightSideOptionParentContainer: {
            flex: 1,
            // backgroundColor:'#00ff00',
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        questionRightSideOptionNextContainer: {
            flex: 1,
            backgroundColor: '#0000ff',
        },
        questionRightSideOptionOtherOptionContainer: {
            flex: 1,
            backgroundColor: '#ff00ff',
        },

        nextQuestionContainer: {
            width: 20,
            height: 70,
            backgroundColor: '#AEB3B2',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        nextQuestionDisableContainer: {
            width: 20,
            height: 70,
            backgroundColor: '#AEB3B2',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: .2
        },
        nextQuestionContainerDisable: {
            width: 20,
            height: 70,
            // backgroundColor: '#AEB3B2',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        questionImage:
        {
            marginTop: 10,
            height: 180,
            width: '87%',
            resizeMode: 'stretch',
            // resizeMode: (Platform.OS === 'ios') ? 'cover' : 'stretch',
        },
        showAnswerContainerIndividual: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            marginBottom: 10,
            // minHeight:40, 
            flexGrow: 1
        },
        selectAnswerBorderColor: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: colors.selectAnsweredBorder,
            borderRadius: 5,
            minHeight: 40,
            alignItems: 'flex-start'
        },
        optionBorderColor: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#efefef',
            // borderColor: '#ff0000',
            borderRadius: 5,
            minHeight: 40,
            // justifyContent:'flex-start',
            alignItems: 'flex-start'
        },
        answerBorderColor: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'green',
            borderRadius: 5,
        },
        answerOptionContainer: {
            width: 30,
            height: 30,
            backgroundColor: '#245C75',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            alignSelf: 'flex-start'
        },
        answerOptionInsideContainer: {
            width: 25,
            height: 25,
            backgroundColor: '#245C75',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#E0B326',
            // flexGrow:1
        },
        answerOptionKey: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        answerOption: {
            color: '#245C75',
            fontSize: 16,
            fontWeight: 'bold',
            width: '90%',
            // flex: 1,
            minHeight: 38,
        },
        textCenter: {
            textAlign: 'center'
        },
        font18: {
            fontSize: 18,
        },
        font16: {
            fontSize: 16,
        },
        font14: {
            fontSize: 14,
        },
        textBlue: {
            color: colors.textBlue2,
        },
        fdr: {
            flexDirection: 'row'
        },
        jcc: {
            justifyContent: 'center'/* fsb */
        },
        jcsb: {
            justifyContent: 'space-between',
        },
        aic: {
            alignItems: 'center'
        },
        flex1: {
            flex: 1,
        },
        fw: {
            flexWrap: 'wrap'
        },
        w100: {
            width: '100%'
        },
        mh10: {
            marginHorizontal: 10,
        },
        pv5: {
            paddingVertical: 5,
        },
        ph10: {
            paddingHorizontal: 10,
        },
        height100Percentage: {
            height: '100%',
        },
        counterHeight: {
            height: 40,
        },
        textColorWhite: {
            color: colors.textWhite,
        },
        textColorBlack: {
            color: "#000",
        },
        fontSize12: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        fontSize12Normal: {
            fontSize: 12,
        },
        fontSize14: {
            fontSize: 14,
            fontWeight: 'bold'
        },
        fontSize14Normal: {
            fontSize: 16,
        },
        marginTopBottom15: {
            marginVertical: 15,
        },
        pv10: {
            paddingVertical: 10,
        },
        pv7: {
            paddingVertical: 7,
        },
        answeredBackground: {
            backgroundColor: colors.answeredBackground,
        },

        visitedBackground: {
            backgroundColor: colors.visitedBackground,
        },

        notVisitedBackground: {
            backgroundColor: colors.notVisitedBackground,
        },

        selectQuestionBox: {
            borderColor: colors.selectBorder,
            borderWidth: 2,
            borderStyle: 'solid',
        },

        questionNumberContainer: {
            flex: 1,
            marginTop: 10,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#C2C1BF',
            padding: 10,
            // alignItems:'center',
            justifyContent: 'center'
        },
        questionNumberBox: {
            width: 42,
            height: 35,
            // backgroundColor: colors.visitedBackground,
            borderRadius: 3,
            marginRight: 5,
            marginBottom: 5,
        },
        roundPointer: {
            width: 10,
            height: 10,
            backgroundColor: colors.visitedBackground,
            borderRadius: 100,
            marginRight: 10,
            top: 5,
        },
        instructionContainer: {
            width: '90%'
        },
        rbInstructionContainer: {
            width: '90%',
            alignContent: 'center',
            // borderWidth: 1,
            // borderColor: '#ff0000'
        },

        instructionText: {
            fontSize: 14,
            color: colors.textBlue2,
        },
        mb10: {
            marginBottom: 10,
        },
        mb5: {
            marginBottom: 5,
        },
        mr5: {
            marginRight: 5
        },
        fw600: {
            fontWeight: '600'
        },
        userDetailsParentContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        userDetailsContainer: {
            height: 200,
            // borderWidth: 2,
            // borderStyle: 'solid',
            // borderColor: '#E0B326',
            width: '100%',
        },
        userHeading: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        userHeadingText: {
            fontSize: 18,
            // fontWeight:'bold'
            color: colors.textBlue2,
        },
        userImageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
        },
        userName: {
            fontSize: 16,
            // fontWeight:'bold'
            color: colors.textBlue2,
        },
        userdetailsContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        userdetailsIndividualContainer: {
            flexDirection: 'row'
        },
        userdetailsIndividualText: {
            fontSize: 16,
            // fontWeight:'bold'
            color: colors.textBlue2,
        },
        userdetailsIndividualHighlightText: {
            fontWeight: 'bold'
        },
        headingIconPosition: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#E0B326',
        },
        goodLuckColor: {
            color: colors.goodLuckColor
        },
        pageDetailsTopContainer: {
            width: '100%',
            marginBottom: 10,
        },
        assessmentDetilsContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            // width: '95%',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            marginVertical: 2,
        },
        dashboardBottomContainer: {
            // height: 240,
            // paddingHorizontal: 10,
            // paddingBottom:10,
            marginBottom: 10,
            // borderColor:'#ff0000',
            // borderWidth:1,
        },
        dashboardBottomTextContainer: {
            paddingHorizontal: 20,
        },
        dashboardBottomText: {
            color: colors.textBlue2,
            fontFamily: fonts.rLight,
            fontWeight: 'normal'
        },
        competitiveSubCategoryParentContainer: {
            // width:'100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
            paddingVertical: 10,
        },
        scholasticDropdownStyle: {
            backgroundColor: colors.scholasticColor,
        },
        scholasticBtnStyle: {
            width: '100%',
            height: 50,
            backgroundColor: colors.scholasticColor,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            marginBottom: 12,
        },
        scholasticInsideParentContainer: {
            margin: 10,
        },
        scholasticRowStyle: {
            backgroundColor: '#EFEFEF',
            borderBottomColor: '#C5C5C5',
            height: 40,
        },
        scholasticRowStyle1: {
            backgroundColor: '#ff0000',
            borderBottomColor: '#C5C5C5',
            height: 40,
        },
        scholasticRowTxtStyle: {
            color: '#fff',
            textAlign: 'left',
            fontSize: width < 500 ? 14 : height * 0.020,
            color: colors.inputText,
        },
        scholasticBtnTxtBlankStyle: {
            color: '#fff',
            textAlign: 'left',
            fontSize: width < 500 ? 14 : height * 0.020,
            left: 5
        },
        scholasticDropdownContainer: {
            /* borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#E0B326', */
        },

        scholasticBottomParentContainer: {
            flex: 1,
            borderWidth: 4,
            borderStyle: 'solid',
            borderColor: colors.scholasticBorderColor,
            margin: 10,
            borderRadius: 10,
        },
        scholasticBottominsideTopContainer: {
            width: '100%',
            height: 40,
            backgroundColor: colors.scholasticColor,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
        },
        scholasticChapterListHeading: {
            fontFamily: fonts.rLight,
            color: colors.textWhite,
            fontSize: 20,
        },
        scholasticBottominsideBottomContainer: {
            flex: 1,
            paddingVertical: 10,
        },
        chapterListScrollViewContainer: {
            // flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginHorizontal: 20,
            marginBottom: 30,
        },
        chapterListIndividualContainer: {
            width: '100%',
            marginBottom: 7,
            paddingBottom: 7,
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            borderBottomColor: '#e7e7e7',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
        },
        chapterNumber: {
            fontSize: 14,
            fontFamily: fonts.rMedium
        },
        chapterSubHeading: {
            fontSize: 16,
            fontFamily: fonts.rLight
        },
        doneChapterNumber: {
            fontSize: 14,
            fontFamily: fonts.rMedium,
            color: '#bfbdbd',
        },
        doneChapterSubHeading: {
            fontSize: 16,
            fontFamily: fonts.rLight,
            color: '#bfbdbd',
        },
        intermChapterNumber: {
            fontSize: 14,
            fontFamily: fonts.rMedium,
            color: '#2d6179',
        },
        intermChapterSubHeading: {
            fontSize: 16,
            fontFamily: fonts.rLight,
            color: '#2d6179',
        },
        bottomRbSheetTopHeadingContainer: {
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: '#C2C1BF',
            height: 35,
            justifyContent: 'center',
            alignItems: 'center'
        },
        bottomRbSheetinstructionContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            margin: 10,
        },

        bottomRbSheetIndividualCheckBoxContainer: {
            alignSelf: 'flex-start',
            marginVertical: 5,
            width:'100%',
        },
        infoText: {
            fontSize: 12,
            fontFamily: fonts.rLight,
            textAlign: 'center'
        },
        elibraryChapterListScrollViewContainer: {
            // alignItems: 'center',
            justifyContent: 'center',
        },

        subscriptionListParentContainer: {
            justifyContent: 'space-around',
        },

        purchaseListParentContainer: {
            alignItems: 'center',
            justifyContent: 'space-center',
            // flexWrap:'wrap',
            // borderWidth:1,
            // borderColor:'#ff0000',
            // width:'200%',
            // flex:1,
        },

        assessmentNumberContainer: {
            position: 'absolute',
            right: 10,
            bottom: 10,
            zIndex: 100,
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: "#fff",
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#2d6179',
            borderWidth: 1,
        },
        pageOrientationContainer: {
            position: 'absolute',
            left: 10,
            bottom: 10,
            zIndex: 100,
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: "#fff",
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#2d6179',
            borderWidth: 1,
        },

        purchasedInfoContainer: {
            wdith: '100%',
            height: 30,
            backgroundColor: colors.competitiveColor,
            justifyContent: 'center',
            alignItems: 'center',
        },
        assesmentIndividualContainer: {
            padding: 10,
            margin: 7,
            borderWidth: 4,
            borderStyle: 'solid',
            borderRadius: 7,
            flexDirection: 'column',
            flex: 1,
        },
        correctAssessmentBorder: {
            borderColor: colors.correctAssessmentBorder,
        },
        inCorrectAssessmentBorder: {
            borderColor: colors.inCorrectAssessmentBorder,
        },
        notAttendedBorder: {
            borderColor: colors.notAttendedBorder,
        },
        correctAssessmentBackgroundColor: {
            backgroundColor: colors.correctAssessmentBackgroundColor,
        },
        inCorrectAssessmentBackgroundColor: {
            backgroundColor: colors.inCorrectAssessmentBackgroundColor,
        },
        notAttendedBackgroundColor: {
            backgroundColor: colors.notAttendedBackgroundColor,
        },
        assessmentLeftWidth: {
            width: 70,
        },
        assessmentRighttWidth: {
            width: '78%',
        },
        assessmentOptionRighttWidth: {
            width: '67%',
        },
        assessmentTextJustify: {
            textAlign: 'justify',
        },
        correctAnswer: {
            color: colors.correctAnswer
        },
        questionNumber: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 55,
            height: 35,
            borderRadius: 50,
        },
        questionNumberText: {
            fontFamily: fonts.rMedium,
            fontSize: 14,
        },
        counterParentContainer: {
            width: '70%',
            height: 40,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            // borderWidth:1, 
            // borderColor:'#ff0000',
            marginTop: 15,
            alignSelf: 'center',
            position: 'relative',
        },
        numberParentContainer: {
            width: 40,
            height: 40,
            // backgroundColor:'#00ff00',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
        },
        pageOneLine: {
            left: 15,
            width: '40%',
            height: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'absolute',
            // backgroundColor:'#00ff00',
        },
        pageTwoLine: {
            width: '40%',
            height: 5,
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'absolute',
            // backgroundColor:'#00f',
            right: 15,
        },
        counterText: {
            fontSize: 16,
            fontFamily: fonts.rbold,
            color: '#000',
        },
        topHeadingContainer: {
            height: 60,
            marginVertical: 10,
            // borderWidth:1,
            width:'97%',
        },
        rbTopHeadingContainer: {
            height: 50,
            marginVertical: 10,
            // borderWidth:1,
            // borderColor:'#ff0000',
            justifyContent: 'center',
            alignItems: 'center'
        },

        assessmentDropdownBtnStyle: {
            width: '100%',
            height: 50,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            marginBottom: 12,
        },
        assessmentDropdownBtnTxtBlankStyle: {
            color: '#245C75',
            textAlign: 'left',
            fontSize: width < 500 ? 14 : height * 0.020,
            left: 5
        },

        assessmentDropdownBtnStyleDisable: {
            width: '100%',
            height: 50,
            backgroundColor: "#BFBFBF",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#BFBFBF",
            marginBottom: 12,
        },
        assessmentDropdownBtnTxtBlankStyleDisable: {
            color: '#979797',
            textAlign: 'left',
            fontSize: width < 500 ? 14 : height * 0.020,
            left: 5
        },

        filterSubmitContainer: {
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            marginVertical: 15,
        },
        btnContainer: {
            alignSelf: 'center',
            width: 100,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        resetBackground: {
            backgroundColor: '#00B0F0',
        },
        submitBackground: {
            backgroundColor: '#008000',
        },
        btnText: {
            color: '#fff',
            fontSize: 14,
        },
        askmeContainer: {
            // height: 100,
            width: 70,
            position: 'absolute',
            bottom: 5,
            right: 5,
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: '#ff0000'
        },
        askmeImage: {
            // flex:1,
            height: 100,
            width: 70,
            resizeMode: 'contain'
        },
        askmeTextContainer: {
            width: '80%',
            height: 20,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#005274',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
        },
        askmeText: {
            color: '#005274',
            fontSize: 10,
            fontFamily: fonts.rLight,
        },
        noDataContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        currentQuestionTopContainer: {
            alignSelf: 'center',
            width: '97%',
            height: 30,

            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#00000040'
        },
        timeTextBlack: {
            color: "#000",
        },
        answerSubmitTopContainer: {
            width: 80,
            backgroundColor: '#fff',
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
        },
        answerSubmitTopInsideContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
        },
        examSubmitTopText: {
            fontSize: 12,
            fontFamily: rBold,
            color: '#245C75',
        },
        answerTopContainer: {
            // height: 20,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 5,
            marginBottom: 5,
            borderBottomWidth: 1,
            paddingBottom: 3,
            borderColor: '#00000020'
        },
        showQuestionSmallContainer: {
            flex: .4,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'relative',
        },
        showAnswerBigContainer: {
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'#ff0000'
            // marginHorizontal: 10,
        },
        examScrollViewContainer: {
            height: '100%'
        },
        privacyPolicyContainer: {
            flex: 1,
            // justifyContent: 'flex-end',
            alignItems: 'center',
            paddingVertical: 10,
            alignSelf:'center'
        },
        privacyPolicytext: {
            fontSize: 12,
            fontFamily: rBold,
            color: colors.linkBlue,
        },
        watermarkImage: {
            tintColor: '#00000020',
        },
        watermarkImageContainer: {
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
        },
        academicYearContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 5,
        },
        academicYearText: {
            fontSize: 12,
            fontFamily: rBold,
            color: colors.textBlue2,
        },
        academicYearTextWhite: {
            fontSize: 12,
            fontFamily: rBold,
            color: colors.textWhite,
        },
        courseValidityContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        courseValidityText: {
            fontSize: 12,
            // fontFamily: rBold,
            color: colors.textBlue2,
        },
        courseValidityTextWhite: {
            fontSize: 12,
            // fontFamily: rBold,
            color: colors.textWhite,
        },
        courseValidityText2: {
            fontSize: 12,
            fontFamily: rBold,
            color: '#d7a300',
            textAlign: 'center',
        },
        noSubText: {
            fontSize: 14,
            // fontFamily: rBold,
            color: colors.textBlue2,
            textAlign: 'center',
            paddingHorizontal: 10,
        },
        toolTipText: {
            fontSize: 12,
            // fontFamily: rBold,
            color: colors.textBlue2,
            textAlign: 'center',
            padding: 2,
        },
        courseInfoContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 3,
            paddingVertical: 10,
        },
        dorpdownContainer: {
            marginVertical: 10,
            width: '80%',
            alignSelf: 'center'
        },
        verifyHeading: {
            fontFamily: fonts.rMedium,
            textAlign: 'left',
            // fontSize: width < 500 ? 25 : height * 0.040,
            fontSize: 20,
            fontWeight: "500",
            color: colors.headingTextRed,
            marginBottom: 10,
        },
        courseValidityInfoContainer: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 10,
        },
        registrationContainerInside: {
            marginTop: StatusBar.currentHeight +8,
            margin: 6,
            width: '97%',
            flex: 1,
            backgroundColor: '#E7E9E4',
        },
        noDataContainer:{
            justifyContent:'center',
            alignItems:'center',
            flex:1,
        },
        marginBottom50:{
            marginBottom:50,
        }

    });

export default Gstyles;
