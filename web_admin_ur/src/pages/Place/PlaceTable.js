import React, {useEffect, useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEdit, faEye, faRemove} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/Tables/Pagination";
import request from "../../api/request";
import {Link} from "react-router-dom";

const PlaceTable = () => {
    const [placeList, setPlaceList] = useState([]);
    const [totalData, setTotalData] = useState()
    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(1);
    const limit = 5;
    const getPlaces = async (limit, page) => {
        try {
            await request.getPlaces(limit, page).then((response) => {
                setPlaceList(response.data.data);
                limit = setTotalData(response.data.pagination.limit) ? setTotalData(response.data.pagination.limit) : limit
                page = setTotalData(response.data.pagination.page) ? setTotalData(response.data.pagination.page) : page
                setTotalData(response.data.pagination.totalData)
                setTotalPage(response.data.pagination.totalPage)
            });
        } catch (error) {
            console.log('Error getPlaces: ' + error.message);
        }
    };
    useEffect(() => {
        getPlaces(limit, page);
    }, [page]);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'Rooms'}/>
            <div className="flex flex-col gap-10">
                <div
                    className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 text-black dark:text-white xl:pl-11">
                                    Id
                                </th>
                                <th className="max-w-203 py-4 px-4 text-black dark:text-white">
                                    Title
                                </th>
                                <th className="min-w-[150px] py-4 px-4 text-black dark:text-white">
                                    Invoice date
                                </th>
                                <th className="min-w-[120px] py-4 px-4 text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-4 text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                placeList.length > 0 && placeList.map((placeItem, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">{placeItem.id}</td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {(placeItem.title && placeItem.title.length > 250) ? placeItem.title.substring(0, 250) + '...' : placeItem.title}
                                            </h5>
                                            <p className="text-sm">Price: {placeItem.price}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {placeItem.location}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p
                                                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                                    placeItem.state === 'Available'
                                                        ? 'bg-success text-success'
                                                        : placeItem.state === 'Booked'
                                                            ? 'bg-danger text-danger'
                                                            : 'bg-warning text-warning'
                                                }`}
                                            >
                                                {placeItem.state}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button className="hover:text-primary">
                                                    <FontAwesomeIcon icon={faEye} fontSize={18}/>
                                                </button>
                                                <button className="hover:text-primary">
                                                    <FontAwesomeIcon icon={faEdit} fontSize={18}/>
                                                </button>
                                                <button className="hover:text-primary">
                                                    <FontAwesomeIcon icon={faRemove} fontSize={18}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>

                        </table>
                        {/* Pagination */}
                        <Pagination
                            limit={limit}
                            page={page}
                            totalPage={totalPage}
                            totalData={totalData}
                            onPageChange = {(page) => setPage(page)}
                        />
                        {/*    End Pagination */}
                    </div>
                    <div className="my-3.5 flex flex-wrap gap-5 xl:gap-7.5">
                        <Link
                            to="/admin/place/new"
                            className=" inline-flex items-center justify-center gap-2.5  bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            <FontAwesomeIcon icon={faAdd} fontSize={20}/>
                            New Place
                        </Link>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default PlaceTable;
