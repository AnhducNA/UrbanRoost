import React, {useEffect, useRef, useState} from "react"
import {NavLink, useLocation} from "react-router-dom"
import SidebarLinkGroup from "./SidebarLinkGroup"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faBook,
    faGauge,
    faLocationDot, faStar,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
    const location = useLocation()
    const {pathname} = location
    const trigger = useRef(null)
    const sidebar = useRef(null)

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded")
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    )

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}) => {
            if (!sidebar.current || !trigger.current) return
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setSidebarOpen(false)
        }
        document.addEventListener("click", clickHandler)
        return () => document.removeEventListener("click", clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}) => {
            if (!sidebarOpen || keyCode !== 27) return
            setSidebarOpen(false)
        }
        document.addEventListener("keydown", keyHandler)
        return () => document.removeEventListener("keydown", keyHandler)
    })

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded")
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded")
        }
    }, [sidebarExpanded])

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/">
                    <h1 className="text-3xl font-bold text-white text-center">UrbanRoost</h1>
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- END SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Dashboard --> */}
                            <li>
                                <NavLink
                                    to="/admin/dashboard"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                        "/" ||
                                        pathname.includes("dashboard")) &&
                                    "bg-graydark dark:bg-meta-4"}`}

                                >
                                    <FontAwesomeIcon icon={faGauge} className="fill-current" fontSize={18}/>
                                    Dashboard
                                </NavLink>
                            </li>
                            {/* <!-- End Menu Item Dashboard --> */}

                            {/* <!-- Menu Item Place --> */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/place" || pathname.includes("place")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="admin/place/list"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
                                                ${(pathname === "/place" || pathname.includes("place")) && "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faLocationDot} fontSize={18}/>
                                                Place
                                                <FontAwesomeIcon icon={faAngleDown}
                                                                 className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                                 "rotate-180"}`} fontSize={20}/>

                                            </NavLink>
                                            {/* <!-- Dropdown Menu Start --> */}
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/place/list"
                                                            className={({isActive}) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Table Places
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/place/new"
                                                            className={({isActive}) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Place
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <!-- Dropdown Menu End --> */}
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            {/* <!-- End Menu Item Place --> */}

                            {/* <!-- Menu Item Booking --> */}
                            <li>
                                <NavLink
                                    to="/admin/booking/list"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                                        "booking"
                                    ) && "bg-graydark dark:bg-meta-4"}`}
                                >
                                    <FontAwesomeIcon icon={faBook} fontSize={18}/>
                                    Booking
                                </NavLink>
                            </li>
                            {/* <!-- End Menu Item Booking --> */}

                            {/* <!-- Menu Item User --> */}
                            <li>
                                <NavLink
                                    to="/admin/user/list"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                                        "user"
                                    ) && "bg-graydark dark:bg-meta-4"}`}
                                >
                                    <FontAwesomeIcon icon={faUsers} fontSize={18}/>
                                    Users
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item User --> */}
                            {/* <!-- Menu Item Profile --> */}
                            <li>
                                <NavLink
                                    to="/admin/rate/list"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                                        "rate"
                                    ) && "bg-graydark dark:bg-meta-4"}`}
                                >
                                    <FontAwesomeIcon icon={faStar} fontSize={18}/>
                                    Rate
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Profile --> */}
                        </ul>
                    </div>
                    {/* <!-- End Menu Group --> */}
                </nav>
                {/* <!-- End Sidebar Menu --> */}
            </div>
        </aside>
    )
}

export default Sidebar
