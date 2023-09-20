import axios from 'axios';
import CONFIG, {backendApiURL, backendApiURLUSER} from '@config';

export const apiGetDriverDetail = (drivers_id) => {
  return axios({
    method: 'GET',
    url: backendApiURL + `/account/details?drivers_id=${drivers_id}`,
  });
};

export const apiUpdateDriverLocation = (data) => {
  return axios({
    method: 'POST',
    url: backendApiURL + `/location/create`,
    data,
  });
};

export const apiDriverGoingOffline = (drivers_id) => {
  return axios({
    method: 'POST',
    url: backendApiURL + `/location/delete`,
    data: {
      drivers_id,
    },
  });
};

export const apiGetDriverStatus = (drivers_id) => {
  return axios({
    method: 'GET',
    url: backendApiURL + `/location/detail?drivers_id=${drivers_id}`,
  });
};

const apiPostChangeStatus = () => {
  return `${CONFIG.portOrder}/status`;
};

const apiPostChangeStatusPickyuq = () => {
  return `${CONFIG.portOrder}/status-ride`
}

const apiGetCurrentOrder = (DRIVER_ID) => {
  return `${CONFIG.portOrder}/currents?drivers_id=${DRIVER_ID}`;
};

const apiPostVerifyOtp = () => {
  return `${CONFIG.portOrder}/verify`;
};

const apiPostUploadReceipt = () => {
  return `${CONFIG.portOrder}/upload`;
};

const apiPostRatingUser = () => {
  return `${CONFIG.portPerfomance}/ratings/create-for-user`;
};

export const apiGetRewardPoint = (data) => {
  const { drivers_id, start, end } = data;
  return axios({
    method: 'GET',
    url: `${CONFIG.portPerfomance}/reward/score?drivers_id=${drivers_id}&start=${start}&end=${end}`,
  });
};


const apiGetHistoryOrder = (DRIVER_ID, start_date, end_date) => {
  console.log(
    `API GET HISTORRY ORDER ${backendApiURLUSER}/transaction/list-history?drivers_id=${DRIVER_ID}&start_date=${start_date}&end_date=${end_date}`,
  );
  return `${backendApiURLUSER}/transaction/list-history?drivers_id=${DRIVER_ID}&start_date=${start_date}&end_date=${end_date}`;
};

const apiSaveToken = () => {
  return `${backendApiURL}/auth/tokens`;
};

export const apiSuspendAccount = (driverId) => {
  return axios({
    method: 'GET',
    url: backendApiURL + `/account/auto-suspend?drivers_id=${driverId}`,
  });
}

export default {
  apiPostChangeStatus,
  apiGetCurrentOrder,
  apiPostVerifyOtp,
  apiPostUploadReceipt,
  apiPostRatingUser,
  apiGetHistoryOrder,
  apiSaveToken,
  apiPostChangeStatusPickyuq,
};
