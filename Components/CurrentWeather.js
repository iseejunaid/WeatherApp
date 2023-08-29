import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCurrTempContext } from '../context/CurrTempContext';
import { useGlobalContext } from '../context/GlobalContext';
import { getFontAndColor } from '../assets/fontAndColor';


const CurrentWeather = ({ isLandscape }) => {
  const { currTemp, weatherState, highTemperature, lowTemperature } = useCurrTempContext();
  const { darkMode, temperatureUnit } = useGlobalContext();
  const { fontColor } = getFontAndColor(darkMode);

  const temperatureTextSize = isLandscape ? 50 : 74;
  const weatherStateTextSize = isLandscape ? 24 : 30;
  const temperatureRangeTextSize = isLandscape ? 20 : 25;

  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <Text style={[styles.temperatureText, { fontSize: temperatureTextSize, color: fontColor }]}>
          {currTemp}
          {temperatureUnit === 'metric' ? '°C' : '°F'}
        </Text>
      </View>
      <View style={styles.weatherStateContainer}>
        <Text style={[styles.weatherStateText, { fontSize: weatherStateTextSize, color: fontColor }]}>
          {weatherState}
        </Text>
      </View>
      <View style={styles.temperatureRangeContainer}>
        <Text style={[styles.temperatureRangeText, { fontSize: temperatureRangeTextSize, color: fontColor }]}>
          H: {highTemperature}   L: {lowTemperature}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flexDirection: 'column',
    width: '100%',
  },
  temperatureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'green',
  },
  temperatureRangeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue',
  },
});

export default CurrentWeather;
