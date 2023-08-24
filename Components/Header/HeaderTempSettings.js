import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalContext';
import { getFontAndColor } from "../../assets/fontAndColor";


const HeaderTempSettings = () => {
  const { temperatureUnit, setTemperatureUnit,darkMode} = useGlobalContext();
  const {iconColor} = getFontAndColor(darkMode);

  const toggleTemperatureUnit = () => {
    if (temperatureUnit === 'metric') {
      setTemperatureUnit('imperial');
    } else {
      setTemperatureUnit('metric');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleTemperatureUnit}>
      {temperatureUnit === 'metric' ? (
        <MaterialCommunityIcons name="temperature-celsius" size={40} color={iconColor} />
      ) : (
        <MaterialCommunityIcons name="temperature-fahrenheit" size={40} color={iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '15%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
});

export default HeaderTempSettings;
