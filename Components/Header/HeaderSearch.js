import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const HeaderSearch = () => {
  const navigation = useNavigation();

  const goToCitySearch = () => {
    navigation.navigate('CitySearch');
  };

  return (
    <TouchableOpacity style={styles.header2} onPress={goToCitySearch}>
      <FontAwesome name="search" size={30} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header2: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    // backgroundColor: 'white',
  },
});

export default HeaderSearch;
