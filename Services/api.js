
import { apiKey } from '../ApiKeys/OpenWeatherapi';
import { countryCodeUrl, forecastUrl } from './apiUrls';


export async function fetchCountryCode(cityName) {
  const apiUrl = `${countryCodeUrl}?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.sys.country;
  } catch (error) {
    console.error('Error fetching country code:', error);
    return null;
  }
}

export const fetchCity = async (cityName) => {
  const encodedcityname = encodeURIComponent(cityName);
  const apiUrl = `${forecastUrl}?q=${encodedcityname}&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    city = data.city.name;
    return city;
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
  
      const currTemp = Math.ceil(data.list[0].main.temp);
      const highTemperature = Math.ceil(data.list[0].main.temp_max);
      const lowTemperature = Math.floor(data.list[0].main.temp_min);
      const weatherState = data.list[0].weather[0].main;
  
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
      };
    } catch (error) {
      throw new Error('Error fetching weather data: ' + error.message);
    }
  };
  
