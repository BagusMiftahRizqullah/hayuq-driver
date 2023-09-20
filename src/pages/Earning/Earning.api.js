import { backendApiURLUSER, backendApiURL } from '@config';
import axios from 'axios';
import CONFIG from '@config';

const apiGetCountRating = (DRIVER_ID) => {
  return `${CONFIG.portPerfomance}/ratings/count?drivers_id=${DRIVER_ID}`;
};

const apiGetListRating = (DRIVER_ID) => {
  return `${CONFIG.portPerfomance}/ratings/list?drivers_id=${DRIVER_ID}&page=1&limit=100`;
};

const apiGetEarning = (DRIVER_ID, STARTDATE, ENDDATE) => {
  console.log(
    'performance=>>>>URL',
    `${CONFIG.portPerfomance}/earning/earnings?drivers_id=${DRIVER_ID}&start=${STARTDATE}&end=${ENDDATE}`,
  );
  return `${CONFIG.portPerfomance}/earning/earnings?drivers_id=${DRIVER_ID}&start=${STARTDATE}&end=${ENDDATE}`;
};

const apiGetEarningHistory = (DRIVER_ID, STARTDATE, ENDDATE) => {
  return `${CONFIG.portPerfomance}/earning/earnings-history?drivers_id=${DRIVER_ID}&start=${STARTDATE}&end=${ENDDATE}`;
};

const apiGetPeformanceRules = () => {
  return `${CONFIG.portPerfomance}/performance/rules/details`;
};

export const apiTopUpDana = (data) => {
  return axios({
    method: 'POST',
    url: `${backendApiURLUSER}/dana/top-up/drivers`,
    data
  })
};

export const apiGetHistoryTopUp = (params) => {
  const {driverId, startDate, endDate} = params
  return axios({
    method: 'GET',
    url: `${backendApiURLUSER}/wallet/list?drivers_id=${driverId}&start_date=${startDate}&end_date=${endDate}`
  })
}

export const apiWithdrawRequest = (data) => {
  return axios({
    method: 'POST',
    url: `${backendApiURL}/account/withdraws/request`,
    data,
  })
}

export default {
  apiGetCountRating,
  apiGetListRating,
  apiGetEarning,
  apiGetEarningHistory,
  apiGetPeformanceRules,
  apiWithdrawRequest,
};
