import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { apiKey } from "../ApiKeys/OpenWeatherapi";
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

const HourlyPredictionComponent = () => {
  const [hourlyData, setHourlyData] = useState([]);
    const { temperatureUnit } = useGlobalContext();
  let city = "Lahore";

  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${temperatureUnit}`;
        
        const response = await axios.get(apiUrl);
        const forecastList = response.data.list;
        const hourlyData = forecastList.map(item => {
          return {
            time: new Date(item.dt * 1000).toLocaleTimeString(),
            object: item.weather[0].main,
            temperature: item.main.temp
          };
        });
        console.log('Hourly Data:', hourlyData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHourlyData();
  }, [city]);  


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.weatherIcon}>{item.weather[0].icon}</Text>
      <Text style={styles.timeText}>
        {new Date(item.dt * 1000).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 0.15, justifyContent: "center", width: "90%" }}>
      <FlatList
        data={hourlyData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HourlyPredictionComponent;

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherIcon: {
    fontSize: 30,
  },
  timeText: {
    marginTop: 5,
  },
});
