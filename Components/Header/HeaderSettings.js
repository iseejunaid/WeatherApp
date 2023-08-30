import React, { useState,useEffect } from 'react';
import { Alert, Modal, StyleSheet, TouchableOpacity, View, FlatList, TouchableWithoutFeedback, Text } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import { getFontAndColor } from "../../assets/fontAndColor";
import { Entypo } from '@expo/vector-icons';

const HeaderSettings = () => {
  const { darkMode,temperatureUnit, setTemperatureUnit } = useGlobalContext();
  const { iconColor } = getFontAndColor(darkMode);
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal
  const [unit,setUnit] = useState('');

  useEffect(() => {
    if (temperatureUnit === 'metric') {
      setUnit('C');
    } else {
      setUnit('F');
    }
  }, [temperatureUnit]);

  const options = [
    { id: '1', label: 'Favorites' },
    { id: '2', label: 'Unit (\u00B0' + unit + ')' },
    { id: '3', label: 'Switch Mode (Light)' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Entypo name="dots-three-vertical" size={24} color={iconColor} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionItem}
                      onPress={() => handleOptionPress(item.id)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    justifyContent: 'center'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    width: "40.3%",
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default HeaderSettings;
