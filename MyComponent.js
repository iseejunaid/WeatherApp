import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, Keyboard, FlatList } from 'react-native';
import { firebase } from './db/firebase';

const MyComponent = () => {
    const favoritesRef = firebase.firestore().collection('favorites');
    const [cityName, setCityName] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch the favorites data from Firebase
        const unsubscribe = favoritesRef.onSnapshot((snapshot) => {
            const favoritesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setFavorites(favoritesData);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const addFavorite = () => {
        if (cityName && cityName.length > 0) {
            const data = {
                city: cityName,
            };
            favoritesRef
                .add(data)
                .then(() => {
                    setCityName('');
                    Keyboard.dismiss();
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.formcontainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add City"
                    value={cityName}
                    onChangeText={(city) => setCityName(city)}
                />

                <TouchableOpacity style={styles.button} onPress={() => addFavorite()}>
                    <Text style={styles.buttontxt}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.favoriteItem}>
                        <Text>{item.city}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formcontainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop:'20%'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
    },
    button: {
        height: 47,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    buttontxt: {
        color: 'white',
        fontSize: 20,
    },
    favoriteItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default MyComponent;
