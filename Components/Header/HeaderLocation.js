import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import HeaderModal from './HeaderModal';
import { Ionicons } from '@expo/vector-icons';
import { removeCity } from '../../db/firebasefunctions';
import { getCities } from '../../src/data/citydata';
import { useCurrTempContext } from '../../context/CurrTempContext';
import { getFontAndColor } from '../../assets/fontAndColor';

const HeaderLocation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { currCity, countrycode, darkMode, isCurrLocation } = useGlobalContext();
  const [cityData, setCityData] = useState([]);
  const { setIsLoading } = useCurrTempContext();
  const { fontColor } = getFontAndColor(darkMode);

  useEffect(() => {
    async function fetchCities() {
      const cities = await getCities();
      setCityData(cities);
    }
    fetchCities();
  }, []);

  const deleteCity = async (item) => {
    setIsLoading(true);
    await removeCity(item);
    setIsLoading(false);
    setModalVisible(false);
  };

  useEffect(() => {
    console.log(isCurrLocation);
  }, [isCurrLocation]);

  const handleLocationTextPress = () => {
    if (cityData.length > 0) {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.locationContainer}>
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLocationTextPress}>
        <Text style={[styles.loctxt, { color: fontColor }]}>{currCity}, {countrycode}</Text>
        {isCurrLocation && (
          <Ionicons name="md-location-outline" size={25} color="black" />
        )}
      </TouchableOpacity>
      <HeaderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteCity={deleteCity}
        cityData={cityData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    width: '60%',
    height: '40%',
    justifyContent: 'center',
  },
  loctxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '9%',
  },
});

export default HeaderLocation;