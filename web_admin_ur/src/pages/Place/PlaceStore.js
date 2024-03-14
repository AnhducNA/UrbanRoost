import React, {useEffect, useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import request from "../../api/request";
import {useNavigate, useParams} from "react-router-dom";
import {getBase64} from "../../utils";

const PlaceStore = () => {
    const [fileImageList, setFileImageList] = useState([]);
    // Check update and insert
    const placeId = useParams().idPlace;
    //  Navigate
    const navigate = useNavigate();
    // data
    const [placeData, setPlaceData] = useState({
        id: placeId ? placeId : '',
        title: '',
        description: '',
        image: '',
        image_list: [],
        location: '',
        price: '',
        state: '',
        place_category_id_list: [],
    });

    const handleChange = (e) => {
        let dataNew = {};
        if (e.target.name === 'image_list') {
            // Set File to render Image
            const newFileImageArray = Array.from(e.target.files, file => URL.createObjectURL(file))
            setFileImageList(newFileImageArray)
            // convert to base64 and array
            let imageListBase64 = [];
            const imageList = Array.from(e.target.files, option => option);
            imageList.map(file => {
                getBase64(file, (result) => {
                    imageListBase64.push(result);
                });
            })
            dataNew = {...placeData, 'image_list': imageListBase64};
        } else if (e.target.name === 'place_category_id_list') {
            const newValue = Array.from(e.target.selectedOptions, option => option.value);
            dataNew = {...placeData, 'place_category_id_list': newValue}
        } else {
            dataNew = {...placeData, [e.target.name]: e.target.value}
        }
        setPlaceData(dataNew);
    };


    // Get default data when update
    const getPlaceById = async () => {
        await request.getPlaceById(placeId)
            .then((response) => {
                setPlaceData(response.data.data[0]);
            })
            .catch(error => {
                console.log('Error getPlaceById: ' + error.message);
            });
    }
    const setValueDefault = (attribute) => {
        return (placeData) ? (placeData[attribute]) : '';
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (placeId) {
            // UPDATE
            await request.placeUpdate({
                'id': placeData.id,
                'title': placeData.title,
                'description': placeData.description,
                'location': placeData.location,
                'price': placeData.price,
                'state': placeData.state,
                'place_category_id_list': placeData.place_category_id_list,
                'image_list': placeData.image_list,
            })
                .then((response) => {
                    if (response.data.success) {
                        alert(response.data.data.message);
                        navigate('/admin/place/list');
                    }
                })
                .catch(error => {
                    console.log('Error update Place: ' + error.message);
                })
            return;
        } else {
            await request.createPlace(placeData)
                .then((response) => {
                    if (response.data.success) {
                        alert(response.data.data.message);
                        navigate('/admin/place/list');
                    }
                })
                .catch(error => {
                    console.log('Error create Place: ' + error.message);
                })
            return;
        }

    }
    useEffect(() => {
        if (placeId) {
            getPlaceById(placeId);
        }
    }, []);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={placeId ? 'Update Place' : 'New Place'}/>
            <div className="grid grid-cols-1">
                {/* <!-- Contact Form --> */}
                <div
                    className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            {placeId ? 'Place ' + placeId : 'New Place'}
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
                                    defaultValue={setValueDefault('title')}
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
                                    defaultValue={setValueDefault('location')}
                                    name='location'
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Image <span className="text-meta-1">*</span>
                                </label>

                                <input
                                    type="file"
                                    defaultValue={setValueDefault('location')}
                                    multiple={true}
                                    name='image_list'
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <div className={'w-full flex gap-4 overflow-x-auto'}>
                                    {fileImageList.map((fileImage, key) => {
                                        return (
                                            <img src={fileImage} key={key} width={'150px'} alt={'No image'}/>
                                        )
                                    })}
                                </div>
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
                                        defaultValue={setValueDefault('price')}
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
                                            defaultValue={setValueDefault('state')}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled={true} className="text-body dark:text-bodydark">
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
                                    defaultValue={setValueDefault('description')}
                                    name={'description'}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>
                            {/* Select group */}
                            <div className="mb-6">
                                <label className="mb-2.5 block text-black dark:text-white" htmlFor={'state'}>
                                    Select place category
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select
                                        className={` z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                        defaultValue={setValueDefault('place_category_id_list')}
                                        name='place_category_id_list'
                                        onChange={handleChange}
                                        multiple={true}
                                    >
                                        <option value="" disabled={true} className="text-body dark:text-bodydark">
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

export default PlaceStore;
