import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCurrTempContext } from '../context/CurrTempContext';
import { useGlobalContext } from '../context/GlobalContext';

const CurrentWeather = () => {
  const { currTemp, weatherState, highTemperature, lowTemperature } = useCurrTempContext();
  const { isLandscape } = useGlobalContext();

  const temperatureTextSize = isLandscape ? 50 : 74;
  const weatherStateTextSize = isLandscape ? 24 : 30;
  const temperatureRangeTextSize = isLandscape ? 20 : 25;

  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <Text style={[styles.temperatureText, { fontSize: temperatureTextSize }]}>
          {currTemp}°C
        </Text>
      </View>
      <View style={styles.weatherStateContainer}>
        <Text style={[styles.weatherStateText, { fontSize: weatherStateTextSize }]}>
          {weatherState}
        </Text>
      </View>
      <View style={styles.temperatureRangeContainer}>
        <Text style={[styles.temperatureRangeText, { fontSize: temperatureRangeTextSize }]}>
          H: {highTemperature}   L: {lowTemperature}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.23,
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
  },
  temperatureRangeContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

export default CurrentWeather;
