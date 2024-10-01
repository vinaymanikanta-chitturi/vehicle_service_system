import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your backend URL if different

export const getComponents = () => axios.get(`${API_URL}/components/`);
export const getVehicles = () => axios.get(`${API_URL}/vehicles/`);
export const getIssues = () => axios.get(`${API_URL}/issues/`);
export const getServices = () => axios.get(`${API_URL}/services/`);
export const getRevenue = () => axios.get(`${API_URL}/revenue/`);
export const createComponent = (data) => axios.post(`${API_URL}/components/`, data);
export const createVehicle = (data) => axios.post(`${API_URL}/vehicles/`, data);
export const createIssue = (data) => axios.post(`${API_URL}/issues/`, data);
export const createService = (data) => axios.post(`${API_URL}/services/`, data);