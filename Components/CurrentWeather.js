import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCurrTempContext } from '../context/CurrTempContext';

const CurrentWeather = () => {
  const { currTemp, weatherState, highTemperature, lowTemperature } = useCurrTempContext();

  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>{currTemp}°C</Text>
      </View>
      <View style={styles.weatherStateContainer}>
        <Text style={styles.weatherStateText}>{weatherState}</Text>
      </View>
      <View style={styles.temperatureRangeContainer}>
        <Text style={styles.temperatureRangeText}>H: {highTemperature}   L: {lowTemperature}</Text>
      </View>
    </View>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'column',
    width: '100%',
  },
  temperatureContainer: {
    flex: 0.5,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  weatherStateContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  temperatureRangeContainer: {
    flex: 0.2,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  temperatureText: {
    fontSize: 74,
  },
  weatherStateText: {
    fontSize: 30,
  },
  temperatureRangeText: {
    fontSize: 25,
  },
});
