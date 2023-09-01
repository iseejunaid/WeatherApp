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