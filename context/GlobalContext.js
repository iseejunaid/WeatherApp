
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCountryCode } from '../Services/api';


const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoading,setIsLoading] = useState(true);
  const [currCity, setcurrCity] = useState('Lahore');
  const [countrycode, setCountryCode] = useState('PK');
  const [temperatureUnit, setTemperatureUnit] = useState('metric');

  useEffect(() => {
    setIsLoading(true);
    fetchCountryCode(currCity)
      .then(code => {
        if (code) {
          setCountryCode(code);
        }
      });
    setIsLoading(false);
  }, [currCity]);

  return (
    <GlobalContext.Provider value={{ currCity, setcurrCity, countrycode, temperatureUnit, setTemperatureUnit,isLoading,setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};
