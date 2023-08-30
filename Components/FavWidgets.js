import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCities } from '../src/data/citydata';
import { useGlobalContext } from '../context/GlobalContext';
import { fetchFavWeather } from '../Services/api';
import { getBackgroundColor } from "../src/getBackground";

const FavWidget = ({fontColor}) => {
  const [cityData, setCityData] = useState([]);
  const { temperatureUnit } = useGlobalContext();
  const [favWeather, setFavWeather] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      const cities = await getCities();
      setCityData(cities);
    }
    fetchCities();
  }, []);

  useEffect(() => {
    fetchFavWeather(cityData, temperatureUnit)
      .then(favWeatherData => {
        setFavWeather(favWeatherData);
      })
      .catch(error => {
        console.error('Error fetching favorite weather data:', error);
      });
  }, [cityData, temperatureUnit]);

  return (
    <View>
      {favWeather.map((weather, index) => (
        <View key={index} style={[styles.container,{backgroundColor:getBackgroundColor(weather.weatherState)}]}>
          <View style={styles.leftContainer}>
            <View>
              <Text style={[styles.cityName,{color:fontColor}]}>{weather.cityname}</Text>
              <Text style={[styles.time,{color:fontColor}]}>{weather.time}</Text>
            </View>
            <Text style={[styles.weatherState,{color:fontColor}]}>{weather.weatherState}</Text>
          </View>
          <View style={styles.RightContainer}>
            <Text style={[styles.temperature,{color:fontColor}]}>{weather.temperature}°</Text>
            <Text style={[styles.temperatureRange,{color:fontColor}]}>
              H: {weather.highTemperature}° L: {weather.lowTemperature}°
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: '2%',
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    height: 110,
    paddingLeft: "4%",
    paddingRight: "4%",

  },
leftContainer: {
    width: '50%',
    height: '100%',
    justifyContent:'space-around'
},
RightContainer: {
    width: '50%',
    height: '100%',
    alignItems:'flex-end',
    justifyContent:'space-around'
},
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
  },
  weatherState: {
    fontSize: 14,
  },
  temperatureRange: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 40,
    marginTop:"-8%"
    },
});

export default FavWidget;
