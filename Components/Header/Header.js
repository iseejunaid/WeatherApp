import React from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import HeaderSearch from './HeaderSearch';
import HeaderTempSettings from './HeaderTempSettings';
import HeaderLocation from './HeaderLocation';
import { useGlobalContext } from '../../context/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { saveDarkModePreference } from '../../src/darkMode';
import { getFontAndColor } from '../../assets/fontAndColor';


const Header = ({ isLandscape }) => {
  const { setDarkMode,darkMode } = useGlobalContext();
  const {iconColor} = getFontAndColor(darkMode);

  const toggleDarkMode = () => {
      const newMode = !darkMode;
      setDarkMode(newMode);
      saveDarkModePreference(newMode);
  };


  return (
    <View style={[styles.header, isLandscape && styles.landscapeHeader]}>
    
    <TouchableOpacity style={styles.icon} onPress={toggleDarkMode}>
      <MaterialCommunityIcons name="theme-light-dark" size={35} color= {iconColor} />
      </TouchableOpacity>


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
  icon:{
    // backgroundColor:"grey",
    height:'40%',
    width:'12%',
    justifyContent:'center',
    alignItems:'center',
  }
});

export default Header;
