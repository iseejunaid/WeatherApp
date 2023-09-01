import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../context/GlobalContext';
import { fetchCity } from '../helpers/api';
import GetLocation from '../Components/GetLocation';
import { getFontAndColor } from '../helpers/fontAndColor';
import { getBackgroundColor } from '../helpers/getBackground';
import { cities } from '../assets/CityNames';
import CitySearchList from '../Components/CitySearchList';
import { useCurrTempContext } from '../context/CurrTempContext';
import FavWidgets from '../Components/FavWidgets';
import { ScrollView } from 'react-native-gesture-handler';

const CitySearch = () => {
  const [searchText, setSearchText] = useState('');
  
  const { setcurrCity, setCountryCode, darkMode } = useGlobalContext();
  const [cityData, setCityData] = useState([]);
  const { weatherState } = useCurrTempContext();
  const navigation = useNavigation();
  const { fontColor, backColor } = getFontAndColor(darkMode);

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
        Alert.alert("City not found! ",error);
      });
  }

  return (
    <View style={[styles.container,{backgroundColor:backColor}]}>
    <View style={styles.searchBarContainer}>
    <TextInput
      style={[{ width: searchText.length > 0 ? '82%' : '100%',color:fontColor }]}
      placeholder="Search cities..."
      placeholderTextColor={fontColor}
      value={searchText}
      onChangeText={handleSearch}
      onSubmitEditing={handleSearchButtonPress}/>

      {searchText.length > 0 && (
        <TouchableOpacity style={styles.searchButton}
          onPress={handleSearchButtonPress}>
          <Text style={{ color: getBackgroundColor(weatherState) }}>Search</Text>
        </TouchableOpacity>
      )}
    </View>
    <GetLocation/>
    {searchText.length > 0 && (
      <CitySearchList backColor = {backColor} cityData = {cityData} fontColor={fontColor} CityCheck={CityCheck}/>
    )}
    <View style={{marginTop:'4%',height:"85%"}}>
    <Text style={{fontSize:25,fontWeight:'bold',color:fontColor}}>Favorites</Text>
    <ScrollView>
    <FavWidgets fontColor={fontColor} backColor={backColor}/>
    </ScrollView>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth:1,
    borderColor: 'gray',
    height: 45,
    paddingHorizontal: 7,
    // backgroundColor: 'red',
  },
  searchButton: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CitySearch;