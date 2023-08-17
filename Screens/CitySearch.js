import React, { useState, useEffect } from 'react';
import { ActivityIndicator,View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {cities} from '../assets/CityNames';
import { useNavigation } from '@react-navigation/native';
import { apiKey } from '../ApiKeys/OpenWeatherapi';



const CitySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [cityData, setCityData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setCityData(cities);
  }, []);

  const handleSearch = (text) => {
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(text.toLowerCase())
    );
    setSearchText(text);
    setCityData(filtered);
  };
  const handleSearchButtonPress = () => {
    if (searchText) {
      const capitalizedSearchText = searchText
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      fetchCity(capitalizedSearchText);
    }
  };  
  const selectCity = (city) => {
    fetchCity(city);
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity style={styles.cityItem} onPress={() => selectCity(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  function fetchCity(cityName) {
    encodedcityname = encodeURIComponent(cityName);
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedcityname}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const city = data.city.name;
          console.log("City: "+city);
          navigation.navigate('Home', { city });
        })
        .catch(error => {
            console.log('Error!', error);
            Alert.alert("City not found!");
        });
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search cities..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
        <Text>Search</Text>
      </TouchableOpacity>
      {cityData.length === 0 ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={cityData}
          renderItem={renderCityItem}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.cityList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  cityList: {
    flexGrow: 1,
  },
  cityItem: {
    padding: 12,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default CitySearch;
