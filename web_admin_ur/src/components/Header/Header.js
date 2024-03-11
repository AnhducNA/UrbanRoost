import React, {useState} from 'react';
import {createSearchParams, Link, useNavigate} from "react-router-dom";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSearch} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    const navigate = useNavigate();
    const [searchData, setSearchData] =
        useState({'search_type': 'search_place', 'search_text': ''});
    const handleChange = (e) => {
        const newSearchData = {...searchData, [e.target.name]: e.target.value};
        setSearchData(newSearchData);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        switch (searchData.search_type) {
            case 'search_place':
                navigate({
                    pathname: '/admin/place/list',
                    search: '?' + createSearchParams({
                        search: searchData.search_text,
                    }).toString(),
                });
                break;
            case 'search_user':
                navigate({
                    pathname: '/admin/user/list',
                    search: '?' + createSearchParams({
                        search: searchData.search_text,
                    }).toString(),
                });
                break;
            case 'search_category':
                navigate({
                    pathname: '/admin/category/list',
                });
                break;
            default:
                break;
        }
    }
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- btn menu open sidebar when width < lg --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                    >
                        <span className=" block h-5.5 w-5.5 cursor-pointer">
                            <FontAwesomeIcon icon={faBars}/>
                        </span>
                    </button>
                    {/* <!-- btn logo when width < lg --> */}

                    <Link className="block flex-shrink-0 lg:hidden" to="/admin">
                        <strong>UR ADMIN</strong>
                    </Link>
                </div>
                <div className="hidden sm:block">
                    <form action="#"
                          onSubmit={handleSubmit}>
                        <div className="flex justify-between items-center">
                            <button className="">
                                <FontAwesomeIcon icon={faSearch} fontSize={20}/>
                            </button>
                            <input
                                type="text"
                                placeholder="Type to search..."
                                className=" bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                                name="search_text"
                                onChange={handleChange}
                            />
                            <div className="z-20 bg-transparent dark:bg-form-input">
                                <select
                                    className={` z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                    name='search_type'
                                    onChange={handleChange}
                                >
                                    <option value="search_place" className="text-body dark:text-bodydark">
                                        Search Place
                                    </option>
                                    <option value="search_user" className="text-body dark:text-bodydark">
                                        Search User
                                    </option>
                                    <option value="search_category" className="text-body dark:text-bodydark">
                                        Search Category
                                    </option>
                                </select>
                            </div>
                            {/*    End select group*/}
                        </div>
                    </form>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {/* <!-- Dark Mode Toggler --> */}
                        <DarkModeSwitcher/>
                        {/* <!-- Dark Mode Toggler --> */}
                    </ul>
                    {/* <!-- User Area --> */}
                    <DropdownUser/>
                    {/* <!-- User Area --> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
