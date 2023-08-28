import { Modal, FlatList, TouchableWithoutFeedback, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getFontAndColor } from '../../assets/fontAndColor';
import { useGlobalContext } from '../../context/GlobalContext';

const HeaderModal = ({ modalVisible, setModalVisible, deleteCity,cityData }) => {
  const { darkMode,setcurrCity } = useGlobalContext();
  const { fontColor, backColor } = getFontAndColor(darkMode);

  const handleCitySelect = (city) => {
    setcurrCity(city);
    setModalVisible(false);
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={[styles.modalForeground,{backgroundColor:backColor}]}>
            <FlatList
              data={cityData}
              keyExtractor={(item) => item}
              style={{ flexGrow: 0 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.cityItem} onPress={() => handleCitySelect(item)}>
                  <Text style={[styles.modaltxt,{color:fontColor}]}>{item}</Text>
                  <TouchableOpacity onPress={() => deleteCity(item)}>
                    <FontAwesome style={{ backgroundColor: backColor }} name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalForeground: {
    width: '60%',
    borderRadius: 10,
    padding: 10,
    borderRadius: 20,
  },
  modaltxt: {
    paddingVertical: 10,
    fontSize: 18,
    alignSelf: 'center',
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default HeaderModal;