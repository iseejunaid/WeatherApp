import React, { useState,useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal,FlatList,SafeAreaView } from 'react-native';
import BottomComponent from '../Components/BottomComponent'
import Header from '../Components/Header/Header';
import { apiKey } from '../ApiKeys/OpenWeatherapi';
import { Feather,Ionicons,FontAwesome } from '@expo/vector-icons'; 
import { useGlobalContext } from '../context/GlobalContext';
import citydata, { addCity, removeCity } from '../src/data/citydata';



export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const {currCity, temperatureUnit } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [currtemp, setcurrTemp] = useState('0');
  const [highTemperature, setHighTemperature] = useState('0');
  const [lowTemperature, setLowTemperature] = useState('0');
  const [weatherstate, setweatherState] = useState('Sunny');
  const [weatherPredictions, setWeatherPredictions] = useState([]);
  const [nextday, setnextdays]= useState([]);

  const addButtonHandler = () => {
    const isCityAlreadyAdded = citydata.some((city) => city.label === currCity);
    if (!isCityAlreadyAdded) {
      setCityData([...citydata, { label: currCity }]);
      Alert.alert('Favorite added: ' + currCity);
    } else {
      Alert.alert('City already Favorite!');
    }
  };
  
  const showTemperatureOptions = () => {
    Alert.alert(
      'Select Temperature Unit',
      '',
      [
        {
          text: 'Celsius',
          onPress: () => {
            setTemperatureUnit('metric');
          }
        },
        {
          text: 'Fahrenheit',
          onPress: () => {
            setTemperatureUnit('imperial');
          }
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchWeather(currCity);
    console.log("Current City: "+currCity);
    console.log("Current Temperature Unit: "+temperatureUnit);
  }, [currCity, temperatureUnit]);

  function fetchWeather(cityName) {
    encodedcityname = encodeURIComponent(cityName);
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedcityname}&units=${temperatureUnit}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            setcurrTemp(Math.ceil(data.list[0].main.temp));
            setHighTemperature(Math.ceil(data.list[0].main.temp_max));
            setLowTemperature(Math.floor(data.list[0].main.temp_min));
            setweatherState(data.list[0].weather[0].main);

            const weatherPredictions = data.list.slice(1, 6);
            setWeatherPredictions(weatherPredictions);

            const currentDate = new Date();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const nextDaysName = weatherPredictions.map((_, i) => {
                const nextDays = new Date(currentDate);
                nextDays.setDate(currentDate.getDate() + i + 1);
                return daysOfWeek[nextDays.getDay()];
            });
            setnextdays(nextDaysName);

            setIsLoading(false);
        })
        .catch(error => {
            console.log('Error!', error);
            setIsLoading(false);
        });
  }
  const getBackgroundColor = () => {
    if (weatherstate === 'Clear') {
      return '#48AEFF'; 
    } else if (weatherstate === 'Rain') {
      return '#3F7CD7';
    } else if (weatherstate === 'Clouds') {
      return '#37B8FC';
    } else if (weatherstate === 'Snow') {
      return '#37B8FC';
    } else if (weatherstate === 'Drizzle') {
      return '#3F7CD7';
    } else if (weatherstate === 'Thunderstorm') {
      return '#6840A3'; 
    } else {
      return 'blue';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:getBackgroundColor()}]}>
    
    <Header data={citydata}/>

      
      <View style={styles.degreeView} onStartShouldSetResponder={showTemperatureOptions}>
        <View style={styles.degreesign}></View>
        <Text style={{ fontSize: 30 }}>{temperatureUnit === 'metric' ? 'C' : 'F'}</Text>
      </View>

      <View style={styles.icon}>
        {weatherstate === 'Clear' ? (
          <Ionicons name="sunny-sharp" size={250} color="#FFCC33" />
        ) : weatherstate === 'Rain' ? (
          <Ionicons name="rainy" size={250} color="#E8E8EA" />
        ) : weatherstate === 'Clouds' ? (
          <FontAwesome name="cloud" size={250} color="#E8E8EA" />
        ) : weatherstate === 'Snow' ? (
          <Ionicons name="snow" size={250} color="#FFFFFF" />
        ) : weatherstate === 'Drizzle' ? (
          <Feather name="cloud-drizzle" size={250} color="#FFFFFF" /> 
        ) : weatherstate === 'Thunderstorm' ? (
          <Ionicons name="thunderstorm-sharp" size={250} color="#413554" />
        ) : null}
      </View>


      <View style={styles.body}>
      <View style={styles.body1}>
      <Text style={{ fontSize: temperatureUnit === 'imperial' ? 74 : 75, fontWeight: 'bold' }}>{currtemp}</Text>
      </View>
      <View style={styles.body2}>
        <Text style={{fontSize:30}}>{weatherstate}</Text>
      </View>
      <View style={styles.body3}>
        <Text style={{fontSize: temperatureUnit === 'imperial' ? 25 : 30}}>{highTemperature}/{lowTemperature}</Text>
      </View>
      </View>


      <View style={styles.bottom}>
      <ScrollView>
        {[0, 1, 2, 3, 4].map((index) => (
          <BottomComponent
            key={index}
            weatherPredictions={weatherPredictions}
            weatherval={index}
            nextday={nextday}
            nextdayval={index}
          />
        ))} 
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={addButtonHandler}>
          <Text style={[styles.addButtonIcon,{color:getBackgroundColor()}]}>+</Text>
        </TouchableOpacity>

      </View>


    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  degreeView:{ flexDirection: 'row', alignItems: 'flex-start',left:160},
  degreesign:{
    width: 10,
    overflow: 'hidden',
    height: 10,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 2,
    transform: [{ rotate: '45deg' }],
  },

  icon: {
    flex: 0.4,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor:'yellow'
  },
  body: {
    flex: 0.15,
    flexDirection:'row',
    width: '100%',
    // backgroundColor:'green'
  },
  body1:{ 
    flex: 1,
    alignItems:'flex-end',
    marginRight:'2%',
    justifyContent:'flex-end'
  },
  body2:{ flex: 1.2, justifyContent:'flex-end',height:'89%' },
  body3:{ flex: 0.8,justifyContent:'flex-end',height:'89%' },

  bottom: {
    flex: 0.3,
    flexDirection: 'column',
    width: '100%',
    marginBottom:'4%',
    // backgroundColor:"red"
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    fontSize: 30,
    color: 'white',
  },
});