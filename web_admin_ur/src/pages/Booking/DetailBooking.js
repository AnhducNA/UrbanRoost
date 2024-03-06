import React, {useEffect, useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import {useParams} from "react-router-dom";
import request from "../../api/request";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const DetailBooking = () => {
    const {bookingId} = useParams();
    const [booking, setBooking] = useState([]);
    const getBookingById = async (bookingId) => {
        try {
            await request.getBookingById(bookingId).then((response) => {
                setBooking(response.data.data[0])
            });
        } catch (e) {
            console.log('Error getBookingById: ' + e.message)
        }
    }
    useEffect(() => {
        getBookingById(bookingId)
    }, [bookingId]);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'Booking ' + bookingId}/>
            {/* Container  */}
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h2 className="text-2xl font-medium text-black dark:text-white">
                        Information
                    </h2>
                </div>
                <div className="p-7">
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="text-xl block mb-3 text-black dark:text-white"
                            >
                                User's Booking
                            </b>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <p
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    <strong>Name:</strong> {booking.user_name}
                                </p>
                                <p
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    <strong>Email: </strong> {booking.user_email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="text-xl mb-3 block text-sm text-black dark:text-white"
                            >
                                Place's Booking
                            </b>
                            <div
                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                                <p>
                                    {booking.place_title}
                                </p>
                                <p className="text-sm">
                                    <strong>Price:</strong> {booking.place_price}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Location's Booking
                            </b>
                            <div>
                                <p
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    {booking.place_location}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5.5 flex flex-col sm:flex-row gap-5">
                        <div className="w-full sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                State
                            </b>
                            <p
                                className={`w-full rounded  text-center bg-opacity-10 py-3 px-4.5 font-bold ${
                                    booking.place_state === 'Available'
                                        ? 'bg-success text-success'
                                        : booking.place_state === 'Booked'
                                            ? 'bg-danger text-danger'
                                            : 'bg-warning text-warning'
                                }`}
                            >
                                {booking.place_state}
                            </p>
                        </div>
                        <div className="w-full sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Time in
                            </b>
                            <div>
                                <p
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    {booking.time_in}
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Time out
                            </b>
                            <div>
                                <p
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    {booking.time_out}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                        <button
                            onClick={() => {
                                window.history.back()
                            }}
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                        >
                            Cancel
                        </button>
                        <button
                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            {/* End Container  */}
        </DefaultLayout>
    );
};

export default DetailBooking;
