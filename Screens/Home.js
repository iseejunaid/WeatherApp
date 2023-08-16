import React, { useState,useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import BottomComponent from '../Components/BottomComponent'
import { useNavigation } from '@react-navigation/native';
import { apiKey } from '../ApiKeys/OpenWeatherapi';
import { Feather,Ionicons,FontAwesome } from '@expo/vector-icons'; 


export default function Home() {
  const citydata = [
    { label: 'California', value: 'CA', latitude: 36.7783, longitude: -119.4179 },
    { label: 'Texas', value: 'TX', latitude: 31.9686, longitude: -99.9018 },
    { label: 'New York', value: 'NY', latitude: 40.7128, longitude: -74.0060 },
    { label: 'Florida', value: 'FL', latitude: 27.994402, longitude: -81.760254 },
    { label: 'Illinois', value: 'IL', latitude: 40.6331, longitude: -89.3985 },
    { label: 'Pennsylvania', value: 'PA', latitude: 41.2033, longitude: -77.1945 },
    { label: 'Ohio', value: 'OH', latitude: 40.4173, longitude: -82.9071 },
    { label: 'Georgia', value: 'GA', latitude: 32.1656, longitude: -82.9001 },
    { label: 'Lahore', value: 'LHR', latitude: 31.5497, longitude: 74.3436 },
    { label: 'Islamabad', value: 'ISB', latitude: 33.6844, longitude: 73.0479 },
  ];  

  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState('NY');
  const [long,setLong] = useState('-74.0060');
  const [lat,setLat] = useState('40.7128');
  const [isFocus, setIsFocus] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');

  const [currtemp, setcurrTemp] = useState('0');
  const [highTemperature, setHighTemperature] = useState('0');
  const [lowTemperature, setLowTemperature] = useState('0');
  const [weatherstate, setweatherState] = useState('Sunny');
  const [weatherPredictions, setWeatherPredictions] = useState([]);
  const [nextday, setnextdays]= useState([]);

  const navigation = useNavigation();

  const goToCitySearch = () => {
    navigation.navigate('CitySearch');
  };

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${temperatureUnit}&appid=${apiKey}`;

  
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
    console.log(temperatureUnit); 
  }, [temperatureUnit]);

  useEffect(() => {
    const selectedLocation = citydata.find(item => item.value === value);
    if (selectedLocation) {
      console.log('Selected Location:', selectedLocation.label);
      setLat(selectedLocation.latitude);
      setLong(selectedLocation.longitude);
    }
  }, [value]);

  useEffect(()=>{
    console.log(lat+", "+long);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setcurrTemp(Math.ceil(data.list[0].main.temp));
        setHighTemperature(Math.ceil(data.list[0].main.temp_max));
        setLowTemperature(Math.floor(data.list[0].main.temp_min));
        setweatherState(data.list[0].weather[0].main);    

        setWeatherPredictions(data.list.slice(1, 6))

        const currentDate = new Date();
        const nextdays = new Date(currentDate);
        const nextDaysName =[]
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        for(var i=0;i<weatherPredictions.length;i++){
          nextdays.setDate(currentDate.getDate() + i+1);
          const nextDaysOfWeek = nextdays.getDay();
          nextDaysName.push(daysOfWeek[nextDaysOfWeek]);
        }
        setnextdays(nextDaysName);
        setIsLoading(false);
       })
      .catch(error => {
        console.log('Error!', error);
        setIsLoading(false);
      });
    
  },[lat,long,temperatureUnit])

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
    <View style={[styles.container,{backgroundColor:getBackgroundColor()}]}>
      <View style={styles.header}>
      <View style={styles.header1}>
      <View>

      <Dropdown
        style={[isFocus && { borderColor: 'blue'}]}
        selectedTextStyle={styles.loctxt}
        data={citydata}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

          </View>
      </View>

      <TouchableOpacity style={styles.header2} onPress={goToCitySearch}>
        <FontAwesome style={styles.header2icon} name="search" size={35} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.header3} onPress={showTemperatureOptions}>
        <Ionicons name="ios-settings-outline" size={35} color="black" />
      </TouchableOpacity>
      </View>
      
      <View style={styles.degreeView}>
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
      <Text style={{ fontSize: 75,fontWeight:'bold'}}>{currtemp}</Text>
      </View>
      <View style={styles.body2}>
        <Text style={{fontSize:30}}>{weatherstate}</Text>
      </View>
      <View style={styles.body3}>
        <Text style={{fontSize:30}}>{highTemperature}/{lowTemperature}</Text>
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

      </View>


    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.15,
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    // backgroundColor:'grey'
  },
  header1:{
    width:'65%',
    height:'40%',
    // backgroundColor:'blue'
  },
  header2:{
    height:'40%',
    width:'15%',
    // backgroundColor:'yellow'
  },
  header2icon:{marginLeft:'40%'},
  header3:{
  width:'20%',
  height:'40%',
  alignItems:'center',
  justifyContent:'center',
  marginBottom:'1.5%',
  // backgroundColor:'red'
  },
  loctxt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%'
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
});