import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Header from '../Components/Header/Header';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getBackgroundColor } from '../src/getBackground';
import CurrentWeather from '../Components/CurrentWeather';
import PredictionWrapperComponent from '../Components/PredictionWrapperComponent';
import AddFavComponent from '../Components/AddFavComponent';
import MainWeatherIconComponent from '../Components/MainWeatherIconComponent';
import HourlyPredictionComponent from '../Components/HourlyPredictionComponent';
import * as ScreenOrientation from 'expo-screen-orientation'; // Import the package

export default function Home() {
  const { weatherState } = useCurrTempContext();

  // Lock the screen orientation to portrait when the component mounts
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    // Unlock the orientation when the component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: getBackgroundColor(weatherState) }]}
    >
      <Header />
      <MainWeatherIconComponent />
      <CurrentWeather />
      <HourlyPredictionComponent />
      <PredictionWrapperComponent />
      <AddFavComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
