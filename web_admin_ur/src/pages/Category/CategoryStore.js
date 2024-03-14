import React, {useEffect, useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import {Link, useNavigate, useParams} from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import request from "../../api/request";

const CategoryStore = () => {
    const categoryId = useParams().categoryId;
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const handleChange = (e) => {
        const dataNew = {...categoryData, [e.target.name]: e.target.value}
        setCategoryData(dataNew);
    };
    const setValueDefault = (attribute) => {
        return (categoryData) ? (categoryData[attribute]) : '';
    }
    // Get default data when update
    const getCategoryById = async () => {
        await request.getCategoryById(categoryId)
            .then((response) => {
                setCategoryData(response.data.data[0]);
            })
            .catch(error => {
                console.log('Error getCategoryList: ' + error.message);
            });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (categoryId) {
            // UPDATE
            await request.categoryUpdate(categoryData)
                .then((response) => {
                    if (response.data.success) {
                        alert(response.data.data.message);
                        navigate('/admin/category/list');
                    }
                })
                .catch(error => {
                    console.log('Error update Category: ' + error.message);
                })
        } else {
            // Insert
            await request.categoryNew(categoryData)
                .then((response) => {
                    if (response.data.success) {
                        alert(response.data.data.message);
                        navigate('/admin/category/list');
                    }
                })
                .catch(error => {
                    console.log('Error add Category: ' + error.message);
                })
        }
    }
    useEffect(() => {
        if (categoryId) {
            getCategoryById(categoryId)
        }
    }, []);
    return (
        <DefaultLayout>
            <Breadcrumb pageName={categoryId ? 'Update Category' : 'New Category'}/>
            {/* <!-- Contact Form --> */}
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        {categoryId ? 'Category ' + categoryId : 'New Category'}
                    </h3>
                </div>
                <form action="#"
                      method='post'
                      onSubmit={handleSubmit}
                >
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white" htmlFor={'name'}>
                                Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                id='name'
                                name='name'
                                onChange={handleChange}
                                defaultValue={setValueDefault('name')}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Enter description"
                                id={'description'}
                                name={'description'}
                                onChange={handleChange}
                                defaultValue={setValueDefault('description')}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>
                        <div className="mb-5.5 flex justify-end gap-4.5">
                            <Link to={'/admin/category/list'}
                                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className=" rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CategoryStore;
