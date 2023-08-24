import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCountryCode } from '../Services/api';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [currCity, setcurrCity] = useState('Lahore');
  const [countrycode, setCountryCode] = useState('PK');
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [isLandscape, setIsLandscape] = useState();

  useEffect(() => {
    setCountryCode('..');
    fetchCountryCode(currCity)
      .then(code => {
        if (code) {
          setCountryCode(code);
        }
      });
  }, [currCity]);

  return (
    <GlobalContext.Provider value={{ currCity, setcurrCity, countrycode, temperatureUnit, setTemperatureUnit,isLandscape,setIsLandscape }}>
      {children}
    </GlobalContext.Provider>
  );
};
