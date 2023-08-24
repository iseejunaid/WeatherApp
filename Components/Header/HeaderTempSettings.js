import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalContext';


const HeaderTempSettings = () => {
  const { temperatureUnit, setTemperatureUnit} = useGlobalContext();

  const toggleTemperatureUnit = () => {
    if (temperatureUnit === 'metric') {
      setTemperatureUnit('imperial');
    } else {
      setTemperatureUnit('metric');
    }
  };

  return (
    <TouchableOpacity style={styles.header3} onPress={toggleTemperatureUnit}>
      {temperatureUnit === 'metric' ? (
        <MaterialCommunityIcons name="temperature-celsius" size={40} color="black" />
      ) : (
        <MaterialCommunityIcons name="temperature-fahrenheit" size={40} color="black" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header3: {
    width: '20%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
});

export default HeaderTempSettings;
