import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalProvider } from './context/GlobalContext';
import { CurrTempProvider } from './context/CurrTempContext';
import Home from './Screens/Home';
import CitySearch from './Screens/CitySearch';


const Stack = createStackNavigator();

function App() {
  return (
    <GlobalProvider>
    <CurrTempProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="CitySearch" component={CitySearch} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </CurrTempProvider>
    </GlobalProvider>
  );
}

export default App;
