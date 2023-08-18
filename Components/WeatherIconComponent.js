import React from 'react';
import { View } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';

const WeatherIcon = ({ weatherstate }) => {
  return (
    <View style={styles.icon}>
      {weatherstate === 'Clear' ? (
        <Ionicons name="sunny-sharp" size={250} color="#FFCC33" />
      ) : weatherstate === 'Rain' ? (
        <Ionicons name="rainy" size={250} color="#E8E8EA" />
      ) : weatherstate === 'Clouds' ? (
        <FontAwesome name="cloud" size={250} color="#E8E8EA" />
      ) : weatherstate === 'Snow' ? (
        <Ionicons name="snow" size={250} color="#FFFFFF" />
      ) : weatherstate === 'Drizzle' ? (
        <Feather name="cloud-drizzle" size={250} color="#FFFFFF" /> 
      ) : weatherstate === 'Thunderstorm' ? (
        <Ionicons name="thunderstorm-sharp" size={250} color="#413554" />
      ) : null}
    </View>
  );
};

const styles = {
  icon: {
    flex: 0.4,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor:'yellow'
  },
};
export default WeatherIcon;
