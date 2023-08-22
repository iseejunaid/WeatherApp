import {StyleSheet, Text, View, SafeAreaView,FlatList} from 'react-native';
import Header from '../Components/Header/Header';
import { useCurrTempContext } from '../context/CurrTempContext';
import {getBackgroundColor } from '../src/getBackground';
import CurrentWeather from '../Components/CurrentWeather';
import LoadingComponent from '../Components/LoadingComponent'
import PredictionWrapperComponent from '../Components/PredictionWrapperComponent';
import AddFavComponent from '../Components/AddFavComponent';
import MainWeatherIconComponent from '../Components/MainWeatherIconComponent';
import HourlyPredictionComponent from '../Components/HourlyPredictionComponent';



export default function Home() {

  const {weatherState, isLoading } = useCurrTempContext();
  

 

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: getBackgroundColor(weatherState) }]}>

      <Header/>

      <MainWeatherIconComponent/>


      <CurrentWeather/>

      <HourlyPredictionComponent/>

      {/* <View style={{flex:0.15,justifyContent:'center',width:'90%'}}>
      <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View> */}

      <PredictionWrapperComponent/>

      <AddFavComponent/>


    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});