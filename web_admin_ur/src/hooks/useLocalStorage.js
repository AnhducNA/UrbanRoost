import React, {useEffect, useState} from 'react';

const UseLocalStorage = (key, initialValue) => {
    const [storeValue, setStoreValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return (item) ? JSON.parse(item) : initialValue;
        } catch (e) {
            console.log(`Error getItem ${key}: ` + e.message)
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storeValue))
        } catch (e) {
            console.log(`Error setItem ${key}: ` + e.message);
        }
    }, [key, storeValue]);
    return [storeValue, setStoreValue];
};

export default UseLocalStorage;
