import axios, { type AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:5173",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
};

const client = axios.create(axiosConfig);

export default client;