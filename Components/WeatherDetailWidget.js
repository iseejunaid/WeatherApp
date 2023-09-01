import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {useCurrTempContext} from '../context/CurrTempContext';
import { getBackgroundColor } from '../helpers/getBackground';


const WeatherDetailWidget = ({ iconName, value, unit, label, fontColor}) => {
    const {weatherState} = useCurrTempContext();

    let iconComponent = null;

    switch (iconName) {
        case 'thermometer-1':
            iconComponent = <FontAwesome name="thermometer-1" size={30} color={fontColor} />;
            break;
        case 'drop':
            iconComponent = <SimpleLineIcons name="drop" size={30} color={fontColor} />;
            break;
        case 'eye':
            iconComponent = <Ionicons name="eye"size={30} color={fontColor} />;
            break;
        case 'speedometer-slow':
            iconComponent = <MaterialCommunityIcons name="speedometer-slow" size={30} color={fontColor} />;
            break;
        default:
            break;
    }

    return (
        <View style={[styles.details, { backgroundColor: getBackgroundColor(weatherState) }]}>
            {iconComponent}
            <Text style={[styles.detailsTextvalue, { color: fontColor }]}>
                {value}
                {unit}
            </Text>
            <Text style={[styles.detailsText, { color: fontColor }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    details: {
        elevation: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        borderRadius: 20,
        padding: '2%',
        marginBottom:'2%',
    },
    detailsText: {
        fontSize: 10,
    },
    detailsTextvalue: {
        fontSize: 20,
    },
});

export default WeatherDetailWidget;
