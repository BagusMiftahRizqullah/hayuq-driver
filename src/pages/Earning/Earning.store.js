import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import ApiClient from './Earning.api';

export class EarningStore {
  earning = 0;
  getDriverRatingData = null;
  getDriverRatingLoading = false;
  getDriverRatingError = null;

  getDriverListRatingData = null;
  getDriverListRatingLoading = false;
  getDriverListRatingError = null;

  topUpDanaLoading = false;
  topUpDanaResponse = null;
  topUpDanaResponseError = null;

  getEarningData = null;
  getEarningLoading = false;
  getEarningError = null;

  constructor() {
    makeAutoObservable(this);
  }
  // RATING COUNT
  async getRatingCount(driverId: any) {
    this.getDriverRatingLoading = true;
    try {
      const response = await axios.get(ApiClient.apiGetCountRating(driverId));
      if (response.data.code === 200) {
        console.log('GET RATING COUNT SUCCESS', response.data.data);
        this.getRatingCountSuccess(response.data.data);
      } else {
        console.error('GET RATING COUNT FAILED', response.data);
        this.getRatingCountError(response.data);
      }
    } catch (error) {
      console.log('GET RATING COUNT ERROR', error);
      this.getRatingCountError(error);
    } finally {
      this.getDriverRatingLoading = false;
    }
  }

  getRatingCountSuccess = (data: any) => {
    this.getDriverRatingData = data;
  };

  getRatingCountError = (error: any) => {
    this.getDriverRatingError = error;
  };
  // end of RATING COUNT

  // LIST RATING COUNT
  async getListRatingCount(driverId: any) {
    this.getDriverListRatingLoading = true;
    try {
      const response = await axios.get(ApiClient.apiGetListRating(driverId));
      if (response.data.code === 200) {
        console.log('GET RATING LIST SUCCESS', response.data.data.list);
        this.getListRatingCountSuccess(response.data.data.list);
      } else {
        console.error('GET RATING LIST FAILED', response.data);
        this.getListRatingCountError(response.data);
      }
    } catch (error) {
      console.log('GET RATING LIST ERROR', error);
      this.getListRatingCountError(error);
    } finally {
      this.getDriverListRatingLoading = false;
    }
  }

  getListRatingCountSuccess = (data: any) => {
    this.getDriverListRatingData = data;
  };

  getListRatingCountError = (error: any) => {
    this.getDriverListRatingError = error;
  };
  // end of LIST RATING COUNT
  // GET EARNING
  async getEarning(data) {
    this.getEarningLoading = true;
    try {
      const response = await axios.get(
        ApiClient.apiGetEarning(data.driverId, data.start, data.end),
      );
      if (response.data.code === 200) {
        // console.log('GET EARNING SUCCESS', response.data.data);
        this.getEarningSuccess(response.data.data);
      } else if (response.data.code === 201) {
        console.log('GET EARNING SUCCESS', response.data);
        this.getEarningSuccess({
          list: [],
          total: 0,
        });
      } else {
        console.error('GET EARNING FAILED', response.data);
        this.getEarningFailed(response.data);
      }
    } catch (error) {
      console.log('GET EARNING ERROR', error);
      this.getEarningFailed(error);
    } finally {
      this.getEarningLoading = false;
    }
  }

  getEarningSuccess = (data: any) => {
    this.getEarningData = data;
  };

  getEarningFailed = (error: any) => {
    this.getEarningError = error;
  };

  // end of GET EARNING

  // Topup Dana
  async topUpDana (data){
    this.topUpDanaLoading = true
    try {
      const response = await axios({ method: 'POST', url: ApiClient.apiTopUpDana(), data })
      console.log('res topUp', response)
      if (response.data.code === 200) {
        this.topUpDanaResponse = response.data.data
      } else {
        this.topUpDanaResponseError = response
      }
    } catch (err) {
      this.topUpDanaResponseError = err
    } finally {
      this.topUpDanaLoading = false;
    }
  }
}
