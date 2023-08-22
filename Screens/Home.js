import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import Header from '../Components/Header/Header';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getBackgroundColor } from '../src/getBackground';
import CurrentWeather from '../Components/CurrentWeather';
import PredictionWrapperComponent from '../Components/PredictionWrapperComponent';
import AddFavComponent from '../Components/AddFavComponent';
import MainWeatherIconComponent from '../Components/MainWeatherIconComponent';
import HourlyPredictionComponent from '../Components/HourlyPredictionComponent';

export default function Home() {
  const { weatherState } = useCurrTempContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: getBackgroundColor(weatherState) }]}>
      
      <Header />

      
      <ScrollView style={styles.scrollStyle}>

      <MainWeatherIconComponent />
      <CurrentWeather />
      <HourlyPredictionComponent />
      <PredictionWrapperComponent />
      
      </ScrollView>
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
  scrollStyle: {
    width: '100%',
  }
});
