import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import ApiClient from './Peformance.api';

export class PeformanceStore {
  dataPeformanceTNC = null;
  getPeformanceTNCLoading = false;
  getPeformanceTNCError = null;

  constructor() {
    makeAutoObservable(this);
  }
  // RATING COUNT
  async getPeformanceTNC() {
    this.getPeformanceTNCLoading = true;

    try {
      const response = await axios.get(
        ApiClient.apiGetPeformanceRules(),
      );
      console.log('res PeformanceTNC',response);
      if (response.data.data) {
        console.log('GET PeformanceTNC SUCCESS', response.data.data);
        this.getPeformanceTNCSuccess(response.data.data ?? response.data.data.data);
      } else {
        console.error('GET PeformanceTNC FAILED', response.data);
        this.getPeformanceTNCErrors(response.data);
      }
    } catch (error) {
      console.log('GETPeformanceTNC ERROR', error);
      this.getPeformanceTNCErrors(error);
    } finally {
      this.getPeformanceTNCLoading = false;
    }
  }

  getPeformanceTNCSuccess = (data: any) => {
    this.dataPeformanceTNC = data;
  };

  getPeformanceTNCErrors = (error: any) => {
    this.dataPeformanceTNC = error;
    this.getPeformanceTNCError = error;
  };
  // end of getPeformanceTNC
}
