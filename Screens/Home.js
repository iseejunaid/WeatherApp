import React, {useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, ScrollView,View } from 'react-native';
import Header from '../Components/Header/Header';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getBackgroundColor } from '../src/getBackground';
import CurrentWeather from '../Components/CurrentWeather';
import PredictionWrapperComponent from '../Components/PredictionWrapperComponent';
import AddFavComponent from '../Components/AddFavComponent';
import MainWeatherIconComponent from '../Components/MainWeatherIconComponent';
import HourlyPredictionComponent from '../Components/HourlyPredictionComponent';
import GetLocation from '../Components/GetLocation';
import LandScapeHome from './LandScapeHome';



export default function Home() {
  const { weatherState } = useCurrTempContext();
  const [isLandscape,setIsLandscape] = useState(false);
  

  // useEffect(() => {
  //   setIsLandscape(Dimensions.get('window').width > Dimensions.get('window').height);
  //   const updateLayout = () => {
  //     setIsLandscape(Dimensions.get('window').width > Dimensions.get('window').height);
  //   };

  //   Dimensions.addEventListener('change', updateLayout);

  //   return () => {
  //     Dimensions.removeEventListener('change', updateLayout);
  //   };
  // }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor(weatherState)}]}>
      {isLandscape ? (
        <View style={styles.landscapeContainer}>
          <LandScapeHome isLandscape={isLandscape}/>
        </View>
      ) : (
        <View style={styles.container}>
        <Header  isLandscape={isLandscape}/>
        <ScrollView style={styles.scrollStyle}>
          <MainWeatherIconComponent isLandscape={isLandscape} />
          <CurrentWeather isLandscape={isLandscape}/>
          <HourlyPredictionComponent/>
          <PredictionWrapperComponent/>
        </ScrollView>
        <AddFavComponent />
        <GetLocation />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  landscapeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollStyle: {
    flex: 1,
  },
});