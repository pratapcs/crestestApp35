import React from 'react';
import {Text, View, Image} from 'react-native';
import {Text as SvgText} from 'react-native-svg';
import Speedometer, {
  Arc,
  Needle,
  DangerPath,
  Indicator,
} from 'react-native-cool-speedometer';
import {Circle, Path, Svg} from 'react-native-svg';
export default function SpeedoMeter(props) {
  const logoCenter = 300 / 2;
  return (
    <View style={{height: 200, overflow: 'hidden'}}>
      <Speedometer
        max={100}
        value={props.value}
        width={300}
        fontFamily="squada-one"
        angle={180}>
        <Arc color="#C00000" opacity={1} arcWidth={30} />
        <DangerPath
          color="#FFC000"
          angle={60}
          arcWidth={30}
          offset={-15}
          lineCap="butt"
        />
        <DangerPath
          color="#00B050"
          angle={40}
          arcWidth={30}
          offset={-15}
          lineCap="butt"
        />
        <DangerPath
          color="#00B0F0"
          angle={20}
          arcWidth={30}
          offset={-15}
          lineCap="butt"
        />

        <Indicator>
          {(value, textProps) => (
            <SvgText
              {...textProps}
              fontSize={20}
              fill="#000"
              x={300 / 2}
              y={80}
              textAnchor="middle">
              {`${props.value}%`}
            </SvgText>
          )}
        </Indicator>

        <Needle>
          {() => {
            const center = 300 / 2;
            return (
              <Svg height="50%" width="50%">
                <Path
                  x={-35}
                  y={-123}
                  d="M183.748 155.818l-13.532 99.346c2.784-2.415 15.87-7.49 28.476-.783l-14.944-98.563z"
                  stroke="#000"
                  fill="#275d79"
                  paintOrder="stroke"
                  strokeWidth={0}
                />

                <Circle cx={center} cy={center} r="18" fill="#fff" />
              </Svg>
            );
          }}
        </Needle>
        <View
          style={{
            left: 0,
            right: 0,
            bottom: -69,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/images/clv.png')}
            style={{height: 35, width: 35}}
          />
        </View>
      </Speedometer>
    </View>
  );
}
