import React, { useState, useEffect, useCallback, } from 'react';
import { colors, fonts } from '../../../../styles/Crestest.config';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

const FeedbackCard = (props) => {
    const [selectedRating, setSelectedRating] = useState();

    useEffect(() => {
        // console.log("$$$---", selectedRating, props.id)
        props.updatedRating(selectedRating, props.id)
    }, [selectedRating]);

    const handleRatingPress = (newRating) => {
        setSelectedRating(newRating);
    };

    const emojiSet = [
        "😠", // Angry
        "😕", // Neutral
        "😐", // Neutral
        "🙂", // Satisfied
        "😃", // Happy
    ];


    return (
        <View style={styles.feedbackParentContainer}>
            <View>
                <Text style={styles.feedbackDetailsText}>{props.questions}</Text>
            </View>
            
            <View style={styles.container}>
                {emojiSet.map((emoji, index) => (
                    <TouchableOpacity
                        key={index}
                        size={55}
                        onPress={() => handleRatingPress(index + 1)}
                        style={[
                            styles.emoji,
                            selectedRating === index + 1 && styles.selectedEmoji,
                        ]}
                    >
                        <Text>{emoji}</Text>
                    </TouchableOpacity>
                ))}
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
            paddingHorizontal: 10,
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
        },

        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
        },
        emoji: {
            marginHorizontal: 10,
            transform: [{ scale: 1.6 }],
        },
        selectedEmoji: {
            marginHorizontal: 10,
            transform: [{ scale: 2.5 }],
        },

    });

export default FeedbackCard;