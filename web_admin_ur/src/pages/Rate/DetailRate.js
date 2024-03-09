import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import request from "../../api/request";

const DetailRate = () => {
    const {rateId} = useParams();
    const [rate, setRate] = useState([]);
    const getRateById = async (rateId) => {
        try {
            await request.getRateById(rateId).then((response) => {
                setRate(response.data.data[0])
            });
        } catch (e) {
            console.log('Error getRateById: ' + e.message)
        }
    };
    useEffect(() => {
        getRateById(rateId);
    }, [rateId]);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'Rate ' + rateId}/>
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
                        <div className=" sm:w-1/4">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                From
                            </b>
                            <Link to={`/admin/user/${rate.from_user_id}`}
                                  className="w-full block rounded border border-stroke bg-gray py-3 px-4.5 text-black hover:underline dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            >
                                User: {rate.from_user_id} <br/> Name: {rate.from_user_name}
                            </Link>
                        </div>
                        <div className=" sm:w-1/4">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                To
                            </b>
                            {(rate.place_id) ?
                                (
                                    <Link to={`/admin/place/${rate.place_id}`}
                                          className="w-full block rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    >
                                        Place: {rate.place_id}
                                    </Link>
                                ) :
                                (
                                    <Link to={`/admin/user/${rate.to_user_id}`}
                                          className="w-full block rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    >
                                        User: {rate.to_user_id} <br/> Name: {rate.to_user_name}
                                    </Link>
                                )}
                        </div>
                    </div>
                    <div className="mb-5.5 flex flex-col sm:flex-row gap-4.5">
                        <div className=" sm:w-1/4">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Star
                            </b>
                            <p
                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                                {rate.star}
                            </p>
                        </div>
                        <div className=" sm:w-1/4">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Created at
                            </b>
                            <p
                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                                {rate.created_at}
                            </p>
                        </div>
                        <div className=" sm:w-1/4">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Updated at
                            </b>
                            <p
                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                                {rate.updated_at}
                            </p>
                        </div>
                    </div>
                    <div className="mb-5.5">
                        <b
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Description
                        </b>
                        <div className="relative">
                            <span className="absolute left-4.5 top-4">
                                <FontAwesomeIcon icon={faPenToSquare} fontSize={20}/>
                            </span>
                            <textarea
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                rows={3}
                                defaultValue={rate.content}
                            ></textarea>
                        </div>
                    </div>
                    <div className="mb-5.5 flex justify-end gap-4.5">
                        <button
                            onClick={() => {
                                window.history.back()
                            }}
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
            {/* End Container  */}
        </DefaultLayout>
    );
};

export default DetailRate;
