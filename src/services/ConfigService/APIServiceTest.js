import axios from 'axios';
import { CONFIGURATION } from 'Configuration';
import jwtDecode from 'jwt-decode';

const ApiServiceTest = (configuration = {}) => {

    const tokenUser = localStorage.getItem('token');
    let baseURL = '';
    let headers = {
        'Content-Type': 'application/json',
    };
    if (process.env.REACT_APP_WEB_ENV !== CONFIGURATION.environment.development) {
        baseURL = `${process.env.REACT_APP_API_URL}/${configuration.prefixDomain || CONFIGURATION.prefixDomain.main}/${process.env.REACT_APP_API_VERSION
            }`;
    } else {
        baseURL = `${process.env.REACT_APP_API_URL}/${configuration.prefixDomain || CONFIGURATION.prefixDomain.mainDev}`; //servicePaths.baseUrl;
        if (tokenUser) {
            const decoded = jwtDecode(tokenUser) || {};
            headers = {
                ...headers,
                'x-fjob-user-id': decoded.uid,
                'x-fjob-role': 'user',
                'x-fjob-user-code': decoded.userCode,
            };
        }
    }

    const axiosInstance  = axios.create({
        baseURL,
        timeout:10000,
        headers,
        ...configuration,
    })

    axiosInstance.interceptors.request.use(
        config => {
            if(tokenUser) {
                config.headers.Authorization = `Bearer ${tokenUser}`;
            }
            return config;
        },
        error => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if(error?.reponse?.status === 401) {
                console.log('error 401 -> token expired');
            }

            if (error?.response?.status === 503) {
                console.log('Something went wrong. Please try later!');
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

export default ApiServiceTest;