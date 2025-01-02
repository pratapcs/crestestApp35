import {
    Dimensions,
    StatusBar
} from 'react-native';

const { width, height } = Dimensions.get('window');

var ConfigObj = {}

Object.assign(ConfigObj, {
    colors:
    {
        backgroundWhite: '#ffffff',
        bodyBaseColor: '#C9E5EC',
        scholasticColor:'#94AC4B',
        competitiveColor:'#57BAD7',
        answeredBackground: '#90B817',
        visitedBackground: '#245C75',
        notVisitedBackground: '#64BFD1',
        backgroundYellow: '#E0B326',
        backgroundDeepGray: '#595959',

        competitiveCategoryBackground: '#02879B',

        correctAssessmentBackgroundColor: '#99f7a2',
        inCorrectAssessmentBackgroundColor: '#f8a0a0',
        notAttendedBackgroundColor: '#9e9e9e',

        scholasticSubscriptionBackground: '#bcedc0',
        scholasticSubscriptionBottomBackground: '#2d637b',
        scholasticSubscriptionTopBackground: '#7fbe85',
        scholasticSubscriptionAddButtonBackground: '#fff',
        competitiveSubscriptionBackground: '#57bad7',
        competitiveSubscriptionAddButtonBackground: '#2d637b',
        // #3851AB #8592CB


        //button color
        buttonYellow: '#FBBC04',
        buttonBlue: '#137999',
        baseColor: '#93C5D4',
        buttonBorderBlack: '#000000',
        buttonDisableBackground: '#B2A98D',
        buttonTextWhite: '#ffffff',
        dangerBackground:'#f75a5b',
        successBackground:'#56c760',

        // text color
        headingTextRed: '#9D0C0C',
        subheadingGreytext: '#616F72',
        textWhite: '#ffffff',
        textBlue: '#282F73',
        textBlue1: '#137999',
        textBlue2: '#245C75',
        linkBlue: '#1703F9',
        disableText: '#837474',
        hintText: '#837474',
        goodLuckColor: '#777',
        correctAnswer: '#008000',

        // border color
        inputBorder: '#BEBAB3',
        selectBorder:'#ff0000',
        selectAnsweredBorder: '#90B817',
        correctAssessmentBorder: '#99f7a2',
        inCorrectAssessmentBorder: '#f8a0a0',
        notAttendedBorder: '#9e9e9e',
        scholasticBorderColor:'#94AC4B',

        //MandatoryMark
        mandatoryMark: '#9D0C0C',

        //inputColor
        inputText: '#245c75',
        inputPlaceText: '#9E9E9E',

        headerBackground: '#137999',

        //disable Color
        disableBackground: '#9B989A',
        disableImage: '#AEA9AB',
        disableWhiteBackground : '#F1F3F2',

        //dropdown Arrow Color
        arrowWhite: '#fff',
        arrowBlue: '#245C75'

    },
    rbSheetBorderRdious: {
        topLeftRadius: 20,
        topRightRadius: 20,
    },
    texts:
    {
        eyeDisplay: 'Visible',
    },
    fonts: {
        rRegular: "Roboto-Regular",
        rBold: 'Roboto-Bold',
        rMedium: 'Roboto-Medium',
        rLight: 'Roboto-Light',
    },
    
    textSize: {
        hintText: 8,
    },
    
    iconeSize: {
        dorpdownArrowSize:22
    },

    header:
    {
        button: {
            height: 44,
            width: 44,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }
    },
    container:
    {
        // width: '100%',
        backgroundColor: '#137897',
        // backgroundColor: '#245C75',
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    containerInside: {
        // marginTop:StatusBar.currentHeight + 8,
        margin: 6,
        width: '97%',
        flex: 1,
        backgroundColor: '#E7E9E4',
        // backgroundColor: '#f00',
    },
    containerInside_two: {
        // margin: 6,
        width: '100%',
        flex: 1,
        // backgroundColor: '#E7E9E4',
        backgroundColor: '#f00',
        justifyContent: "center",
        alignItems: "center",
    },

    scrollViewContainer:
    {
        // paddingBottom: width < 500 ? 35 : 65,
        // backgroundColor: '#C9E5EC',
        // margin: width < 500 ? 6 : 15,
        // width: width < 500 ? '94%' : '96%',
    },
    /* 
                Width               FontSize
    0.0285	423.529419684492	12.07058846
    0.0331	423.529419684492	14.01882379
    0.038	423.529419684492	16.09411795
    0.0426	423.529419684492	18.04235328
    0.0474	423.529419684492	20.07529449
    0.052	423.529419684492	22.02352982
    0.0591	423.529419684492	25.0305887
    0.071	423.529419684492	30.0705888
    */
    fontSize: {
        f12: 0.0285 * width,
        f14: 0.0331 * width,
        f16: 0.038 * width,
        f18: 0.0426 * width,
        f20: 0.0474 * width,
        f22: 0.052 * width,
        f25: 0.0591 * width,
        f30: 0.071 * width,
    }

})

Object.seal(ConfigObj)

module.exports = ConfigObj