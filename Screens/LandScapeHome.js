import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import Header from '../Components/Header/Header';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getBackgroundColor } from '../src/getBackground';
import CurrentWeather from '../Components/CurrentWeather';
import MainWeatherIconComponent from '../Components/MainWeatherIconComponent';
import HourlyPredictionComponent from '../Components/HourlyPredictionComponent';
import PredictionWrapperComponent from '../Components/PredictionWrapperComponent';
import AddFavComponent from '../Components/AddFavComponent';
import GetLocation from '../Components/GetLocation';

export default function LandScapeHome({ isLandscape }) {
  const { weatherState } = useCurrTempContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: getBackgroundColor(weatherState) }]}>
      <Header  isLandscape={isLandscape}/>
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
        <MainWeatherIconComponent isLandscape={isLandscape} />
        <CurrentWeather isLandscape={isLandscape}/>
        </View>
        <ScrollView style={styles.rightContent}>
          <HourlyPredictionComponent />
          <PredictionWrapperComponent />
        </ScrollView>
      </View>
      <GetLocation />
      <AddFavComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftContent: {
    flex: 1,
    padding: 10,  
  },
  rightContent: {
    flex: 1,
    padding: 10,
  },
});