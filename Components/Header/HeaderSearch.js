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
      <FontAwesome style={styles.header2icon} name="search" size={35} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header2: {
    height: '40%',
    width: '15%',
  },
  header2icon: {
    marginLeft: '40%',
  },
});

export default HeaderSearch;
