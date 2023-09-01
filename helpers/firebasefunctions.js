import { firebase } from "../db/firebase";

export const mutableData = {
    cityDataModified: true,
};

export const addCity = async (label) => {
    const cityDataRef = firebase.firestore().collection('cityData').doc('uniqueCities');

    const docSnapshot = await cityDataRef.get();

    if (docSnapshot.exists) {
        const data = docSnapshot.data();
        if (data.labels.includes(label)) {
            return false;
        } else {
            await cityDataRef.update({
                labels: firebase.firestore.FieldValue.arrayUnion(label)
            });
            mutableData.cityDataModified = true;
            return true;
        }
    } else {
        await cityDataRef.set({ labels: [label] });
        mutableData.cityDataModified = true;
        return true;
    }
};

export const removeCity = async (label) => {
    const cityDataRef = firebase.firestore().collection('cityData').doc('uniqueCities');

    await cityDataRef.update({
        labels: firebase.firestore.FieldValue.arrayRemove(label)
    });

    mutableData.cityDataModified = true;
    return true;
};

