import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderSearch from './HeaderSearch';
import HeaderSettings from './HeaderSettings';
import HeaderLocation from './HeaderLocation';

const Header = () => {
  return (
    <View style={styles.header}>
      <HeaderLocation/>
      <HeaderSearch />
      <HeaderSettings />
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
