import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { getBackgroundColor } from '../src/getBackground';
import { useGlobalContext } from '../context/GlobalContext';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getFontAndColor } from '../assets/fontAndColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchCityName } from '../Services/api';
import * as Location from 'expo-location';

const GetLocation = () => {
  const { darkMode,setcurrCity,setLat,setLon } = useGlobalContext();
  const { weatherState} = useCurrTempContext();
  const { backColor } = getFontAndColor(darkMode);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      fetchCityName(location.latitude, location.longitude)
        .then(cityName => {
          console.log('City Name:', cityName);
          setcurrCity(cityName);
          setLat(location.latitude);
          setLon(location.longitude);
        })
        .catch(error => {
          console.error('Error fetching city name:', error);
        });
        console.log(location.latitude, location.longitude);
    }
  }, [location]);

  const locationButtonHandler = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.addButton, { backgroundColor: backColor }]}
      onPress={locationButtonHandler}
    >
      <MaterialIcons
        name="my-location"
        size={24}
        color={getBackgroundColor(weatherState)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    fontSize: 30,
  },
});

export default GetLocation;