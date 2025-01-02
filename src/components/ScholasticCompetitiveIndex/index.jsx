import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {colors, fonts} from '../../styles/Crestest.config';
import {Rect, Svg, Text as TextSVG} from 'react-native-svg';

export default function ScholasticCompetitiveIndex(props) {
  const [processedDataSets, setProcessedDataSets] = useState([]);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    index: 0,
  });
  useEffect(() => {
    if (props?.dataSets.length != 0) {
      console.log("dataSets-----", props.dataSets)
      setProcessedDataSets(
        props?.dataSets.map(item => {
          return {...item, disabled: false};
        }),
      );
    }
  }, [props?.datasets]);
  function LableSquareUi({color, title, onClick = () => {}, disabled = false}) {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <View
          style={{
            height: 10,
            width: 20,
            backgroundColor: color ?? 'red',
            marginRight: 5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {fontSize: 14, color: color ?? 'red'},
              disabled
                ? {
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  }
                : null,
            ]}>
            {title}
          </Text>
          {disabled && (
            <View
              style={[
                {
                  height: 1,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  backgroundColor: 'black',
                },
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.card}>
      <View style={[styles.cardContainer, {marginBottom: 20}]}>
        <Text style={styles.scoreSpectrumTitle}>{props?.pageHeading}</Text>
      </View>
      <ScrollView
        horizontal
        style={{width: '90%', marginBottom: 10}}
        showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          {processedDataSets.map((item, index) => {
            return (
              <LableSquareUi
                key={index}
                color={item?.backgroundColor}
                title={item.label}
                disabled={item?.disabled}
                onClick={() => {
                  setProcessedDataSets(prev =>
                    prev.map(itemToManipulate => {
                      if (item?.label == itemToManipulate?.label) {
                        return {
                          ...itemToManipulate,
                          disabled: !itemToManipulate?.disabled,
                        };
                      } else {
                        return itemToManipulate;
                      }
                    }),
                  );
                }}
              />
            );
          })}
        </View>
      </ScrollView>

      <LineChart
        verticalLabelRotation={props.label.length > 3 ? 120 : 0}
        fromZero={true}
        segments={10}
        data={{
          labels: props.label,
          datasets: [
            ...processedDataSets.map(item => {
              return {
                data: item?.disabled ? [0] : item?.data,
                color: (opacity = 1) => item?.backgroundColor,
                strokeWidth: item?.disabled ? 0 : 2, // optional
                withDots: !item?.disabled,
                label: item?.label
              };
            }),
            {
              data: [100],
              withDots: false,
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9} // from react-native
        height={300}
        // withVerticalLines={true}
        yLabelsOffset={10}
        withDots={true}
        xLabelsOffset={-10}
        yAxisInterval={1}
        onDataPointClick={data => {
          Alert.alert(
            data?.dataset?.label,
            `${props.label[data.index]} : ${data.value}`,
          );
        }}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, 0.5)`,
          decimalPlaces: 0,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          fillShadowGradientFromOpacity: 0.5,
          fillShadowGradientToOpacity: 0.2,
          useShadowColorFromDataset: true,
          propsForBackgroundLines: {
            strokeWidth: 0.5,
            strokeDasharray: [0, 0],
          },
          propsForHorizontalLabels: {
            letterSpacing: 1,
            fontSize: 10,
          },
          propsForVerticalLabels: {
            // rotate:180,
            // scaleY:-1,
            scaleX: -1,
            scaleY: -1,
            textAnchor: 'end',
          },
        }}
        bezier
        style={{
          borderRadius: 10,
          overflow: 'hidden',
          left: -20,
          paddingBottom: 30,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingTop: 10,
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
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
  },
  flexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scoreSpectrumTitle: {
    fontFamily: fonts.rRegular,
    color: colors.subheadingGreytext,
    fontSize: 16,
  },
});
