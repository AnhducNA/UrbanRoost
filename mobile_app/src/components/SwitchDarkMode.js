import React, {useContext, useEffect, useState} from 'react';
import {Appearance, Switch} from "react-native";
import {colors} from "../config/theme";
import {ThemeContext} from "../context/ThemeContext";

const SwitchDarkMode = () => {
    const {theme, updateTheme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];
    //here we set the state of the switch to the current theme:
    //theme.mode is the current theme which we get from the context
    const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === 'dark');

    //here we toggle the theme and update the state of the switch
    const toggleTheme = () => {
        updateTheme();
        setIsDarkTheme((prevState) => !prevState);
    };
    useEffect(() => {
        //here we listen for the color scheme change and update the state of the switch
        //this is necessary so that the switch automatically updates
        //when the user changes the theme from the settings
        Appearance.addChangeListener(({colorScheme}) => {
            colorScheme === "dark" ? setIsDarkTheme(true) : setIsDarkTheme(false);
        });
    }, []);
    return (
        <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            thumbColor={isDarkTheme ? activeColors.switch_on : activeColors.tertiary}
            trackColor={{
                false: activeColors.bg_switch,
                true: activeColors.bg_switch
            }}
        />
    );
};

export default SwitchDarkMode;
