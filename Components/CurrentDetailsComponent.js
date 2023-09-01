import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { useCurrTempContext } from '../context/CurrTempContext';
import { getFontAndColor } from '../helpers/fontAndColor';
import WeatherDetailWidget from './WeatherDetailWidget';

const detailWidgets = [
    {
        iconName: 'thermometer-1',
        valueGetter: details => Math.ceil(details.feellike),
        unitGetter: (temperatureUnit) => (temperatureUnit === 'metric' ? '°C' : '°F'),
        label: 'Feels Like',
    },
    {
        iconName: 'drop', 
        valueGetter: details => details.humidity,
        unitGetter: () => '%',
        label: 'Humidity',
    },
    {
        iconName: 'eye',
        valueGetter: details => Math.ceil(details.visibility / 1000),
        unitGetter: () => ' km',
        label: 'Visibility',
    },
    {
        iconName: 'speedometer-slow',
        valueGetter: details => details.pressure,
        unitGetter: () => ' hPa',
        label: 'Pressure',
    },
];



const CurrentDetailsComponent = () => {
    const { darkMode } = useGlobalContext();
    const { details, temperatureUnit } = useCurrTempContext();

    const { fontColor} = getFontAndColor(darkMode);

    return (
        <View style={styles.container}>
            <View style={styles.detailsRow}>
                {detailWidgets.map((widget, index) => (
                    <WeatherDetailWidget
                        key={index}
                        iconName={widget.iconName}
                        value={widget.valueGetter(details)}
                        unit={widget.unitGetter(temperatureUnit)}
                        label={widget.label}
                        fontColor={fontColor}
                    />
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
});

export default CurrentDetailsComponent;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { FontAwesome, SimpleLineIcons,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
// import { useGlobalContext } from '../context/GlobalContext';
// import { useCurrTempContext } from '../context/CurrTempContext';
// import { getFontAndColor } from '../assets/fontAndColor';

// const CurrentDetailsComponent = () => {
//     const { darkMode } = useGlobalContext();
//     const { details,temperatureUnit } = useCurrTempContext();

//     const { fontColor,backColor } = getFontAndColor(darkMode); 

//     return (
//         <View style={styles.container}>
//             <View style={styles.detailsRow}>
//                 <View style={[styles.details,{backgroundColor:backColor}]}>
//                     <FontAwesome name="thermometer-1" size={30} color={fontColor} />
//                     <Text style={[styles.detailsTextvalue,{color:fontColor}]}>{Math.ceil(details.feellike)}{temperatureUnit === 'metric' ? '°C' : '°F'}</Text>
//                     <Text style={[styles.detailsText,{color:fontColor}]}>Feels Like</Text>
//                 </View>
//                 <View style={[styles.details,{backgroundColor:backColor}]}>
//                     <SimpleLineIcons name="drop" size={30} color={fontColor} />
//                     <Text style={[styles.detailsTextvalue,{color:fontColor}]}>{details.humidity}%</Text>
//                     <Text style={[styles.detailsText,{color:fontColor}]}>Humidity</Text>
//                 </View>
//             </View>
//             <View style={styles.detailsRow}>
//                 <View style={[styles.details,{backgroundColor:backColor}]}>
//                     <Ionicons name="eye" size={30} color={fontColor} />
//                     <Text style={[styles.detailsTextvalue,{color:fontColor}]}>{Math.ceil(details.visibility/1000)} km</Text>
//                     <Text style={[styles.detailsText,{color:fontColor}]}>Visibility</Text>
//                 </View>
//                 <View style={[styles.details,{backgroundColor:backColor}]}>
//                     <MaterialCommunityIcons name="speedometer-slow" size={30} color={fontColor} />
//                     <Text style={[styles.detailsTextvalue,{color:fontColor}]}>{details.pressure} hPa</Text>
//                     <Text style={[styles.detailsText,{color:fontColor}]}>Pressure</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 0.23,
//         flexDirection: 'column',
//         width: '100%',
//     },
//     detailsRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         width: '100%',
//         // backgroundColor:'red',
//         marginBottom: 10, 
//     },
//     details: {
//         elevation: 10,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '40%',
//         borderRadius: 20,
//         padding: "2%",
//     },
//     detailsText: {
//         fontSize: 10,
//     },
//     detailsTextvalue: {
//         fontSize: 20,
//     },
// });

// export default CurrentDetailsComponent;
