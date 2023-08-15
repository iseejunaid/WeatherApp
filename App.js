import React, { useState,useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


export default function App() {
  const citydata = [
    { label: 'California', value: 'CA', latitude: 36.7783, longitude: -119.4179 },
    { label: 'Texas', value: 'TX', latitude: 31.9686, longitude: -99.9018 },
    { label: 'New York', value: 'NY', latitude: 40.7128, longitude: -74.0060 },
    { label: 'Florida', value: 'FL', latitude: 27.994402, longitude: -81.760254 },
    { label: 'Illinois', value: 'IL', latitude: 40.6331, longitude: -89.3985 },
    { label: 'Pennsylvania', value: 'PA', latitude: 41.2033, longitude: -77.1945 },
    { label: 'Ohio', value: 'OH', latitude: 40.4173, longitude: -82.9071 },
    { label: 'Georgia', value: 'GA', latitude: 32.1656, longitude: -82.9001 },
  ];

  const [value, setValue] = useState('NY');
  const [long,setLong] = useState('-74.0060');
  const [lat,setLat] = useState('40.7128');
  const [isFocus, setIsFocus] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const apiKey = '322d5e6f8be8ff587e21d0cac53d4f0c';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

  
  const showTemperatureOptions = () => {
    Alert.alert(
      'Select Temperature Unit',
      '',
      [
        {
          text: 'Celsius',
          onPress: () => {
            setTemperatureUnit('celsius');
          }
        },
        {
          text: 'Fahrenheit',
          onPress: () => {
            setTemperatureUnit('fahrenheit');
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
        console.log('API Response Data:', data);
      })
      .catch(error => {
        console.log('Error!', error);
      });
  },[lat,long])

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.header2} onPress={showTemperatureOptions}>
        <Ionicons name="ios-settings-outline" size={35} color="black" />
      </TouchableOpacity>
      </View>


      <View style={styles.icon}>
      <Ionicons name="sunny-sharp" size={250} color="#FFCC33" />
      </View>



      <View style={styles.body}>
      <View style={styles.body1}>
      <Text style={{ fontSize: 75,fontWeight:'bold'}}>22</Text>
      </View>
      <View style={styles.body2}>
        <Text style={{fontSize:30}}>SUNNY</Text>
      </View>
      <View style={styles.body3}>
        <Text style={{fontSize:30}}>22/14</Text>
      </View>
      </View>



      <View style={styles.bottom}>
        <View style={styles.bottomcol}>
          <View style={styles.bottomcol1}>
          <Feather name="sun" size={50} color="black" />
          </View>
        <View style={styles.bottomcol2}>
          <Text style={{fontSize:30}}>Today</Text>
        </View>
        <View style={styles.bottomcol3}>
          <Text style={{fontSize:24}}>22/14</Text>
        </View>
        </View>

        <View style={styles.bottomcol}>
        <View style={styles.bottomcol1}>
        <Ionicons name="cloud-outline" size={50} color="black" />
          </View>
        <View style={styles.bottomcol2}>
          <Text style={{fontSize:30}}>Monday</Text>
        </View>
        <View style={styles.bottomcol3}>
          <Text style={{fontSize:24}}>20/12</Text>
        </View>
        </View>

        <View style={styles.bottomcol}>
        <View style={styles.bottomcol1}>
        <Feather name="cloud-drizzle" size={50} color="black" />
          </View>
        <View style={styles.bottomcol2}>
          <Text style={{fontSize:30}}>Thursday</Text>
        </View>
        <View style={styles.bottomcol3}>
          <Text style={{fontSize:24}}>19/10</Text>
        </View>
        </View>

        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#49CBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.15,
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  header1:{
    width:'80%',
    height:'40%',
  },
  header2:{
  width:'20%',
  height:'40%',
  alignItems:'center',
  justifyContent:'center',
  marginBottom:'2%'
  },
  loctxt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%'
  },

  icon: {
    flex: 0.4,
    width: '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  body: {
    flex: 0.15,
    flexDirection:'row',
    width: '100%',
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
    marginBottom:'4%'
  },
  bottomcol:{ flex: 1, flexDirection:'row'},
  bottomcol1:{flex: .3,alignItems:'center',justifyContent:'center'},
  bottomcol2:{flex: .4,alignItems:'flex-start',justifyContent:'center'},
  bottomcol3:{flex: .3,alignItems:'center',justifyContent:'center',marginRight:'2%'},
   
});
