
import { apiKey } from '../ApiKeys/OpenWeatherapi';
import {forecastUrl,reverseGeocodingUrl } from './apiUrls';
import axios from 'axios';

export const fetchCity = async (cityName) => {
  const encodedcityname = encodeURIComponent(cityName);
  const apiUrl = `${forecastUrl}?q=${encodedcityname}&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    country = data.city.country
    city = data.city.name;
    return {city,country};
  } catch (error) {
    return null;
  }
};


export const fetchWeather = async (cityName, temperatureUnit) => {
  const encodedCityName = encodeURIComponent(cityName);
  const apiUrl = `${forecastUrl}?q=${encodedCityName}&units=${temperatureUnit}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const Sunrise = ConvertToHourseAndMinutes(data.city.sunrise);
    const Sunset = ConvertToHourseAndMinutes(data.city.sunset);

    
    const details = {
      feellike: data.list[0].main.feels_like,
      humidity: data.list[0].main.humidity,
      visibility: data.list[0].visibility,
      pressure: data.list[0].main.pressure,
      sunrise: Sunrise,
      sunset: Sunset,
    };

    const currTemp = Math.ceil(data.list[0].main.temp);
    const highTemperature = Math.ceil(data.list[0].main.temp_max);
    const lowTemperature = Math.floor(data.list[0].main.temp_min);
    const weatherState = data.list[0].weather[0].main;
    const lat = data.city.coord.lat;
    const lon = data.city.coord.lon;
    const country = data.city.country;

    const weatherPredictions = data.list.slice(1, 6);

    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nextDays = weatherPredictions.map((_, i) => {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i + 1);
      return daysOfWeek[nextDay.getDay()];
    });

    return {
      currTemp,
      highTemperature,
      lowTemperature,
      weatherState,
      weatherPredictions,
      nextDays,
      lat,
      lon,
      country,
      details
    };
  } catch (error) {
    throw new Error('Error fetching weather data: ' + error.message);
  }
};

export const fetchHourlyData = async (city,temperatureUnit) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${temperatureUnit}`;
  
    const response = await axios.get(apiUrl);
    const forecastList = response.data.list;
    const hourlyData = forecastList.slice(0, 8).map(item => {
      const dateTime = new Date(item.dt * 1000);
      const timeString = dateTime.toLocaleTimeString([], { hour: 'numeric', hour12: true });
      return {
        time: timeString,
        weatherState: item.weather[0].main,
        temperature: item.main.temp
      };
    });
    return hourlyData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCityName = async (latitude, longitude) => {
  const apiUrl = `${reverseGeocodingUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const locationName = data[0].name;
    return locationName;
  } catch (error) {
    return null;
  }
};

const ConvertToHourseAndMinutes = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}


export const fetchFavWeather = async (cityData, temperatureUnit) => {
  const cityDetailsPromises = cityData.map(async city => {
    const encodedCityName = encodeURIComponent(city);
    const apiUrl = `${forecastUrl}?q=${encodedCityName}&units=${temperatureUnit}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error('API request failed:', response.status);
        return null;
      }
      const data = await response.json();

      const localTime = convertUtcToLocalTime(data.city.timezone, data.list[0].dt);

      return {
        cityname: data.city.name,
        time: localTime,
        temperature: Math.ceil(data.list[0].main.temp),
        weatherState: data.list[0].weather[0].main,
        highTemperature: Math.ceil(data.list[0].main.temp_max),
        lowTemperature: Math.floor(data.list[0].main.temp_min),
      };
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return null;
    }
  });

  const cityDetails = await Promise.all(cityDetailsPromises);
  return cityDetails.filter(details => details !== null);
};

function convertUtcToLocalTime(utcTimestamp, timezoneOffset) {
  const utcDate = new Date(utcTimestamp * 1000);
  const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return localDate.toLocaleTimeString(undefined, options);
}
