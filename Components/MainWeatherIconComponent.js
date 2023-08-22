import React from 'react';
import { View } from 'react-native';
import WeatherIcon from './WeatherIcon';
import { useCurrTempContext } from '../context/CurrTempContext';

const MainWeatherIconComponent = () => {
  const iconSize = 180;
  const { weatherState } = useCurrTempContext();
  return (
    <View style={styles.icon}>
      <WeatherIcon weatherState={weatherState} size={iconSize} />
    </View>
  );
};

const styles = {
  icon: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default MainWeatherIconComponent;
