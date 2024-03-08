import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AdminScreen from "./pages/AdminScreen";
import React from "react";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import PlaceList from "./pages/Place/PlaceList";
import CreatePlace from "./pages/Place/CreatePlace";
import BookingList from "./pages/Booking/BookingList";
import DetailPlace from "./pages/Place/DetailPlace";
import DetailBooking from "./pages/Booking/DetailBooking";
import UserList from "./pages/User/UserList";
import DetailUser from "./pages/User/DetailUser";

function App() {

    return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path={'/admin'} element={<AdminScreen/>} index={true}></Route>
                        <Route path={'/admin/place/list'} element={<PlaceList/>}></Route>
                        <Route path={'/admin/place/:idPlace'} element={<DetailPlace/>}></Route>
                        <Route path={'/admin/place/new'} element={<CreatePlace/>}></Route>
                        <Route path={'/admin/booking/list'} element={<BookingList/>}></Route>
                        <Route path={'/admin/booking/:bookingId'} element={<DetailBooking/>}></Route>
                        <Route path={'/admin/user/list'} element={<UserList/>}></Route>
                        <Route path={'/admin/user/:userId'} element={<DetailUser/>}></Route>
                        <Route path={'/auth/login'} element={<Login/>}/>
                        <Route path={'/auth/register'} element={<Register/>}/>
                        <Route path={'*'} element={<Navigate to={'admin'} replace={false}/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;
