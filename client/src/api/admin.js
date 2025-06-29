import axios from 'axios';
import { SERVER_ADMIN_URL } from '../constants/urls';

/*──────── Service CRUD ────────*/
export const getServices  = () => axios.get(`${SERVER_ADMIN_URL}/service/get-services`);
export const getService   = (id) => axios.get(`${SERVER_ADMIN_URL}/service/get-service/${id}`);
export const addService   = (data, token) =>
  axios.post(`${SERVER_ADMIN_URL}/service/add`, data, {
    headers: { authorization: `admin ${token}` },
  });
export const deleteService = (token, id) =>
  axios.delete(`${SERVER_ADMIN_URL}/service/delete-service/${id}`, {
    headers: { authorization: `admin ${token}` },
  });

/*──────── Auth & Dash ────────*/
export const adminLogin = (data) => axios.post(`${SERVER_ADMIN_URL}/login`, data);
export const getBookings  = (token) => axios.get(`${SERVER_ADMIN_URL}/get-bookings`,  { headers: { authorization: `admin ${token}` }});
export const getEnquiries = (token) => axios.get(`${SERVER_ADMIN_URL}/get-enquiries`, { headers: { authorization: `admin ${token}` }});
export const deleteEnquiry= (token,id)=>axios.delete(`${SERVER_ADMIN_URL}/delete-enquiry/${id}`,{headers:{authorization:`admin ${token}`}});

/*──────── Trending & Carousel ────────*/
export const getTrending = () => axios.get(`${SERVER_ADMIN_URL}/service/get-trending`);
export const addCarousel = (data, token) => axios.post(`${SERVER_ADMIN_URL}/add-carousel`, data, { headers:{authorization:`admin ${token}`}});
export const getCarousel = () => axios.get(`${SERVER_ADMIN_URL}/get-carousel`);
export const deleteCarousel = (token,id)=>axios.delete(`${SERVER_ADMIN_URL}/delete-carousel/${id}`,{headers:{authorization:`admin ${token}`}});

/*──────── Advertisement Banner ────────*/
export const addAdvtBanner = (data, token)=>axios.post(`${SERVER_ADMIN_URL}/advt`, data,{headers:{authorization:`admin ${token}`}});
export const getAdvtBanner = () => axios.get(`${SERVER_ADMIN_URL}/advt`);
export const deleteAdvtBanner = (token,id)=>axios.delete(`${SERVER_ADMIN_URL}/advt/${id}`,{headers:{authorization:`admin ${token}`}});

/*──────── Create‑Own (Destinations & Prices) ────────*/
const DEST_BASE = `${SERVER_ADMIN_URL}/service/create-own`;

export const addDestination = (data, token)=>
  axios.post(DEST_BASE, data, { headers:{authorization:`admin ${token}`}});

export const getDestinations = () => axios.get(DEST_BASE);

export const getPrices  = () => axios.get(`${DEST_BASE}/price`);
export const updatePrices = (prices, token)=>
  axios.post(`${DEST_BASE}/price`, prices, { headers:{authorization:`admin ${token}`}});

export const getCustoms = (token)=>
  axios.get(`${DEST_BASE}/custom`, { headers:{authorization:`admin ${token}`}});
