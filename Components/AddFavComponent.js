import React, { useState,useEffect} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {addCity,removeCity} from '../helpers/firebasefunctions';
import { useGlobalContext } from '../context/GlobalContext';
import { getFontAndColor } from "../helpers/fontAndColor";
import { getCities } from '../src/data/citydata';

const AddFavComponent = () => {

  const [isfav,setIsFav] = useState(false)
  const [cityData,setCityData] = useState([]);

  const { currCity,darkMode} = useGlobalContext();
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


  const toggleFav = async () => {
    if(isfav){
      setIsFav(false)
      await removeCity(currCity);
    }
    else{
      setIsFav(true)
      await addCity(currCity);
    }
  };

  return (
    <TouchableOpacity
          style={[styles.addButton, { backgroundColor: backColor, borderColor: fontColor }]}
          onPress={toggleFav}
        >
      {isfav ? (
          <Ionicons name="md-heart-sharp" size={35} color="red" />
      ) : (
          <Ionicons name="md-heart-outline" size={35} color="red" />
      )}
      </TouchableOpacity>
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
