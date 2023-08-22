import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Alert } from "react-native";
import { fetchHourlyData } from "../Services/api";
import { useGlobalContext } from '../context/GlobalContext';
import WeatherIcons from "./WeatherIcon";

const HourlyPredictionComponent = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const { temperatureUnit, currCity } = useGlobalContext();

  useEffect(() => {
    fetchData();
  }, [currCity, temperatureUnit]);

  async function fetchData() {
    const data = await fetchHourlyData(currCity, temperatureUnit); 
    if (data) {
      setHourlyData(data);
    } else {
      Alert.alert("Error!");
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <WeatherIcons weatherState={item.weatherState} size={50} />
      <Text style={styles.temperatureText}>
        {Math.ceil(item.temperature)}
        {temperatureUnit === 'metric' ? '°C' : '°F'}
      </Text>
      <Text style={styles.timeText}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hourlyData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.time}_${index}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    justifyContent: "center",
    marginTop:'8%',
    alignSelf:'center',
    width:'88%'
  },
  itemContainer: {
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    marginTop: 5,
  },
  temperatureText: {
    fontSize: 16,
  },
});

export default HourlyPredictionComponent;
