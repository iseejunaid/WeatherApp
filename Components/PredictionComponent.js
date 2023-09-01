import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WeatherIcon from './WeatherIcon';
import { useCurrTempContext } from '../context/CurrTempContext';
import { useGlobalContext } from '../context/GlobalContext';
import { getFontAndColor } from '../helpers/fontAndColor';
import { getBackgroundColor } from '../helpers/getBackground';

const PredictionComponent = ({ weatherval, nextdayval }) => {
  const { darkMode } = useGlobalContext();
  const { weatherPredictions, nextDays, weatherState} = useCurrTempContext();
  const { fontColor } = getFontAndColor(darkMode);

  const iconSize = 50;
  const weatherstate = weatherPredictions[weatherval]?.weather[0]?.main;
  const iconComponent = <WeatherIcon weatherState={weatherstate} size={iconSize} />;

  if (!weatherPredictions || weatherPredictions.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container,{backgroundColor:getBackgroundColor(weatherState)}]}>
      <View style={styles.iconContainer}>{iconComponent}</View>
      <View style={styles.dayContainer}>
        <Text style={{ fontSize: 22, color: fontColor }}>{nextDays[nextdayval]}</Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={{ fontSize: 24, color: fontColor }}>
          {Math.ceil(weatherPredictions[weatherval]?.main.temp_max)}/
          {Math.floor(weatherPredictions[weatherval]?.main.temp_min)}
        </Text>
      </View>
    </View>
  );
};

export default PredictionComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth:1,
    width: '95%',
    marginBottom:'2%'
  },
  iconContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayContainer: {
    flex: 0.4,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tempContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2%',
  },
});