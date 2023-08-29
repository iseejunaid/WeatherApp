import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadDarkModePreference } from '../src/darkMode';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [currCity, setcurrCity] = useState('Lahore');
  const [countrycode, setCountryCode] = useState('PK');
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [darkMode, setDarkMode] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [isCurrLocation, setIsCurrLocation] = useState(false);

  useEffect(() => {
    loadDarkModePreference(setDarkMode);
  }, []);

  return (
    <GlobalContext.Provider value={{ currCity, setcurrCity, countrycode, setCountryCode, temperatureUnit, setTemperatureUnit,darkMode,setDarkMode,lat,setLat,lon,setLon,isCurrLocation, setIsCurrLocation}}>
      {children}
    </GlobalContext.Provider>
  );
};
