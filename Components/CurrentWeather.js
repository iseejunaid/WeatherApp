import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCurrTempContext } from '../context/CurrTempContext';

const CurrentWeather = () => {
  const { temperatureUnit, currTemp, weatherState, highTemperature, lowTemperature } = useCurrTempContext();

  return (
    <View style={styles.body}>
      <View style={styles.body1}>
        <Text style={{ fontSize: temperatureUnit === 'imperial' ? 74 : 75, fontWeight: 'bold' }}>{currTemp}</Text>
      </View>
      <View style={styles.body2}>
        <Text style={{ fontSize: 30 }}>{weatherState}</Text>
      </View>
      <View style={styles.body3}>
        <Text style={{ fontSize: temperatureUnit === 'imperial' ? 25 : 30 }}>{highTemperature}/{lowTemperature}</Text>
      </View>
    </View>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  body: {
    flex: 0.1,
    flexDirection: 'row',
    width: '100%',
  },
  body1: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: '2%',
    justifyContent: 'flex-end',
  },
  body2: {
    flex: 1.2,
    justifyContent: 'flex-end',
    height: '100%',
  },
  body3: {
    flex: 0.8,
    justifyContent: 'flex-end',
    height: '100%',
  },
});
