import React from 'react';
import { View } from 'react-native';
import WeatherIcon from './WeatherIcon';
import { useCurrTempContext } from '../context/CurrTempContext';

const MainWeatherIconComponent = ({isLandscape}) => {
  const { weatherState } = useCurrTempContext();
  const iconSize = isLandscape ? 122 : 180;

  return (
    <View style={[styles.icon, isLandscape && styles.landscapeIcon]}>
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
  landscapeIcon: {
    flex: 0.79,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
};

export default MainWeatherIconComponent;
