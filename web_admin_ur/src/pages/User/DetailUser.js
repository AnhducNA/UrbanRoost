import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import request from "../../api/request";

const DetailPlace = () => {
    const {userId} = useParams();
    const [user, setUser] = useState([]);
    const [bookingByUserId, setBookingByUserId] = useState([]);
    const [placeByUserId, setPlaceByUserId] = useState([]);
    const [rateByUserId, setRateByUserId] = useState([]);
    const getUserById = async (userId) => {
        try {
            await request.getUserById(userId).then((response) => {
                setUser(response.data.data[0])
            });
        } catch (e) {
            console.log('Error getUserById: ' + e.message)
        }
    };
    const getBookingByUserId = async (userId) => {
        try {
            await request.getBookingByUserId(userId).then((response) => {
                setBookingByUserId(response.data.data)
            });
        } catch (e) {
            console.log('Error getBookingByUserId: ' + e.message)
        }
    };
    const getPlaceByUserId = async (userId) => {
        try {
            await request.getPlaceByUserId(userId).then((response) => {
                setPlaceByUserId(response.data.data)
            });
        } catch (e) {
            console.log('Error getPlaceByUserId: ' + e.message)
        }
    };
    const getRateByUserId = async (userId) => {
        try {
            await request.getRateByUserId(userId).then((response) => {
                setRateByUserId(response.data.data)
            });
        } catch (e) {
            console.log('Error getRateByUserId: ' + e.message)
        }
    };
    useEffect(() => {
        getUserById(userId);
        getBookingByUserId(userId);
        getPlaceByUserId(userId);
        getRateByUserId(userId)
    }, [userId]);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'User ' + userId}/>
            {/* Container  */}
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Information
                    </h3>
                </div>
                <div className="p-7">
                    <div className="mb-5.5 flex flex-col sm:flex-row gap-4.5">
                        <div className=" sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Name
                            </b>
                            <p id="fullName"
                               className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                                {user.name}
                            </p>
                        </div>
                        <div className=" sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Email
                            </b>
                            <p id="fullName"
                               className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                                {user.email}
                            </p>
                        </div>
                        <div className=" sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Phone
                            </b>
                            <p id="fullName"
                               className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                                {user.phone}
                            </p>
                        </div>
                    </div>
                    {/* Table booking's User*/}
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Booking's User
                            </b>
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="w-fit py-4 px-4 text-black dark:text-white xl:pl-11">
                                        Id
                                    </th>
                                    <th className="min-w-[350px]  py-4 px-4 text-black dark:text-white">
                                        Place's Booking
                                    </th>
                                    <th className="w-fit py-4 px-4 text-black dark:text-white">
                                        Time
                                    </th>
                                    <th className="w-fit py-4 px-4 text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    bookingByUserId.length > 0 && bookingByUserId.map((bookingItem, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">{bookingItem.id}</td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <h5 className="font-medium text-black dark:text-white">
                                                            {(bookingItem.place_title && bookingItem.place_title.length > 250)
                                                                ? bookingItem.place_title.substring(0, 250) + '...'
                                                                : bookingItem.place_title}
                                                        </h5>
                                                        <p className="text-sm">Price: {bookingItem.place_price}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="text-black dark:text-white">
                                                            {bookingItem.time_in}
                                                            <span className='block'> - </span>
                                                            {bookingItem.time_out}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <div className="flex justify-center items-center space-x-3.5">
                                                            <Link
                                                                to={`/admin/booking/${bookingItem.id}`}
                                                                className="hover:text-primary">
                                                                <FontAwesomeIcon icon={faEye} fontSize={18}/>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* End Table booking's User*/}
                    {/* Table Place's User*/}
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Place's User
                            </b>
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="w-fit py-4 px-4 text-black dark:text-white xl:pl-11">
                                        Id
                                    </th>
                                    <th className="min-w-[350px]  py-4 px-4 text-black dark:text-white">
                                        Place's User
                                    </th>
                                    <th className="w-fit py-4 px-4 text-black dark:text-white">
                                        Created At
                                    </th>
                                    <th className="w-fit py-4 px-4 text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    placeByUserId.length > 0 && placeByUserId.map((placeItem, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">{placeItem.id}</td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <h5 className="font-medium text-black dark:text-white">
                                                            {(placeItem.title && placeItem.title.length > 250)
                                                                ? placeItem.title.substring(0, 250) + '...'
                                                                : placeItem.title}
                                                        </h5>
                                                        <p className="text-sm">Price: {placeItem.price}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="text-black dark:text-white">
                                                            {placeItem.created_at}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <div className="flex justify-center items-center space-x-3.5">
                                                            <Link
                                                                to={`/admin/place/${placeItem.id}`}
                                                                className="hover:text-primary">
                                                                <FontAwesomeIcon icon={faEye} fontSize={18}/>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* End Table Place's User*/}
                    {/* Table Rate's User*/}
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Rate's User
                            </b>
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="w-fit py-4 px-4 text-black dark:text-white xl:pl-11">
                                        Id
                                    </th>
                                    <th className="min-w  py-4 px-4 text-black dark:text-white">
                                        To
                                    </th>
                                    <th className="min-w-[350px]  py-4 px-4 text-black dark:text-white">
                                        Content
                                    </th>
                                    <th className="w-fit py-4 px-4 text-black dark:text-white">
                                        Created At
                                    </th>
                                    <th className="w-fit py-4 px-4 text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    rateByUserId.length > 0 && rateByUserId.map((rateItem, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">{rateItem.id}</td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        {(rateItem.place_id) ?
                                                            (
                                                                <Link to={`/admin/place/${rateItem.place_id}`}
                                                                    className="font-medium text-black dark:text-white hover:underline">
                                                                    {('Place: ' + rateItem.place_id)}
                                                                </Link>
                                                            ) :
                                                            (
                                                                <Link to={`/admin/user/${rateItem.place_id}`}
                                                                    className="font-medium text-black dark:text-white hover:underline">
                                                                    {('User: ' + rateItem.to_user_id)}
                                                                </Link>
                                                            )
                                                        }
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="font-medium text-black dark:text-white">
                                                            {(rateItem.content && rateItem.content.length > 250)
                                                                ? rateItem.content.substring(0, 250) + '...'
                                                                : rateItem.content}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="text-black dark:text-white">
                                                            {rateItem.created_at}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <div className="flex justify-center items-center space-x-3.5">
                                                            <Link
                                                                to={`/admin/rate/${rateItem.id}`}
                                                                className="hover:text-primary">
                                                                <FontAwesomeIcon icon={faEye} fontSize={18}/>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* End Table Rate's User*/}
                    <div className="mb-5.5 flex justify-end gap-4.5">
                        <button
                            onClick={() => {
                                window.history.back()
                            }}
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            {/* End Container  */}
        </DefaultLayout>
    );
};

export default DetailPlace;
