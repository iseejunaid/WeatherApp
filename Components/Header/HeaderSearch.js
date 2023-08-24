import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from "../../context/GlobalContext";
import { getFontAndColor } from "../../assets/fontAndColor";

const HeaderSearch = () => {
  const navigation = useNavigation();
  const { darkMode } = useGlobalContext();
  const {backColor} = getFontAndColor(darkMode);

  const goToCitySearch = () => {
    navigation.navigate('CitySearch');
  };

  return (
    <TouchableOpacity style={styles.header2} onPress={goToCitySearch}>
      <FontAwesome name="search" size={30} color={backColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header2: {
    width: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    // backgroundColor: 'grey',
  },
});

export default HeaderSearch;
