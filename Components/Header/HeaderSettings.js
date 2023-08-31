import React, { useState} from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import { getFontAndColor } from "../../assets/fontAndColor";
import { Entypo } from '@expo/vector-icons';
import HeaderModal from './HeaderModal';

const HeaderSettings = () => {
  const { darkMode } = useGlobalContext();
  const { fontColor } = getFontAndColor(darkMode);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Entypo name="dots-three-vertical" size={24} color={fontColor} />
      </TouchableOpacity>
      
      <HeaderModal 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    justifyContent: 'center'
  },
});

export default HeaderSettings;
