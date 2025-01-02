import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import Gstyles from '../../styles/GlobalStyle';
import HeaderComponent from '../../components/HeaderComponent';
import FaqComponent from '../../components/FaqComponent';
import NoDataComponent from '../../components/NoDataComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getEventHistoryData, getEventHistoryRequestAction, likeEventHistoryData } from '../../store/actions/DashboardAction';





// import { TouchableOpacity } from 'react-native-gesture-handler';
const faqList = [
    {
        question: 'When will CRESTEST Learning be inaugurated?',
        answer: 'CRESTEST Learning will launch its programs soon. Please keep your eyes on this website for more updates.'
    },
    {
        question: 'Which classes/standards will CRESTEST Learning cater to?',
        answer: 'For all school students and also those who are interested to appear in competitive exams. This year, we are launching the venture with the target of preparing class IX and X students for the upcoming NTSE.'
    },
    {
        question: 'Will CRESTEST Learning provide academic guidance in all subjects?',
        answer: 'CRESTEST Learning will provide academic guidance in all the major subjects such as Mathematics, Physics, Chemistry, Biology, English, History, Geography and Economics.'
    },
    {
        question: 'How is CRESTEST Learning different from other educational ventures?',
        answer: 'We are more focused in integrating conventional scholastic based learning with competitive learning.'
    },
    {
        question: 'How does one register to CRESTEST Learning programs?',
        answer: 'Once CRESTEST Learning starts functioning, registration option will be available on the website.'
    },
    {
        question: 'What are the timings for the online classes?',
        answer: 'Timings will be available for students to select as per their requirement at the time of registration.'
    },
    {
        question: 'How can the e-library be accessed?',
        answer: 'The e-library can be accessed after a student has completed the registration process and has successfully logged in with their personalized student ID.'
    },
    {
        question: 'What kind of exams will CRESTEST Learning prepare students for?',
        answer: 'CRESTEST Learning will provide academic counsel for both scholastic and competitive examinations. Scholastic exams include board\council exams. Competitive exams include NTSE, Olympiad, KVPY, etc. We will launch our service with the upcoming NTSE.'
    },
    {
        question: 'How can we contact CRESTEST Learning?',
        answer: 'Interested students and guardians can reach us at info@crestest.com'
    },

]

const Faqs = (props) => {

    const [like, setLike] = useState(true);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.id);

    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        dispatch(getEventHistoryData(props));
    }, [like]);

    const leftIconHandeler = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const onLikeHandler = (item) => {
        setLike(!like)
        dispatch(likeEventHistoryData(item.id));
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
            <HeaderComponent
                headerName='FAQs'
                leftIcon='menu-outline'
                leftIconHandeler={leftIconHandeler}
            />

            <View style={{ width: '100%', backgroundColor: '#ff0', height: 100, overflow: 'hidden' }}>
                <Image source={require('../../assets/images/banner-faq.jpg')} style={styles.imageStyle} />
            </View>

            <View style={styles.parentContainer}>

                <View style={Gstyles.historyListContainer}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {faqList != '' ?
                            faqList.map((item, index) => {
                                return (
                                    <FaqComponent
                                        key={index}
                                        userId={userId}
                                        question={item.question}
                                        answer={item.answer}
                                        listNumber={index + 1}
                                    />
                                );
                            })
                            :
                            <NoDataComponent />

                        }
                    </ScrollView>
                </View>

            </View>
        </>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            flex: 1,
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 10,
        },
        imageStyle: {
            width: '100%',
            height: 150,
            resizeMode: 'cover',
        },

    });

export default Faqs;