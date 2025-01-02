import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../../styles/Crestest.config';
function TableBottomSheet({
  children,
  isVisible = false,
  onCloseRequest = () => {},
  description,
  title,
}) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onCloseRequest}>
      <View onPress={onCloseRequest} style={styles.modalContainer}>
        <Pressable onPress={onCloseRequest} style={styles.modalCloseContainer}>
          <View></View>
        </Pressable>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={onCloseRequest}
              style={styles.closeButtonTouch}>
              <Image
                source={require('../../assets/images/close_icon.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalTitle}>{title}</Text>
              <Text style={styles.modalDesc}>{description}</Text>
            </View>
            <View>{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default TableBottomSheet;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#0000002f',
    flexDirection: 'column',
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  closeButtonTouch: {
    padding: 5,
  },
  bottomSheetContainer: {
    backgroundColor: '#E7E9E4',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  secondContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
  },
  modalHeaderContainer: {
    alignItems: 'flex-start',
    marginLeft:5
  },
  modalCloseContainer: {
    flex: 1,
  },
  modalTitle: {
    color: 'grey',
    fontFamily: fonts.rRegular,
    fontSize: 20,
  },
  modalDesc: {
    color: 'grey',
    fontFamily: fonts.rRegular,
    fontSize: 10,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
});
