import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:3005/api/v1/`,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});