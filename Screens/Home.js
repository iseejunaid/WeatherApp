import React, {useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, RefreshControl } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header/Header';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getBackgroundColor } from '../helpers/getBackground';
import CurrentWeather from '../Components/CurrentWeather';
import PredictionWrapperComponent from '../Components/PredictionWrapperComponent';
import AddFavComponent from '../Components/AddFavComponent';
import MainWeatherIconComponent from '../Components/MainWeatherIconComponent';
import HourlyPredictionComponent from '../Components/HourlyPredictionComponent';
import LandScapeHome from './LandScapeHome';
import CurrentDetailsComponent from '../Components/CurrentDetailsComponent';
import SunPositionComponent from '../Components/SunPositonComponent';
import { useGlobalContext } from '../context/GlobalContext';




export default function Home() {
  const{currCity,setcurrCity} = useGlobalContext();
  const { weatherState } = useCurrTempContext();
  const [isLandscape,setIsLandscape] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  

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

  const onRefresh = () => {
    setRefreshing(true);
    setcurrCity(currCity);
    setRefreshing(false);
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor(weatherState)}]}>
      {isLandscape ? (
        <View style={styles.landscapeContainer}>
          <LandScapeHome isLandscape={isLandscape}/>
        </View>
      ) : (
        <View style={styles.container}>
        <Header  isLandscape={isLandscape}/>
        <ScrollView style={styles.scrollStyle} 
          stickyHeaderIndices={isLandscape ? [] : [1]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <MainWeatherIconComponent isLandscape={isLandscape} />
          <View style={[styles.stickyHeader,{backgroundColor:getBackgroundColor(weatherState)}]}>
          <CurrentWeather isLandscape={isLandscape} />
            </View>
          <HourlyPredictionComponent/>
          <PredictionWrapperComponent/>
          <CurrentDetailsComponent/>
          <SunPositionComponent/>
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
  stickyHeader: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 25,
    elevation: 1,
  },
});