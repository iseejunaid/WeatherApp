import React from 'react';
import { Modal, FlatList, TouchableWithoutFeedback, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import citydata from '../../src/data/citydata';

const HeaderModal = ({ modalVisible, setModalVisible, handleCitySelect, deleteCity }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalForeground}>
            <FlatList
              data={citydata}
              keyExtractor={(item) => item.label}
              style={{ flexGrow: 0 }}
              renderItem={({ item, index }) => (
                <View style={styles.cityItem}>
                  <TouchableOpacity onPress={() => handleCitySelect(item.label)}>
                    <Text style={styles.modaltxt}>{item.label}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteCity(index)}>
                    <FontAwesome name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
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