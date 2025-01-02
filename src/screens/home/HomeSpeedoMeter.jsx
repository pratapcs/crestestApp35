import React from 'react';
import {View} from 'react-native';
import { Text as SvgText, Circle, Path, Svg} from 'react-native-svg'
import Speedometer, {
  Arc,
  Needle,
  DangerPath,
  Indicator,
} from 'react-native-cool-speedometer';

export default function HomeSpeedoMeter(props) {
  return (
    <View style={{height: 110, overflow: 'hidden', marginTop:10,}}>
      <Speedometer max={100} value={props.perfomance} width={140} fontFamily="squada-one" angle={180}>
        <Arc color="#C00000" opacity={1} arcWidth={10} />
        <DangerPath
          color="#FFC000"
          angle={60}
          arcWidth={10}
          offset={-5}
          lineCap="butt"
        />
        <DangerPath
          color="#00B050"
          angle={40}
          arcWidth={10}
          offset={-5}
          lineCap="butt"
        />
        <DangerPath
          color="#00B0F0"
          angle={20}
          arcWidth={10}
          offset={-5}
          lineCap="butt"
        />
        
        <Indicator>
          {(value, textProps) => (
            <SvgText
              {...textProps}
              fontSize={20}
              fill="#137999"
              x={150 / 2}
              y={100}
              textAnchor="middle">
              {`${props.perfomance}%`}
            </SvgText>
          )}
        </Indicator>
        

        <Needle>
          {() => {
            const center = 140 / 2;
            return (
              <Svg height="50%" width="50%">
                <Path
                  x={-209}
                  y={-142}
                  d="M278.647 149.43l-8.224 55.816c1.692-1.357 9.645-4.208 17.306-.44l-9.082-55.376z"
                  stroke="#000"
                  fill="#275d79"
                  paintOrder="stroke"
                  strokeWidth={0}
                />
                <Circle cx={center} cy={center} r="8" fill="#275d79" />
              </Svg>
            );
          }}
        </Needle>
      </Speedometer>
    </View>
  );
}
