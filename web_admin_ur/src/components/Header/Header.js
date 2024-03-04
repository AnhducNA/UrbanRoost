import React from 'react';
import {Link} from "react-router-dom";
import LogoIcon from '../../style/logo/logo-icon.svg';
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarcode, faBars, faSearch} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
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
                    <form action="#">
                        <div className="flex justify-between items-center">
                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                            />
                            <button className="">
                                <FontAwesomeIcon icon={faSearch} fontSize={20}/>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {/* <!-- Dark Mode Toggler --> */}
                        <DarkModeSwitcher/>
                        {/* <!-- Dark Mode Toggler --> */}

                        {/* <!-- Notification Menu Area --> */}
                        {/* <!-- Notification Menu Area --> */}

                        {/* <!-- Chat Notification Area --> */}
                        {/* <!-- Chat Notification Area --> */}
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
