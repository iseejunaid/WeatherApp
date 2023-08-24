import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import HeaderModal from './HeaderModal';
import { removeCity } from '../../db/firebasefunctions';
import { useCurrTempContext } from '../../context/CurrTempContext';

const HeaderLocation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { currCity, countrycode,setcurrCity } = useGlobalContext();
  const { setIsLoading } = useCurrTempContext();

  const handleCitySelect = (city) => {
    setcurrCity(city);
    setModalVisible(false);
  };

  const deleteCity = async(item) => {
    setIsLoading(true);
    await removeCity(item);
    setIsLoading(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.locationContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.loctxt}>{currCity}, {countrycode}</Text>
      </TouchableOpacity>
      <HeaderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleCitySelect={handleCitySelect}
        deleteCity={deleteCity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    width: '65%',
    height: '40%',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loctxt: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default HeaderLocation;