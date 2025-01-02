import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EmojiRating = ({ rating, onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleRatingPress = (newRating) => {
    setSelectedRating(newRating);
    onRatingChange(newRating);
  };

  const emojiSet = [
    "😠", // Angry
    "😕", // Neutral
    "😐", // Neutral
    "🙂", // Satisfied
    "😃", // Happy
  ];

  return (
    <View style={styles.container}>
      {emojiSet.map((emoji, index) => (
        <TouchableOpacity
          key={index}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    marginHorizontal: 5,
  },
  selectedEmoji: {
    marginHorizontal: 5,
    transform: [{ scale: 1.5 }],
  },
});

export default EmojiRating;
