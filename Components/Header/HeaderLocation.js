import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import HeaderModal from './HeaderModal';
import { Ionicons } from '@expo/vector-icons';
import { removeCity } from '../../db/firebasefunctions';
import { useCurrTempContext } from '../../context/CurrTempContext';
import { getFontAndColor } from '../../assets/fontAndColor';

const HeaderLocation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { currCity, countrycode,setcurrCity,darkMode,isCurrLocation } = useGlobalContext();
  const { setIsLoading } = useCurrTempContext();
  const { fontColor } = getFontAndColor(darkMode);




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
  useEffect(() => {
    console.log(isCurrLocation)
  }, [isCurrLocation])

  return (
    <View style={styles.locationContainer}>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setModalVisible(true)}>
        <Text style={[styles.loctxt,{color:fontColor}]}>{currCity}, {countrycode}</Text>
        {isCurrLocation && (
            <Ionicons name="md-location-outline" size={25} color="black" />
          )}
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
    width: '60%',
    height: '40%',
    // backgroundColor: 'white',
    justifyContent: 'center',
  },
  loctxt: {
    fontSize: 20,
    fontWeight: 'bold',
    // backgroundColor:'red',
    marginLeft:'9%'
  },
});

export default HeaderLocation;