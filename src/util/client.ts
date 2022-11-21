import axios, { type AxiosRequestConfig } from "axios";

const { CF_PAGES_URL } = process.env;

const axiosConfig: AxiosRequestConfig = {
    baseURL: CF_PAGES_URL,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
};

const client = axios.create(axiosConfig);

export default client;