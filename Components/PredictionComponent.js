import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WeatherIcon from './WeatherIcon';
import { useCurrTempContext } from '../context/CurrTempContext';
import { useGlobalContext } from '../context/GlobalContext';
import { getFontAndColor } from '../assets/fontAndColor';

const PredictionComponent = ({ weatherval, nextdayval }) => {
  const {darkMode} = useGlobalContext();
  const { weatherPredictions, nextDays } = useCurrTempContext();
  const {fontColor} = getFontAndColor(darkMode);

  const iconSize = 50;
  const weatherState = weatherPredictions[weatherval]?.weather[0]?.main;
  const iconComponent = <WeatherIcon weatherState={weatherState} size={iconSize} />;

  if (!weatherPredictions || weatherPredictions.length === 0) {
    return null;
  }

  return (
    <View style={styles.bottomcol}>
      <View style={styles.bottomcol1}>{iconComponent}</View>
      <View style={styles.bottomcol2}>
        <Text style={{ fontSize: 25 ,color:fontColor}}>{nextDays[nextdayval]}</Text>
      </View>
      <View style={styles.bottomcol3}>
        <Text style={{ fontSize: 24, color:fontColor }}>
          {Math.ceil(weatherPredictions[weatherval]?.main.temp_max)}/
          {Math.floor(weatherPredictions[weatherval]?.main.temp_min)}
        </Text>
      </View>
    </View>
  );
};

export default PredictionComponent;

const styles = StyleSheet.create({
  bottomcol: { flex: 1, flexDirection: 'row' },
  bottomcol1: { flex: 0.3, alignItems: 'center', justifyContent: 'center', marginBottom: '2.1%' },
  bottomcol2: { flex: 0.4, alignItems: 'flex-start', justifyContent: 'center' },
  bottomcol3: { flex: 0.3, alignItems: 'center', justifyContent: 'center', marginRight: '2%' },
});
