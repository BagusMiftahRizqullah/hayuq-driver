import axios from 'axios';
import {backendApiURL} from '@config';

export const apiLogin = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/auth/login',
    data,
  });
};

export const apiRegister = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/auth/register',
    data,
  });
};

export const apiVerifyOtp = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/auth/verify',
    data,
  });
};

export const apiListDocumentRejected = (driverId) => {
  return axios({
    method: 'GET',
    url: backendApiURL + `/account/rejected-docs?drivers_id=${driverId}`
  })
}
