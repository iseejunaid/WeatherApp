import React, { useState, useEffect } from 'react';
import { ActivityIndicator,View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {cities} from '../assets/CityNames';
import { useNavigation } from '@react-navigation/native';



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

  const selectCity = (city) => {
    navigation.navigate('Home', { city });
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity style={styles.cityItem} onPress={() => selectCity(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <TextInput
      style={styles.searchBar}
      placeholder="Search cities..."
      value={searchText}
      onChangeText={handleSearch}
    />
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
});

export default CitySearch;
