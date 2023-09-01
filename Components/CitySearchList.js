import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchCity } from '../helpers/api';

const CitySearchList = ({ backColor, cityData, fontColor, CityCheck }) => {
  const selectCity = (city) => {
    console.log("City: " + city);
    CityCheck(city, fetchCity);
  };

  const renderCityList = () => {
    if (cityData.length === 0) {
      return (
        <View style={[styles.cityList, { alignItems: 'center', justifyContent: 'center'}]}>
          <Text style={{ color: backColor }}>Press "Search" to search city</Text>
        </View>
      );
    }
    const renderCityItem = ({ item }) => (
      <TouchableOpacity style={[styles.cityItem, { borderColor: fontColor }]} onPress={() => selectCity(item)}>
        <Text style={{ color: fontColor }}>{item}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        style={{ backgroundColor: backColor, borderRadius: 8, marginTop: 10 }}
        data={cityData}
        renderItem={renderCityItem}
        keyExtractor={(item) => item}
        contentContainerStyle={[styles.cityList, { borderWidth:1,borderColor:fontColor }]}
      />
    );
  };

  return (
    <View style={styles.cityListContainer}>
      {renderCityList()}
    </View>
  );
};

const styles = StyleSheet.create({
  cityListContainer: {
    flexGrow: 1,
    // backgroundColor:'red'
  },
  cityList: {
    flexGrow: 1,
    borderRadius: 8,
  },
  cityItem: {
    padding: 12,
    alignSelf: 'stretch',
    borderBottomWidth:1,
  },
});

export default CitySearchList;
