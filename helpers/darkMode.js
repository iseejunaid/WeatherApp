import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadDarkModePreference = async (setDarkMode) => {
    try {
      const preference = await AsyncStorage.getItem('darkMode');
      if (preference !== null) {
        setDarkMode(JSON.parse(preference));
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  export const saveDarkModePreference = async (value) => {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(value))
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };