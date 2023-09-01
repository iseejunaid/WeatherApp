import { Modal, FlatList, TouchableWithoutFeedback, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getFontAndColor } from '../../helpers/fontAndColor';
import { useGlobalContext } from '../../context/GlobalContext';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { saveDarkModePreference } from '../../helpers/darkMode';

const HeaderModal = ({ modalVisible, setModalVisible}) => {
  const { darkMode,temperatureUnit, setTemperatureUnit,setDarkMode} = useGlobalContext();
  const { fontColor, backColor } = getFontAndColor(darkMode);
  const [unit,setUnit] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    if (temperatureUnit === 'metric') {
      setUnit('C');
    } else {
      setUnit('F');
    }
  }, [temperatureUnit]);

  
  const handleOptionPress = (id) => {
    switch (id) {
      case '1':
        handleFavoritesOption();
        break;
      case '2':
        handleUnitOption();
        break;
      case '3':
        handleModeOption();
        break;
      default:
        break;
    }
    setModalVisible(false);
  };

  const handleFavoritesOption = () => {
    navigation.navigate("CitySearch");
  };

  const handleUnitOption = () => {
    if (temperatureUnit === 'metric') {
      setTemperatureUnit('imperial');
    } else {
      setTemperatureUnit('metric');
    }
  };

  const handleModeOption = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    saveDarkModePreference(newMode);
  };

  const mode = darkMode ? 'Dark' : 'Light';
  const options = [
    { id: '1', label: 'Favorites' },
    { id: '2', label: 'Unit (\u00B0' + unit + ')' },
    { id: '3', label: 'Switch Mode ('+mode+')' },
  ];

  return (
    <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={[styles.modalContent,{backgroundColor:backColor}]}>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => handleOptionPress(item.id)}
                    >
                      <Text style={{color:fontColor}}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default HeaderModal;