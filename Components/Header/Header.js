import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderSearch from './HeaderSearch';
import HeaderTempSettings from './HeaderTempSettings';
import HeaderLocation from './HeaderLocation';

const Header = () => {
  return (
    <View style={styles.header}>
      <HeaderLocation/>
      <HeaderSearch />
      <HeaderTempSettings />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.15,
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

export default Header;
