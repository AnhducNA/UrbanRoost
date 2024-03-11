import React, {useEffect, useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import request from "../../api/request";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEdit, faEye, faRemove} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/Tables/Pagination";

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [totalData, setTotalData] = useState()
    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(1);
    const limit = 5;
    const getCategoryList = async (limit, page) => {
        try {
            await request.getCategoryList(limit, page).then((response) => {
                setCategoryList(response.data.data);
                limit = setTotalData(response.data.pagination.limit) ? setTotalData(response.data.pagination.limit) : limit
                page = setTotalData(response.data.pagination.page) ? setTotalData(response.data.pagination.page) : page
                setTotalData(response.data.pagination.totalData)
                setTotalPage(response.data.pagination.totalPage)
            });
        } catch (error) {
            console.log('Error getCategoryList: ' + error.message);
        }
    };
    const deleteCategoryById = async (categoryId) => {
        await request.deleteCategoryById(categoryId)
            .then((response) => {
                if (response.data.success) {
                    alert(response.data.data.message);
                    window.location.reload(true);
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    useEffect(() => {
        getCategoryList(limit, page);
    }, [page]);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={'Category list'}/>
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
                                <th className="min-w-[100px] py-4 px-4 text-black dark:text-white">
                                    Name
                                </th>
                                <th className="min-w-[200px] py-4 px-4 text-black dark:text-white">
                                    Description
                                </th>
                                <th className="py-4 px-4 text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                categoryList.length > 0 && categoryList.map((categoryItem, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">{categoryItem.id}</td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="font-medium text-black dark:text-white">
                                                    {(categoryItem.name && categoryItem.name.length > 250) ? categoryItem.name.substring(0, 250) + '...' : categoryItem.name}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {categoryItem.description}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <div className="flex items-center space-x-3.5">
                                                    <Link
                                                        to={`/admin/category/${categoryItem.id}`}
                                                        className="hover:text-primary">
                                                        <FontAwesomeIcon icon={faEye} fontSize={18}/>
                                                    </Link>
                                                    <Link to={`/admin/category/${categoryItem.id}/update`}
                                                          className="hover:text-primary">
                                                        <FontAwesomeIcon icon={faEdit} fontSize={18}/>
                                                    </Link>
                                                    <button
                                                        className="hover:text-primary"
                                                        type="button"
                                                        onClick={
                                                            () => deleteCategoryById(categoryItem.id)
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faRemove} fontSize={18}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>

                        </table>
                        {/* Pagination */}
                        <Pagination
                            limit={limit}
                            page={page}
                            totalPage={totalPage}
                            totalData={totalData}
                            onPageChange={(page) => setPage(page)}
                        />
                        {/*    End Pagination */}
                    </div>
                    <div className="my-3.5 flex flex-wrap gap-5 xl:gap-7.5">
                        <Link
                            to="/admin/category/new"
                            className=" inline-flex items-center justify-center gap-2.5  bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            <FontAwesomeIcon icon={faAdd} fontSize={20}/>
                            New Category
                        </Link>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CategoryList;
