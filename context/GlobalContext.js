import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiKey } from '../ApiKeys/OpenWeatherapi';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [currCity, setcurrCity] = useState('Lahore');
  const [countrycode, setcountrycode] = useState('PK');
  const [temperatureUnit, setTemperatureUnit] = useState('metric');

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setcountrycode(data.sys.country);
      })
      .catch(error => {
        console.error('Error fetching country code:', error);
      });
  }, [currCity]);

  return (
    <GlobalContext.Provider value={{ currCity, setcurrCity, countrycode, temperatureUnit, setTemperatureUnit }}>
      {children}
    </GlobalContext.Provider>
  );
};
