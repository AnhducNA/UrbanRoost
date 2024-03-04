import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AdminScreen from "./pages/AdminScreen";
import React from "react";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import PlaceTable from "./pages/Place/PlaceTable";
import CreatePlace from "./pages/Place/CreatePlace";

function App() {

    return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path={'/admin'} element={<AdminScreen/>} index={true}></Route>
                        <Route path={'/admin/place/list'} element={<PlaceTable/>}></Route>
                        <Route path={'/admin/place/new'} element={<CreatePlace/>}></Route>
                        <Route path={'/auth/login'} element={<Login/>}/>
                        <Route path={'/auth/register'} element={<Register/>}/>
                        <Route path={'*'} element={<Navigate to={'admin'} replace={false}/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;
