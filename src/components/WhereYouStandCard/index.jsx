import React, {useRef} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../styles/Crestest.config';
function WhereYouStandCard({data = []}) {
  const scrollViewref = useRef(null);
  function backgroundColorDecider(value) {
    const theValue = parseFloat(value);
    if (theValue >= 90) {
      return colors?.competitiveColor;
    } else if (theValue >= 80 && theValue < 90) {
      return colors?.successBackground;
    } else if (theValue >= 70 && theValue < 80) {
      return colors?.buttonYellow;
    } else {
      return colors?.headingTextRed;
    }
  }
  function block(text, subject, value, key) {
    return (
      <TouchableOpacity
        onPress={() => Alert.alert('Chapter', subject ?? '')}
        key={key}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          backgroundColor: backgroundColorDecider(value),
          paddingVertical: 5,
          marginVertical: 1,
        }}>
        <Text style={{color: 'white', fontFamily: fonts.rBold, fontSize: 10}}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
  function titleBlock(text, key) {
    return (
      <View
        key={key}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          backgroundColor: 'white',
          paddingVertical: 5,
          marginVertical: 1,
        }}>
        <Text style={{color: 'grey', fontFamily: fonts.rBold}}>{text}</Text>
      </View>
    );
  }

  function dataConverter(dataToConvert) {
    if (Object.keys(dataToConvert).length !== 0) {
      return Object.keys(dataToConvert).map((item, index) => {
        return dataToConvert[item];
      });
    }
    return [];
  }

  function graphRender(data = []) {
    if (data?.length !== 0) {
      return data?.map((theData, index) => primaryColony(theData, index));
    }
  }
  function primaryColony(data, key) {
    return (
      <View style={{flexDirection: 'row', marginRight: 10}} key={key}>
        {data.map((item, index) => subColony(item, index))}
      </View>
    );
  }
  function subColony(item, index) {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          marginRight: 2,
        }}>
        {item.data.map((item, index) =>
          block('CH ' + item?.name, item?.chapter_name, item?.value, index),
        )}
        {titleBlock(item.name, 999)}
      </View>
    );
  }
  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.griponChapterTitle}>Where do you stand?</Text>
      </View>
      {data?.length !== 0 ? (
        <ScrollView
          nestedScrollEnabled={true}
          style={{maxHeight: 300, width: '100%'}}
          ref={ref => {
            scrollViewref.current = ref;
          }}
          onContentSizeChange={() =>
            scrollViewref.current.scrollToEnd({animated: true})
          }>
          <ScrollView horizontal>
            <View style={{width: '100%', flex: 1, flexDirection: 'row'}}>
              {graphRender(dataConverter(data[0]))}
            </View>
          </ScrollView>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{fontFamily: fonts.rRegular, fontSize: 15, color: 'grey'}}>
            No Data Found
          </Text>
        </View>
      )}
    </View>
  );
}
export default WhereYouStandCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // justifyContent: 'center',
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
    minHeight: 200,
    maxHeight:400
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
});
