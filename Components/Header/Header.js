import React from 'react';
import { StyleSheet, View} from 'react-native';
import HeaderLocation from './HeaderLocation';
import HeaderSettings from './HeaderSettings'



const Header = ({ isLandscape }) => {

  return (
    <View style={[styles.header, isLandscape && styles.landscapeHeader]}>
      <View style={styles.leftHeader}>
        <HeaderLocation />
      </View>
      <View style={styles.rightHeader}>
        <HeaderSettings/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: '12%',
    width: '100%',
    flexDirection: 'row',
    marginTop:'-15%'
  },
  landscapeHeader: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
    marginTop:'-8%',
  },
  leftHeader:{
    height:'100%',
    width:'80%',
    // backgroundColor:'white',
    justifyContent:'flex-end',
    paddingLeft:'2%'
  },
  rightHeader:{
    height:'100%',
    width:'20%',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    paddingRight:'2%',
    // backgroundColor:'black'
  }
});

export default Header;
