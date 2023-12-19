import AsyncStorage from "@react-native-async-storage/async-storage";

//those two functions are used to store and retrieve data from the async storage

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        console.log('jsonValue = ' + jsonValue)
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        alert(e)
    }
}
export const getData = async (key) => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        console.log('jsonValue=' + jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }catch (e){
        alert(e);
    }
}
