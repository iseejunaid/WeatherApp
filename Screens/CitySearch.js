import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const availableCities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Seattle', 'San Francisco', 'Boston'
  // Add more cities as needed
];

const CitySearch = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState(availableCities);

  const handleSearch = (text) => {
    const filtered = availableCities.filter(city =>
      city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
    setSearchText(text);
  };

  const selectCity = (city) => {
    // Handle the selected city, e.g., navigate to a details screen or perform an action
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
      <FlatList
        data={filteredCities}
        renderItem={renderCityItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.cityList}
      />
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
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
});

export default CitySearch;
