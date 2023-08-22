import React from 'react';
import { View } from 'react-native';
import WeatherIcon from './WeatherIcon';
import { useCurrTempContext } from '../context/CurrTempContext';
import { useGlobalContext } from '../context/GlobalContext';

const MainWeatherIconComponent = () => {
  const { weatherState } = useCurrTempContext();
  const { isLandscape } = useGlobalContext();
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
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
};

export default MainWeatherIconComponent;
