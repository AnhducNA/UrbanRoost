import React, {useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../../utils";
import request from "../../api/request";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faListNumeric, faPhoneAlt, faUser, faUserLock} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
    // navigation
    const navigate = useNavigate();
    // Data User
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
    });

    const handleChange = (e) => {
        const dataNew = {...data, [e.target.name]: e.target.value}
        setData(dataNew);
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        // Check email
        if (!validateEmail(data.email)) {
            alert('Email không đúng định dạng');
            return;
        }
        // Check password
        if (validateEmail(data.email) && data.password.length < 6) {
            alert('Độ dài mật khẩu phải từ 6 ký tự trở lên');
            return;
        }
        // Check password
        if (data.password !== data.confirm_password) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }
        await request.authRegister(data)
            .then(response => {
                alert(response.data.message);
                if (response?.data?.success === true) {
                    navigate('/admin');
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Sign Up"/>

            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full xl:w-10/12">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Register to UrbanRoost
                            </h2>
                            <form>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name={'name'}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <FontAwesomeIcon icon={faUser} fontSize={22}/>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name={'email'}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <FontAwesomeIcon icon={faEnvelope} fontSize={22}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Phone
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="Enter your phone"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name={'phone'}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <FontAwesomeIcon icon={faPhoneAlt} fontSize={22}/>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name={'password'}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <FontAwesomeIcon icon={faUserLock} fontSize={22}/>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Re-type Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Re-enter your password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name={'confirm_password'}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <FontAwesomeIcon icon={faUserLock} fontSize={22}/>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <input
                                        type="submit"
                                        value="Create account"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                        onClick={handleRegister}
                                    />
                                </div>

                                <button
                                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                                    Sign up with Google
                                </button>

                                <div className="mt-6 text-center">
                                    <p>
                                        Already have an account?{' '}
                                        <Link to="/auth/register" className="text-primary">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Register;
