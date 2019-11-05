import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const baseURL = proxy + process.env.REACT_APP_SPOTIFY_URL + '/v1/browse';

const axiosInstance = axios.create({
  baseURL
});

Object.assign(axiosInstance.defaults, {headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}});

export default axiosInstance;
