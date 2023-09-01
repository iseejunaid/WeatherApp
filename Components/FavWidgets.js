import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback} from 'react-native';
import { getCities } from '../src/data/citydata';
import { useGlobalContext } from '../context/GlobalContext';
import { fetchFavWeather } from '../helpers/api';
import { getBackgroundColor } from "../helpers/getBackground";
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { removeCity } from '../helpers/firebasefunctions';
import { useNavigation } from '@react-navigation/native';
import { useCurrTempContext } from '../context/CurrTempContext';


const FavWidget = ({fontColor}) => {
  const [cityData, setCityData] = useState([]);
  const { temperatureUnit,setcurrCity,currCity } = useGlobalContext();
  const [favWeather, setFavWeather] = useState([]);
  const navigation = useNavigation();
  const {setIsLoading} = useCurrTempContext();

  useEffect(() => {
    async function fetchCities() {
      const cities = await getCities();
      setCityData(cities);
    }
    fetchCities();
  }, []);
  
  useEffect(() => {
    setIsLoading(true);
    fetchFavWeather(cityData, temperatureUnit)
      .then(favWeatherData => {
        setFavWeather(favWeatherData);
      })
      .catch(error => {
        console.error('Error fetching favorite weather data:', error);
      });
      setIsLoading(false);
  }, [cityData, temperatureUnit]);

  handleDelete = async (index) => {
    setIsLoading(true);
    await removeCity(favWeather[index].cityname);
    const updatedFavWeather = [...favWeather];
    updatedFavWeather.splice(index, 1);
    setFavWeather(updatedFavWeather);
    setIsLoading(false);
  };
  

  handleCitySelect = (cityname) => {
    if (cityname !== currCity) {
      setcurrCity(cityname);
    } else {
      navigation.navigate('Home');
    }
  };
  

  const renderRightActions = (progress, dragX, index) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });

    return (
      <RectButton style={styles.deleteButton} onPress={() => handleDelete(index)}>
        <Animated.Text style={[styles.deleteText, { opacity: trans }]}>Delete</Animated.Text>
      </RectButton>
    );
  };

  return (
    <View>
      {favWeather.map((weather, index) => (
        <Animated.View
          key={index}
          style={[styles.container, { backgroundColor: getBackgroundColor(weather.weatherState) }]}
        >
          <Swipeable
            renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)}
          >
          <TouchableWithoutFeedback
            onPress={() => handleCitySelect(weather.cityname)}>

        <View key={index} style={[styles.container,{backgroundColor:getBackgroundColor(weather.weatherState)}]}>
          <View style={styles.leftContainer}>
            <View>
              <Text style={[styles.cityName,{color:fontColor}]}>{weather.cityname}</Text>
              <Text style={[styles.time,{color:fontColor}]}>{weather.time}</Text>
            </View>
            <Text style={[styles.weatherState,{color:fontColor}]}>{weather.weatherState}</Text>
          </View>
          <View style={styles.RightContainer}>
            <Text style={[styles.temperature,{color:fontColor}]}>{weather.temperature}°</Text>
            <Text style={[styles.temperatureRange,{color:fontColor}]}>
              H: {weather.highTemperature}° L: {weather.lowTemperature}°
            </Text>
          </View>
        </View>
        </TouchableWithoutFeedback>
        </Swipeable>
        </Animated.View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: '2%',
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    height: 110,
    paddingLeft: "4%",
    elevation: 5,
    marginBottom:'2%',
  },
leftContainer: {
    width: '50%',
    height: '100%',
    justifyContent:'space-around'
},
RightContainer: {
    width: '50%',
    height: '100%',
    alignItems:'flex-end',
    paddingRight:'4%',
    justifyContent:'space-around'
},
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
  },
  weatherState: {
    fontSize: 14,
  },
  temperatureRange: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 40,
    marginTop:"-8%"
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      borderRadius: 15,
    },
    deleteText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default FavWidget;
