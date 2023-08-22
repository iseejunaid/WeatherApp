import { View, StyleSheet,ScrollView } from "react-native";
import PredictionComponent from "./PredictionComponent";

const PredictionWrapperComponent = () => {

    return (
        <View style={styles.bottom}>
      <ScrollView>
        {[0, 1, 2, 3, 4].map((index) => (
          <PredictionComponent
            key={index}
            weatherval={index}
            nextdayval={index}
          />
        ))} 
        </ScrollView>
      </View>
    )
}

export default PredictionWrapperComponent;

const styles = StyleSheet.create({
  bottom: {
    flex: 0.3,
    flexDirection: 'column',
    width: '100%',
    marginBottom:'4%',
  },
})