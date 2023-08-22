import React, {useEffect } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, ScrollView,View } from 'react-native';
import Header from '../Components/Header/Header';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getBackgroundColor } from '../src/getBackground';
import CurrentWeather from '../Components/CurrentWeather';
import PredictionWrapperComponent from '../Components/PredictionWrapperComponent';
import AddFavComponent from '../Components/AddFavComponent';
import MainWeatherIconComponent from '../Components/MainWeatherIconComponent';
import HourlyPredictionComponent from '../Components/HourlyPredictionComponent';
import LandScapeHome from './LandScapeHome';
import { useGlobalContext } from '../context/GlobalContext';


export default function Home() {
  const { weatherState } = useCurrTempContext();
  const {isLandscape,setIsLandscape} = useGlobalContext();
  

  useEffect(() => {
    setIsLandscape(Dimensions.get('window').width > Dimensions.get('window').height);
    const updateLayout = () => {
      setIsLandscape(Dimensions.get('window').width > Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor(weatherState)}]}>
      {isLandscape ? (
        <View style={styles.landscapeContainer}>
          <LandScapeHome/>
        </View>
      ) : (
        <View style={styles.container}>
        <Header />
        <ScrollView style={styles.scrollStyle}>
          <MainWeatherIconComponent />
          <CurrentWeather />
          <HourlyPredictionComponent />
          <PredictionWrapperComponent />
        </ScrollView>
        <AddFavComponent />
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