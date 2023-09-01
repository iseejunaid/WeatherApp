import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet,Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalContext';
import { getFontAndColor } from '../helpers/fontAndColor';
import { fetchCityName } from '../helpers/api';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const GetLocation = () => {
  const { darkMode,setcurrCity,setLat,setLon } = useGlobalContext();
  const { fontColor,backColor,iconColor } = getFontAndColor(darkMode);
  const navigation = useNavigation();
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
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.addButton, { backgroundColor: fontColor }]}
      onPress={locationButtonHandler}
    >
      <Text style={{ color: backColor,fontSize:15 }}>Get Location</Text>
      <View style={{width:'5%',alignItems:'center'}}>
        <FontAwesome5 name="map-pin" size={18} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    marginTop: 10,
    height: 40,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default GetLocation;