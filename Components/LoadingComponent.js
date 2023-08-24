import React from 'react';
import {getBackgroundColor } from '../src/getBackground';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useCurrTempContext } from '../context/CurrTempContext';

const LoadingComponent = () => {
  const {weatherState} = useCurrTempContext();
  return (
    <View style={[styles.container,{ backgroundColor: getBackgroundColor(weatherState) }]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;