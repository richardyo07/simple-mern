/** @format */

import axios from 'axios';
import { toast } from 'react-toastify';
import userService from './userService';

axios.defaults.headers.common['auth-token'] = userService.getJwt();

axios.interceptors.response.use(null, error => {
  const expectedError = !!error.response?.status;
  expectedError &&
    toast.error(`Unexpected error occurrred: ${error.response?.status}`);
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
