import React, { useState,useEffect} from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { getBackgroundColor } from '../src/getBackground';
import {addCity} from '../db/firebasefunctions';
import { useGlobalContext } from '../context/GlobalContext';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getFontAndColor } from "../assets/fontAndColor";
import { getCities } from '../src/data/citydata';

const AddFavComponent = () => {

  const [isfav,setIsFav] = useState(false)
  const [cityData,setCityData] = useState([]);

  const { currCity,darkMode} = useGlobalContext();
  const { weatherState,setIsLoading } = useCurrTempContext();
  const {backColor,fontColor} = getFontAndColor(darkMode);

  useEffect(() => {
    async function fetchCities() {
      const cities = await getCities();
      setCityData(cities);
    }
    fetchCities();
  }, []);

  useEffect(()=>{
    if(cityData.includes(currCity)){
      setIsFav(true)
    }
    else{
      setIsFav(false)
    }
  },[cityData])


  const addButtonHandler = async () => {
    
      setIsLoading(true);
    const isAdded = await addCity(currCity);
    setIsLoading(false);
      if (isAdded) {
          Alert.alert('Favorite added: ' + currCity);
      } else {
          Alert.alert('City already a Favorite!');
      }
  };

  return (
    <>
      {!isfav && (
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: backColor, borderColor: fontColor }]}
          onPress={addButtonHandler}
        >
          <Text style={[styles.addButtonIcon, { color: getBackgroundColor(weatherState) }]}>+</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        borderWidth: .2,
      },
      addButtonIcon: {
        fontSize: 30,
      },
});

export default AddFavComponent;
