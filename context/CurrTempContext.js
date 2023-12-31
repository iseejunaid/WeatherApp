import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeather } from '../helpers/api';
import { useGlobalContext } from '../context/GlobalContext';

const CurrTempContext = createContext();

export const useCurrTempContext = () => useContext(CurrTempContext);

export const CurrTempProvider = ({ children }) => {
  const { currCity, temperatureUnit,lon,lat, setIsCurrLocation,isCurrLocation, setCountryCode } = useGlobalContext();
  const [currTemp, setCurrTemp] = useState(0);
  const [highTemperature, setHighTemperature] = useState(0);
  const [lowTemperature, setLowTemperature] = useState(0);
  const [weatherState, setWeatherState] = useState('');
  const [weatherPredictions, setWeatherPredictions] = useState([]);
  const [nextDays, setNextDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState([{}]);

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
        setCountryCode(data.country);
        CheckCurrLocation(data.lat,data.lon);
        setDetails(data.details);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
        setIsLoading(false);
      });
  }, [currCity, temperatureUnit]);

  const CheckCurrLocation = (fetchedlat, fetchedlon) => {
    const tolerance = 0.1;
  
    console.log(fetchedlat, fetchedlon);
    console.log(lat, lon);
  
    if (Math.abs(fetchedlat - lat) < tolerance && Math.abs(fetchedlon - lon) < tolerance) {
      setIsCurrLocation(true);
    } else {
      setIsCurrLocation(false);
    }
    console.log(isCurrLocation);
  };
  


  return (
    <CurrTempContext.Provider value={{ 
      currCity, temperatureUnit,
      currTemp, highTemperature, lowTemperature, weatherState, weatherPredictions, nextDays,setIsLoading, isLoading, details
    }}>
      {isLoading ? <LoadingComponent /> : children}
    </CurrTempContext.Provider>
  );
};
