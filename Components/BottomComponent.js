import React from 'react';
import { View,StyleSheet ,Text } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';

const BottomComponent = ({ weatherPredictions, weatherval, nextday,nextdayval }) => {
  if (!weatherPredictions || weatherPredictions.length === 0) {
    return null; 
  }

  const weatherState = weatherPredictions[weatherval]?.weather[0]?.main;

  let iconComponent = null;
  if (weatherState === 'Clear') {
    iconComponent = <Ionicons name="sunny-sharp" size={50} color="#FFCC33" />;
  } else if (weatherState === 'Rain') {
    iconComponent = <Ionicons name="rainy" size={50} color="#E8E8EA" />;
  } else if (weatherState === 'Clouds') {
    iconComponent = <FontAwesome name="cloud" size={50} color="#E8E8EA" />;
  } else if (weatherState === 'Snow') {
    iconComponent = <Ionicons name="snow" size={50} color="#FFFFFF" />;
  } else if (weatherState === 'Drizzle') {
    iconComponent = <Feather name="cloud-drizzle" size={50} color="#FFFFFF" />;
  } else if (weatherState === 'Thunderstorm') {
    iconComponent = <Ionicons name="thunderstorm-sharp" size={50} color="#413554" />;
  }

  return (
    <View style={styles.bottomcol}>
      <View style={styles.bottomcol1}>{iconComponent}</View>
      <View style={styles.bottomcol2}>
        <Text style={{ fontSize: 25 }}>{nextday[nextdayval]}</Text>
      </View>
      <View style={styles.bottomcol3}>
        <Text style={{ fontSize: 24 }}>
          {Math.ceil(weatherPredictions[weatherval]?.main.temp_max)}/
          {Math.floor(weatherPredictions[weatherval]?.main.temp_min)}
        </Text>
      </View>
    </View>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({
    bottomcol:{ flex: 1, flexDirection:'row'},
    bottomcol1:{flex: .3,alignItems:'center',justifyContent:'center',marginBottom:'2.1%'},
    bottomcol2:{flex: .4,alignItems:'flex-start',justifyContent:'center'},
    bottomcol3:{flex: .3,alignItems:'center',justifyContent:'center',marginRight:'2%'},
})

