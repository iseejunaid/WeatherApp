import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getFontAndColor } from '../helpers/fontAndColor';
import { getBackgroundColor } from '../helpers/getBackground';

const SunPositionComponent = ({ isLandscape }) => {
  const { darkMode } = useGlobalContext();
  const { details, weatherState } = useCurrTempContext();
  const [sunAngle, setSunAngle] = useState(0);
  const [sunriseHour, sunriseMinute] = details.sunrise.split(':');
  const [sunsetHour, sunsetMinute] = details.sunset.split(':');
  const { fontColor, backColor } = getFontAndColor(darkMode);

  const sunriseTime = new Date();
  sunriseTime.setHours(parseInt(sunriseHour), parseInt(sunriseMinute));
  const sunsetTime = new Date();
  sunsetTime.setHours(parseInt(sunsetHour), parseInt(sunsetMinute));

  const calculateSunAngle = () => {
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime - sunriseTime;
    const totalDaylightMilliseconds = sunsetTime - sunriseTime;

    const normalizedAngle = (elapsedMilliseconds / totalDaylightMilliseconds) * 180;
    setSunAngle(normalizedAngle);
  };

  useEffect(() => {
    calculateSunAngle();
    const interval = setInterval(calculateSunAngle, 60000);
    return () => clearInterval(interval);
  }, [sunriseTime, sunsetTime]);

  const boxWidth = isLandscape ? Dimensions.get('window').width / 2 * 0.9 : Dimensions.get('window').width * 0.9;

  const sunPositionX = (sunAngle / 180) * boxWidth;

  return (
    <View style={styles.container}>
      <View style={[styles.visualizationBox, { backgroundColor: backColor, width: boxWidth }]}>
        <View style={[styles.trajectory, { backgroundColor: getBackgroundColor(weatherState) }]}>
          <View style={[styles.sun, { left: sunPositionX }]} />
        </View>
        <View style={styles.sunTimeContainer}>
          <Text style={[styles.sunTimeText, { color: fontColor }]}>Sunrise</Text>
          <Text style={[styles.sunTimeText, { color: fontColor }]}>Sunset</Text>
        </View>
        <View style={styles.sunTimeContainer}>
          <Text style={[styles.sunTimeText, { color: fontColor }]}>
            {sunriseTime.toLocaleTimeString()}
          </Text>
          <Text style={[styles.sunTimeText, { color: fontColor }]}>
            {sunsetTime.toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:'5%',
  },
  visualizationBox: {
    width: '90%',
    height: 200,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 20,
    elevation: 20,
    padding:"2%"
  },
  trajectory: {
    width: '100%',
    height: 2,
    position: 'absolute',
    // backgroundColor:'grey',
    top: '50%',
  },
  sun: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'yellow',
    position: 'absolute',
    top: -10,
  },
  sunTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    padding:"1.8%",
    margin:'3%'
  },
  sunTimeText: {
    fontSize: 15,
  },
});

export default SunPositionComponent;
