import React, {useEffect, useState} from 'react';
import useLocalStorage from "./useLocalStorage";

const UseColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

    useEffect(() => {
        const className = 'dark';
        const bodyClass = window.document.body.classList;
        colorMode === 'dark' ? bodyClass.add(className) : bodyClass.remove(className);
    }, [colorMode]); // Chỉ re-run effect nếu giá trị colorMode thay đổi

    return [colorMode, setColorMode];
};

export default UseColorMode;
