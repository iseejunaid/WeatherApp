import React, { useState,useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import BottomComponent from '../Components/BottomComponent'
import Header from '../Components/Header/Header';
import { apiKey } from '../ApiKeys/OpenWeatherapi'; 
import { useGlobalContext } from '../context/GlobalContext';
import citydata from '../src/data/citydata';
import WeatherIconComponent from '../Components/WeatherIconComponent';
import {getBackgroundColor } from '../src/getBackground';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const {currCity, temperatureUnit } = useGlobalContext();
  const [currtemp, setcurrTemp] = useState('0');
  const [highTemperature, setHighTemperature] = useState('0');
  const [lowTemperature, setLowTemperature] = useState('0');
  const [weatherstate, setweatherState] = useState('Sunny');
  const [weatherPredictions, setWeatherPredictions] = useState([]);
  const [nextday, setnextdays]= useState([]);

  const addButtonHandler = () => {
    const isCityAlreadyAdded = citydata.some((city) => city.label === currCity);
    if (!isCityAlreadyAdded) {
      setCityData([...citydata, { label: currCity }]);
      Alert.alert('Favorite added: ' + currCity);
    } else {
      Alert.alert('City already Favorite!');
    }
  };

  useEffect(() => {
    fetchWeather(currCity);
    console.log("Current City: "+currCity);
    console.log("Current Temperature Unit: "+temperatureUnit);
  }, [currCity, temperatureUnit]);

  function fetchWeather(cityName) {
    encodedcityname = encodeURIComponent(cityName);
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedcityname}&units=${temperatureUnit}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            setcurrTemp(Math.ceil(data.list[0].main.temp));
            setHighTemperature(Math.ceil(data.list[0].main.temp_max));
            setLowTemperature(Math.floor(data.list[0].main.temp_min));
            setweatherState(data.list[0].weather[0].main);

            const weatherPredictions = data.list.slice(1, 6);
            setWeatherPredictions(weatherPredictions);

            const currentDate = new Date();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const nextDaysName = weatherPredictions.map((_, i) => {
                const nextDays = new Date(currentDate);
                nextDays.setDate(currentDate.getDate() + i + 1);
                return daysOfWeek[nextDays.getDay()];
            });
            setnextdays(nextDaysName);

            setIsLoading(false);
        })
        .catch(error => {
            console.log('Error!', error);
            setIsLoading(false);
        });
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: getBackgroundColor(weatherstate) }]}>

      <Header/>

      <WeatherIconComponent weatherstate={weatherstate}/>


      <View style={styles.body}>
      <View style={styles.body1}>
      <Text style={{ fontSize: temperatureUnit === 'imperial' ? 74 : 75, fontWeight: 'bold' }}>{currtemp}</Text>
      </View>
      <View style={styles.body2}>
        <Text style={{fontSize:30}}>{weatherstate}</Text>
      </View>
      <View style={styles.body3}>
        <Text style={{fontSize: temperatureUnit === 'imperial' ? 25 : 30}}>{highTemperature}/{lowTemperature}</Text>
      </View>
      </View>


      <View style={styles.bottom}>
      <ScrollView>
        {[0, 1, 2, 3, 4].map((index) => (
          <BottomComponent
            key={index}
            weatherPredictions={weatherPredictions}
            weatherval={index}
            nextday={nextday}
            nextdayval={index}
          />
        ))} 
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={addButtonHandler}>
          <Text style={[styles.addButtonIcon,{color:getBackgroundColor()}]}>+</Text>
        </TouchableOpacity>

      </View>


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
  body: {
    flex: 0.15,
    flexDirection:'row',
    width: '100%',
  },
  body1:{ 
    flex: 1,
    alignItems:'flex-end',
    marginRight:'2%',
    justifyContent:'flex-end'
  },
  body2:{ flex: 1.2, justifyContent:'flex-end',height:'89%' },
  body3:{ flex: 0.8,justifyContent:'flex-end',height:'89%' },

  bottom: {
    flex: 0.3,
    flexDirection: 'column',
    width: '100%',
    marginBottom:'4%',
    // backgroundColor:"red"
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    fontSize: 30,
    color: 'white',
  },
});