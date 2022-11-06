import axios from 'axios';
import { CONFIGURATION } from 'Configuration';
import jwtDecode from 'jwt-decode';

const ApiService = (configuration = {}) => {
    const tokenUser = localStorage.getItem('token');
    const expireTime = localStorage.getItem('fjob_admin_expireTime') ? parseInt(localStorage.getItem('fjob_admin_expireTime')) : 0;
    const getTimestampCurrent = + new Date();
    console.log(expireTime, getTimestampCurrent / 1000);
    const user = localStorage.getItem('user') ? localStorage.getItem('user') : '';
    const promise1 = new Promise((resolve, reject) => {
        resolve(user);
    });
    let deviceId = ""
    let userCode = ""

    promise1.then(value => {
        if (value) {
            deviceId = JSON.parse(value).deviceId;
            userCode = JSON.parse(value).userCode;
        }
    });
    const onLogoutClick = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenStaging');
        localStorage.removeItem('user');
        localStorage.removeItem('avatar');
        localStorage.removeItem('fjob_admin_expireTime');
        deviceId &&
            await ApiService.onLogout({
                deviceId,
                userCode,
            });
    };

    if (expireTime < getTimestampCurrent / 1000) {
        onLogoutClick()
    }
    let baseURL = 'https://chilling-crypt-20162.herokuapp.com/api/v1/'
    let headers = {
        'Content-Type': 'application/json',
    };    
    const axiosInstance = axios.create({
        baseURL,
        timeout: 10000,
        headers,
        ...configuration,
    });

    axiosInstance.interceptors.request.use(
        config => {
            if (tokenUser) {
                config.headers.Authorization = `Bearer ${tokenUser}`;
            }
            return config;
        },
        error => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error?.response?.status === 401) {
                console.log('error 401 -> token expired');
            }

            if (error?.response?.status === 503) {
                console.log('Something went wrong. Please try later!');
            }

            return Promise.reject(error);
        },
    );

    return axiosInstance;
};

export default ApiService;
