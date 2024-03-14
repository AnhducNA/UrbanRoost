import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import request from "../../api/request";

const DetailPlace = () => {
    const {idPlace} = useParams();
    const [place, setPlace] = useState([]);
    const [rateAboutPlaceId, setRateAboutPlaceId] = useState([]);
    const [rateAverageAboutPlaceId, setRateAverageAboutPlaceId] = useState([]);
    const getPlaceById = async (idPlace) => {
        try {
            await request.getPlaceById(idPlace).then((response) => {
                setPlace(response.data.data[0])
            });
        } catch (e) {
            console.log('Error getPlaceById: ' + e.message)
        }
    };
    const getRateAboutPlaceId = async (idPlace) => {
        try {
            await request.getRateAboutPlaceId(idPlace).then((response) => {
                setRateAboutPlaceId(response.data.data);
                setRateAverageAboutPlaceId(response.data.rateAverage);
            });
        } catch (e) {
            console.log('Error getPlaceById: ' + e.message);
        }
    };
    useEffect(() => {
        getPlaceById(idPlace);
        getRateAboutPlaceId(idPlace);
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
                        <div className="w-full sm:w-1/4">
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
                        <div className="w-full sm:w-1/4">
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
                        <div className="w-full sm:w-1/4">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Owned by
                            </b>
                            <div>
                                <Link to={`/admin/user/${place.user_id}`}
                                      className="w-full block hover:underline rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    User: {place.user_id} <br/> Name: {place.user_name}
                                </Link>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Star
                            </b>
                            <div>
                                <p
                                    className="w-full block hover:underline rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                >
                                    {rateAverageAboutPlaceId}
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
                        {(place.img) ? (
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
                            </ul>
                        ) : ''}
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
                    {/* Table Rate about Place */}
                    <div className="mb-5.5 ">
                        <div className="w-full">
                            <b
                                className="mb-3 block text-sm text-black dark:text-white"
                            >
                                Rate about Place
                            </b>
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="w-fit py-4 px-4 text-black dark:text-white xl:pl-11">
                                        Id
                                    </th>
                                    <th className="min-w  py-4 px-4 text-black dark:text-white">
                                        From
                                    </th>
                                    <th className="min-w  py-4 px-4 text-black dark:text-white">
                                        Star
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
                                    rateAboutPlaceId.length > 0 && rateAboutPlaceId.map((rateItem, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">{rateItem.id}</td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <Link to={`/admin/user/${rateItem.place_id}`}
                                                              className="font-medium text-black dark:text-white hover:underline">
                                                            {('User: ' + rateItem.from_user_id)}
                                                        </Link>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p
                                                            className="font-medium text-black dark:text-white hover:underline">
                                                            {rateItem.star}
                                                        </p>
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
                    {/* End Table Rate about Place */}
                    <div className="mb-5.5 flex justify-end gap-4.5">
                        <button
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                            onClick={() => {
                                window.history.back()
                            }}
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

export default DetailPlace;
