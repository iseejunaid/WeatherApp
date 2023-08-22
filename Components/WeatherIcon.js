import React from 'react';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons'; // Import your icon libraries

const WeatherIcons = ({ weatherState, size }) => {
  let iconComponent = null;

  if (weatherState === 'Clear') {
    iconComponent = <Ionicons name="sunny-sharp" size={size} color="#FFCC33" />;
  } else if (weatherState === 'Rain') {
    iconComponent = <Ionicons name="rainy" size={size} color="#E8E8EA" />;
  } else if (weatherState === 'Clouds') {
    iconComponent = <FontAwesome name="cloud" size={size} color="#E8E8EA" />;
  } else if (weatherState === 'Snow') {
    iconComponent = <Ionicons name="snow" size={size} color="#FFFFFF" />;
  } else if (weatherState === 'Drizzle') {
    iconComponent = <Feather name="cloud-drizzle" size={size} color="#FFFFFF" />;
  } else if (weatherState === 'Thunderstorm') {
    iconComponent = <Ionicons name="thunderstorm-sharp" size={size} color="#413554" />;
  }

  return iconComponent;
};

export default WeatherIcons;
