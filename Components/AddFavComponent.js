import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { getBackgroundColor } from '../src/getBackground';
import {addCity} from '../db/firebasefunctions';
import { useGlobalContext } from '../context/GlobalContext';
import { useCurrTempContext } from '../context/CurrTempContext';


const AddFavComponent = () => {

  const { currCity} = useGlobalContext();
  const { weatherState,setIsLoading } = useCurrTempContext();
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
      <TouchableOpacity style={styles.addButton} onPress={addButtonHandler}>
          <Text style={[styles.addButtonIcon, { color: getBackgroundColor(weatherState) }]}>+</Text>
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
        backgroundColor: 'black',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
      addButtonIcon: {
        fontSize: 30,
      },
});

export default AddFavComponent;
