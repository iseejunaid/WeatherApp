import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Alert } from "react-native";
import { fetchHourlyData } from "../Services/api";
import { useGlobalContext } from '../context/GlobalContext';
import { getFontAndColor } from "../assets/fontAndColor";
import WeatherIcons from "./WeatherIcon";
import { getBackgroundColor } from "../src/getBackground";
import { useCurrTempContext } from "../context/CurrTempContext";

const HourlyPredictionComponent = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const { temperatureUnit, currCity,darkMode } = useGlobalContext();
  const {weatherState} = useCurrTempContext()
  const {fontColor} = getFontAndColor(darkMode);

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
    <View style={[styles.itemContainer,{backgroundColor:getBackgroundColor(weatherState)}]}>
      <WeatherIcons weatherState={item.weatherState} size={50} />
      <Text style={[styles.temperatureText,{color:fontColor}]}>
        {Math.ceil(item.temperature)}
        {temperatureUnit === 'metric' ? '°C' : '°F'}
      </Text>
      <Text style={[styles.timeText,{color:fontColor}]}>
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
    marginTop:'5%',
    alignSelf:'center',
    width:'95%'
  },
  itemContainer: {
    backgroundColor:'blue',
    padding:8,
    elevation:10,
    marginLeft:5,
    marginRight:5,
    marginTop: 1,
    marginBottom:8,
    borderRadius:15,
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