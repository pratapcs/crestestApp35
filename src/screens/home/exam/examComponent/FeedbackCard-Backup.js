import React, { useState, useEffect, useCallback, } from 'react';
import { colors, fonts } from '../../../../styles/Crestest.config';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { Rating } from '@kolking/react-native-rating';


const FeedbackCard = (props) => {
    const [rating, setRating] = useState(0);

    const handleChange = useCallback(
        (value) => setRating(Math.round((rating + value) * 5) / 10),
        [rating],
    );


    useEffect(() => {
        props.updatedRating(rating, props.id)
    }, [rating]);


    return (
        <View style={styles.feedbackParentContainer}>
            <View>
                <Text style={styles.feedbackDetailsText}>{props.questions}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <Rating
                    size={25}
                    rating={rating}
                    onChange={handleChange} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create(
    {
        feedbackParentContainer: {
            backgroundColor: '#fff',
            borderRadius: 5,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: '#AEB3B2',
            borderStyle: 'solid',
            paddingHorizontal: 20,
            paddingVertical: 10,
            position: 'relative',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 10,
        },
        feedbackDetailsText: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 12,
        },
        ratingContainer: {
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }


    });

export default FeedbackCard;