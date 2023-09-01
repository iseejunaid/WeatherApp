import React, { useEffect} from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { getFontAndColor } from '../../helpers/fontAndColor';

const HeaderLocation = () => {
  const { currCity, countrycode, darkMode, isCurrLocation } = useGlobalContext();
  const { fontColor } = getFontAndColor(darkMode);


  useEffect(() => {
    console.log(isCurrLocation);
  }, [isCurrLocation]);


  return (
    <View style={styles.locationContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.loctxt, { color: fontColor }]}>{currCity}, {countrycode}</Text>
        {isCurrLocation && (
          <Ionicons name="md-location-outline" size={25} color="black" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  loctxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '9%',
  },
});

export default HeaderLocation;