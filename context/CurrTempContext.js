import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeather } from '../Services/api';
import { useGlobalContext } from '../context/GlobalContext';

const CurrTempContext = createContext();

export const useCurrTempContext = () => useContext(CurrTempContext);

export const CurrTempProvider = ({ children }) => {
  const { currCity, temperatureUnit } = useGlobalContext();
  const [currTemp, setCurrTemp] = useState(0);
  const [highTemperature, setHighTemperature] = useState(0);
  const [lowTemperature, setLowTemperature] = useState(0);
  const [weatherState, setWeatherState] = useState('');
  const [weatherPredictions, setWeatherPredictions] = useState([]);
  const [nextDays, setNextDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const LoadingComponent = require('../Components/LoadingComponent').default;

  useEffect(() => {
    setIsLoading(true);
    fetchWeather(currCity, temperatureUnit)
      .then(data => {
        setCurrTemp(Math.ceil(data.currTemp));
        setHighTemperature(Math.ceil(data.highTemperature));
        setLowTemperature(Math.floor(data.lowTemperature));
        setWeatherState(data.weatherState);
        setWeatherPredictions(data.weatherPredictions);
        setNextDays(data.nextDays);

        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
        setIsLoading(false);
      });
  }, [currCity, temperatureUnit]);

  return (
    <CurrTempContext.Provider value={{ 
      currCity, temperatureUnit,
      currTemp, highTemperature, lowTemperature, weatherState, weatherPredictions, nextDays,setIsLoading, isLoading
    }}>
      {isLoading ? <LoadingComponent /> : children}
    </CurrTempContext.Provider>
  );
};
