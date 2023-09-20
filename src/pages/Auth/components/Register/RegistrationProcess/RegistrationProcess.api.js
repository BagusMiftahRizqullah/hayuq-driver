import axios from 'axios';
import {backendApiURL} from '@config';

export const apiAddProfile = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/register/profile',
    data,
  });
};

export const apiAddIdCard = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/register/details',
    data,
  });
};

export const apiAddSkck = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/register/skck',
    data,
  });
};

export const apiAddBanks = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/register/bank',
    data,
  });
};

export const apiAddVehicle = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/register/vehicle',
    data,
  });
};

export const addLicenseDriving = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + '/account/register/license',
    data,
  });
};
