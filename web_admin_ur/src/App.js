import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import AdminScreen from "./pages/AdminScreen";
import React, {useEffect, useState} from "react";
import {ThemeContext} from "./contexts/ThemeContext";
import {getThemeInStorage, setThemeInStorage} from "./config/asyncStorage";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import PlaceTable from "./pages/Place/PlaceTable";
import CreatePlace from "./pages/Place/CreatePlace";

function App() {
    const [theme, setTheme] = useState({mode: 'dark'});
    const updateTheme = (newTheme) => {
        let mode;
        if (!newTheme) {
            mode = (theme.mode === 'dark') ? 'light' : 'dark';
            newTheme = {mode};
        }
        setTheme({'mode': newTheme});

        setThemeInStorage('homeTheme', newTheme)
    }
    const fetchStoredTheme = () => {
        let themeData = getThemeInStorage('homeTheme');
        if (themeData) {
            updateTheme(themeData)
        }
    }

    useEffect(() => {
        fetchStoredTheme();
    }, []);
    return (
        <ThemeContext.Provider value={{theme, updateTheme}}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path={'/admin'} element={<AdminScreen/>} index={true}></Route>
                        <Route path={'/admin/place/list'} element={<PlaceTable/>}></Route>
                        <Route path={'/admin/room/new'} element={<CreatePlace/>}></Route>
                        <Route path={'/auth/login'} element={<Login/>}/>
                        <Route path={'/auth/register'} element={<Register/>}/>
                        <Route path={'*'} element={<Navigate to={'admin'} replace={false}/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export default App;
