import React, { useState, useEffect } from 'react';
import { ActivityIndicator,View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {cities} from '../assets/CityNames';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../context/GlobalContext';
import {fetchCity } from '../Services/api';
import GetLocation from '../Components/GetLocation';
import { getFontAndColor } from '../assets/fontAndColor';
import { getBackgroundColor } from '../src/getBackground';
import { useCurrTempContext } from '../context/CurrTempContext';



const CitySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [cityData, setCityData] = useState([]);
  const { setcurrCity, setCountryCode, darkMode} = useGlobalContext();
  const {weatherState} = useCurrTempContext();
  const navigation = useNavigation();
  const { fontColor,backColor } = getFontAndColor(darkMode);

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
    if (searchText.trim() !== '') {
      const capitalizedSearchText = searchText
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  
      CityCheck(capitalizedSearchText);
    } else {
      Alert.alert("Please enter a city name!");
      setSearchText('');
    }
  };  

  const selectCity = (city) => {
    CityCheck(city);
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity style={[styles.cityItem,{borderColor:fontColor}]} onPress={() => selectCity(item)}>
      <Text style={{color:fontColor}}>{item}</Text>
    </TouchableOpacity>
  );

  async function CityCheck(cityName) {
    fetchCity(cityName)
    .then(data => {
      let fetchedcity = data.city
      let fetchedcountry = data.country
      if (fetchedcity) {
        console.log("City: " + fetchedcity);
        setcurrCity(fetchedcity);
        setCountryCode(fetchedcountry);
        navigation.navigate('Home');
      } else {
        Alert.alert("City not found!");
      }     
    })
    .catch(error => {
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
      <TouchableOpacity style={[styles.searchButton,{backgroundColor:getBackgroundColor(weatherState)}]} onPress={handleSearchButtonPress}>
        <Text>Search</Text>
      </TouchableOpacity>
      {cityData.length === 0 ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList style={{backgroundColor:backColor,borderRadius:8}}
          data={cityData}
          renderItem={renderCityItem}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.cityList}
        />
      )}
      <GetLocation />
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
  },
  searchButton: {
    // backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default CitySearch;
