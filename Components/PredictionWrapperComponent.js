import { View, StyleSheet} from "react-native";
import PredictionComponent from "./PredictionComponent";

const PredictionWrapperComponent = () => {

    return (
        <View style={styles.container}>
        {[0, 1, 2, 3, 4].map((index) => (
          <PredictionComponent
            key={index}
            weatherval={index}
            nextdayval={index}
          />
        ))}
      </View>
    )
}

export default PredictionWrapperComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    flexDirection: 'column',
    width: '100%',
    marginBottom:'4%',
    marginTop:'4%',
    alignItems:'center'
    // backgroundColor:'red'
  },
})