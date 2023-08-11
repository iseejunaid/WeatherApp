import React, { useState,useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


export default function App() {
  const data = [
    { label: 'California', value: 'CA' },
    { label: 'Texas', value: 'TX' },
    { label: 'New York', value: 'NY' },
    { label: 'Florida', value: 'FL' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Georgia', value: 'GA' },
  ];  
  const [value, setValue] = useState('NY');
  const [isFocus, setIsFocus] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

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
    console.log(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.header1}>
      <View style={styles.dropdownContainer}>

      <Dropdown
        style={[isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.loctxt}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
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
  dropdownContainer: {
    width:'60%'
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
