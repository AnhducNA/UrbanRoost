import React, {useState} from 'react';
import DefaultLayout from "../../layout/DefaultLayout";
import {Link, useNavigate} from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import request from "../../api/request";
import {validateEmail} from "../../utils";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const dataNew = {...data, [e.target.name]: e.target.value}
        setData(dataNew);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(data.email)) {
            alert('Email không hợp lệ');
            return;
        }
        if (validateEmail(data.email) && data.password.length < 6) {
            alert('Độ dài mật khẩu phải từ 6 ký tự trở lên');
            return;
        }
        await request.authLogin(data)
            .then(response => {
                alert(response.data.message);
                if (response?.data?.success === true) {
                    navigate('/admin')
                }
            })
            .catch(error => {
                console.log('Error Login' + error.message);
            })
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName={'Login'}/>
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full xl:w-10/12 ">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Login to UrbanRoost
                            </h2>
                            <form>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white"
                                           htmlFor={'email'}>
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={'email'}
                                            type="email"
                                            name={'email'}
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-4 top-4">
                                            <FontAwesomeIcon icon={faEnvelope} fontSize={22}/>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="6+ Characters, 1 Capital letter"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name={'password'}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute right-4 top-4">
                                        <FontAwesomeIcon icon={faLock} fontSize={22}/>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <input
                                        type="submit"
                                        value="Sign In"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                        onClick={handleLogin}
                                    />
                                </div>

                                <button
                                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                                    Sign in with Google
                                </button>

                                <div className="mt-6 text-center">
                                    <p>
                                        Don’t have any account?{' '}
                                        <Link to="/auth/register" className="text-primary">
                                            Register
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

export default Login;
