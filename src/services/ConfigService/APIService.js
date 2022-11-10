import React from 'react'
import axios from 'axios';

export const baseURL = "https://chilling-crypt-20162.herokuapp.com/api/v1";
const ApiService = (configuration = {}) => {

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
            return config;
        },
        error => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        },
    );

    return axiosInstance;

}
export default ApiService;