import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';
import TagButton from '../TagButton';
import {BarChart} from 'react-native-gifted-charts';
import LableUi from '../LabelUi';

function CompetitiveSubjectAnalysisCard({
  title,
  onPressDetails = () => {},
  data,
  subject,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.griponChapterTitle}>{title}</Text>
      </View>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View
          style={{
            alignItems: 'flex-start',
            marginBottom: 10,
            flexDirection: 'column',
          }}>
          {data[0]?.stacks.map((item, index) => {
            return (
              <LableUi key={index} color={item?.color} title={item?.name} />
            );
          })}
        </View>
        {data.length !== 0 && data[0]?.stacks && (
          <View
            style={{
              width: '100%',
              flex: 1,
            }}>
            <BarChart
              width={Dimensions.get('window').width * 0.5}
              noOfSections={10}
              barWidth={120}
              stackData={data}
              initialSpacing={30}
              onPress={event => {
                setSelectedEvent(event);
                setModalVisible(true);
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <TagButton
          title={'Details'}
          bgColor="green"
          onPress={() => onPressDetails(subject)}
        />
      </View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        style={{flex: 1}}>
        <View style={styles.modalContainerStyle}>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.modalClosePressableContainer}
          />
          <View style={styles.modalDataContainer}>
            <Text style={styles.modalTitleText}>{selectedEvent?.label}</Text>
            <View style={styles.modalCenterDataContainer}>
              {selectedEvent?.stacks?.map(item => (
                <View style={styles.modalListItemContainer}>
                  <View style={styles.modalListItemTitleContainer}>
                    <View
                      style={[
                        styles.modalTagColorContainer,
                        {backgroundColor: item?.color},
                      ]}
                    />
                    <Text style={styles.modalListItemTitleText}>
                      {item?.name}
                    </Text>
                  </View>
                  <View>
                    <Text>:</Text>
                  </View>
                  <View style={styles.modalListItemDescContainer}>
                    <Text style={styles.modalListItemDescText}>
                      {item?.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.modalCloseButtonContainer}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default CompetitiveSubjectAnalysisCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    marginBottom: 20,
    overflow: 'hidden',
    minHeight: 300,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  flexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  StrengthAnalysisTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  griponChapterTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
  griponChapterDesc: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 12,
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000005f',
  },
  modalClosePressableContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalDataContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalTitleText: {fontFamily: fonts.rBold, fontSize: 20},
  modalCenterDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalListItemContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',

  },
  modalListItemTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  modalTagColorContainer: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  modalListItemTitleText: {
    marginLeft: 5,
    fontFamily: fonts.rRegular,
    fontSize: 15,
  },
  modalListItemDescContainer: {flex: 1, paddingLeft: 5},
  modalListItemDescText: {fontFamily: fonts.rRegular, fontSize: 15},
  modalCloseButtonContainer: {flexDirection: 'row', justifyContent: 'flex-end'},
  closeButtonText: {
    fontFamily: fonts.rBold,
    fontSize: 15,
    color: 'grey',
  },
  modalCloseButton: {padding: 10},
});
