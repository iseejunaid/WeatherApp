import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderSearch from './HeaderSearch';
import HeaderTempSettings from './HeaderTempSettings';
import HeaderLocation from './HeaderLocation';
import { useGlobalContext } from '../../context/GlobalContext';

const Header = () => {
  const { isLandscape } = useGlobalContext();

  return (
    <View style={[styles.header, isLandscape && styles.landscapeHeader]}>
      <HeaderLocation />
      <HeaderSearch />
      <HeaderTempSettings />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '12%',
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  landscapeHeader: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
    marginTop:'-5%',
  },
});

export default Header;
