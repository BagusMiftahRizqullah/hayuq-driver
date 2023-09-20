import axios from 'axios';
import {backendApiURL} from '@config';

export const apiChangeBankAccount = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/update/bank',
    data,
  });
};

export const apiChangeVehicleInfo = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/update/vehicle',
    data,
  });
};

export const apiChangePhoneNumber = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/update/phone',
    data,
  });
};

export const apiChangeEmail = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/update/email',
    data,
  });
};

export const apiDeleteAccount = (data) => {
  const {driverId, notes, token} = data;
  return axios({
    method: 'DELETE',
    url: backendApiURL + `/account?drivers_id=${driverId}&notes=${notes}`,
    headers: {
      Authorization: token,
    },
  });
};
