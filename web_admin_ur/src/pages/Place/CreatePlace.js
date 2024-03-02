import React, {useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import request from "../../api/request";
import { useNavigate} from "react-router-dom";

const CreatePlace = () => {
    const navigate = useNavigate();
    const [placeData, setPlaceData] = useState([]);
    const handleChange = (e) => {
        const newPlaceData = {...placeData, [e.target.name]: e.target.value}
        setPlaceData(newPlaceData);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await request.createPlace(placeData).then((response) => {
                if(response.data.success){
                    alert(response.data.data.message);
                    navigate('/admin/place/list');
                }
            })

        } catch (error) {
            console.log('Error create Place: ' + error.message);
        }
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'New Place'}/>
            <div className="grid grid-cols-1">
                {/* <!-- Contact Form --> */}
                <div
                    className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            New Place
                        </h3>
                    </div>
                    <form action="#"
                          onSubmit={handleSubmit}
                    >
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white" htmlFor={'title'}>
                                    Title <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    id='title'
                                    name='title'
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white" htmlFor={'location'}>
                                    Location <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter location"
                                    id='location'
                                    name='location'
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white" htmlFor={'price'}>
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter price"
                                        id={'price'}
                                        name={'price'}
                                        onChange={handleChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white" htmlFor={'state'}>
                                        Select state
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select
                                            className={` z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                            name='state'
                                            onChange={handleChange}
                                        >
                                            <option value="" className="text-body dark:text-bodydark">
                                                Select State
                                            </option>
                                            <option value="Available" className="text-body dark:text-bodydark">
                                                Available
                                            </option>
                                            <option value="Booked" className="text-body dark:text-bodydark">
                                                Booked
                                            </option>
                                        </select>

                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <FontAwesomeIcon icon={faAngleDown} fontSize={24}/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    rows={8}
                                    placeholder="Type description"
                                    id={'description'}
                                    name={'description'}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white" htmlFor={'state'}>
                                    Select place type
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select
                                        className={` z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                        name='place_type_id'
                                        onChange={handleChange}
                                    >
                                        <option value="" className="text-body dark:text-bodydark">
                                            Select place type
                                        </option>
                                        <option value="1" className="text-body dark:text-bodydark">
                                            Room for rent
                                        </option>
                                        <option value="2" className="text-body dark:text-bodydark">
                                            Place for sale
                                        </option>
                                        <option value="3" className="text-body dark:text-bodydark">
                                            Roommate
                                        </option>
                                        <option value="4" className="text-body dark:text-bodydark">
                                            Hotel
                                        </option>
                                    </select>

                                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <FontAwesomeIcon icon={faAngleDown} fontSize={24}/>
                                        </span>
                                </div>
                            </div>
                            <button
                                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Send Place
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CreatePlace;
