import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import request from "../../api/request";

const DetailPlace = () => {
    const {idPlace} = useParams();
    const [place, setPlace] = useState([]);
    const getPlaceById = async (idPlace) => {
        try {
            await request.getPlaceById(idPlace).then((response) => {
                setPlace(response.data[0])
                console.log(place)
            });
        } catch (e) {
            console.log('Error getPlaceById: ' + e.message)
        }
    }
    useEffect(() => {
        getPlaceById(idPlace)
    }, [idPlace]);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'Place ' + idPlace}/>
            {/* Container  */}
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Information
                    </h3>
                </div>
                <div className="p-7">
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Title
                            </b>
                            <p id="fullName"
                               className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            >
                                {place.title}
                            </p>
                        </div>
                    </div>
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Location
                            </b>
                            <div>
                                <p id="fullName"
                                   className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    {place.location}
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
                                    place.state === 'Available'
                                        ? 'bg-success text-success'
                                        : place.state === 'Booked'
                                            ? 'bg-danger text-danger'
                                            : 'bg-warning text-warning'
                                }`}
                            >
                                {place.state}
                            </p>
                        </div>
                        <div className="w-full sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Price
                            </b>
                            <div>
                                <p id="fullName"
                                   className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    {place.price}
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/3">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Owned by
                            </b>
                            <div>
                                <p
                                   className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    {place.name_user}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5.5">
                        <b
                            className="mb-3 block text-sm text-black dark:text-white"
                        >
                            Images
                        </b>
                        {(place.img) ? (() => {
                            return (
                                <ul className=" w-full flex overflow-auto">
                                    <li className="w-[250px] h-[300px] flex-none px-6 py-3">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                    <li className="w-[250px] h-[300px] flex-none px-6 py-3">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                    <li className="w-[250px] h-[300px] flex-none px-6 py-3">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                    <li className="w-[250px] h-[300px] flex-none px-6 py-3">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                    <li className="w-[250px] h-[300px] flex-none px-6 py-3">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                    <li className="w-[250px] h-[300px] flex-none px-6 py-3">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                    <li className="w-[250px] h-[300px] flex-none px-6 py-3">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                    <li className=" w-[250px] h-[300px]">
                                        <img src={place.img} alt="" className='w-full h-full rounded-xl'/>
                                    </li>
                                </ul>
                            )
                        }) : ''}

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
                                rows={8}
                                defaultValue={place.description}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mb-5.5 flex justify-end gap-4.5">
                        <button
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                            onClick={() => {
                                window.history.back()
                            }}
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
