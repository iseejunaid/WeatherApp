import { firebase } from '../../db/firebase';
import { mutableData } from '../../db/firebasefunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CITY_DATA_KEY = 'cityData';

export const getCities = async () => {
  let citydata = [];

  // If city data is modified in Firebase directly, fetch it from there
  if (mutableData.cityDataModified === true) {
    const cityDataRef = firebase.firestore().collection('cityData').doc('uniqueCities');
    const docSnapshot = await cityDataRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      citydata = data.labels;

      // Store the updated city data in AsyncStorage
      try {
        await AsyncStorage.setItem(CITY_DATA_KEY, JSON.stringify(citydata));
      } catch (error) {
        console.error('Error storing city data in AsyncStorage:', error);
      }

      mutableData.cityDataModified = false;
    }
  } else {
    try {
      const storedData = await AsyncStorage.getItem(CITY_DATA_KEY);
      if (storedData) {
        citydata = JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Error reading city data from AsyncStorage:', error);
    }
  }
  return citydata;
};
