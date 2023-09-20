// create mobx store
import {makeAutoObservable, observable} from 'mobx';
import axios from 'axios';
import ApiClient from './Main.api';
import {persist} from 'mobx-persist';

export class MainStore {
  // Driver Data
  driverId: any = "675049d7-664b-4ac9-b3b3-407df5bcc3b3";
  // Order Data
  @persist @observable onGoingOrder: boolean = false;
  @persist @observable currentOrderStatus = 'standby';
  @persist('object') @observable currentOrderData: any = null;
  currentOrderLoading: boolean = false;
  currentOrderError: any = null;
  // Order Status
  orderStatusData: any = null;
  orderStatusLoading: boolean = false;
  orderStatusError: any = null;
  // Current Order
  getCurrentOrderLoading: boolean = false;
  getCurrentOrderError: any = null;
  getCurrentOrderData: any = null;
  // Verify Otp
  verifyOtpLoading: boolean = false;
  verifyOtpError: any = null;
  verifyOtpData: any = null;
  // Receipt Data
  receiptImage: any = null;
  receiptBase64: any = null;
  // Upload Receipt
  uploadReceiptLoading: boolean = false;
  uploadReceiptError: any = null;
  uploadReceiptData: any = null;
  // Rating User
  ratingUserLoading: boolean = false;
  ratingUserError: any = null;
  ratingUserData: any = null;
  // History Order
  historyOrderLoading: boolean = false;
  historyOrderError: any = null;
  historyOrderData: any = null;
  // fcm token
  fcmToken = null;
  saveFcmTokenLoading: boolean = false;
  saveFcmTokenError: any = null;
  saveFcmTokenData: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Action
  setFcmToken = (token: any) => {
    this.fcmToken = token;
  };

  setCurrentOrderStatus = (status) => {
    this.currentOrderStatus = status;
  };

  setCurentOrderData = (data: any) => {
    this.currentOrderData = data;
  };

  setOnGoingOrder = (status: boolean) => {
    this.onGoingOrder = status;
  };

  setDriverId = (id: any) => {
    this.driverId = id;
  };

  setReceiptImage = (image: any, base64: any) => {
    this.receiptImage = image;
    this.receiptBase64 = base64;
  };

  async postChangeStatus(data: any) {
    this.orderStatusLoading = true;
    try {
      const response = await axios.post(ApiClient.apiPostChangeStatus(), data);
      if (response.data.code === 200) {
        console.log('POST CHANGE STATUS SUCCESS', response.data.data);
        this.postChangeStatusSuccess(response.data.data);
        if (data.orders.status === 4) {
          this.setCurrentOrderStatus('accepted');
        } else if (data.orders.status === 5) {
          this.setCurrentOrderStatus('delivery');
        } else if (data.orders.status === 6) {
          this.setCurrentOrderStatus('completed');
        }
      } else {
        console.error('POST CHANGE STATUS FAILED', response.data);
        this.onGoingOrder = false;
        this.postChangeStatusError(response.data);
      }
    } catch (error) {
      console.log('POST CHANGE STATUS ERROR', error);
      this.postChangeStatusError(error);
    } finally {
      this.orderStatusLoading = false;
    }
  }

  async postChangeStatusPickyuq(data) {
    this.orderStatusLoading = true;
    try {
      const response = await axios.post(ApiClient.apiPostChangeStatusPickyuq(), data);
      // console.log('pickyuq accept response', response);
      if (response.data.code === 200) {
        this.postChangeStatusSuccess(response.data.data);
        if (data.orders.status === 2) {
          this.setCurrentOrderStatus('accepted');
        } else if (data.orders.status === 3) {
          this.setCurrentOrderStatus('pickup');
        } else if (data.orders.status === 4) {
          this.setCurrentOrderStatus('delivery');
        } else if (data.orders.status === 5) {
          this.setCurrentOrderStatus('completed');
        }
      } else {
        this.onGoingOrder = false;
        this.postChangeStatusError(response.data);
      }
    } catch (error) {
      this.postChangeStatusError(error);
    } finally {
      this.orderStatusLoading = false;
    }
  }

  postChangeStatusSuccess = (data: any) => {
    this.orderStatusData = data;
  };

  postChangeStatusError = (error: any) => {
    this.orderStatusError = error;
  };

  async getCurrentOrder() {
    this.getCurrentOrderLoading = true;
    try {
      const response = await axios.get(
        ApiClient.apiGetCurrentOrder(this.driverId),
      );
      if (response.data.code === 200) {
        console.log('GET CURRENT ORDER SUCCESS', response.data.data);
        this.getCurrentOrderSuccess(response.data.data);
      } else {
        console.error('GET CURRENT ORDER FAILED', response.data);
        this.getCurrentOrderFailed(response.data);
      }
    } catch (error) {
      console.log('GET CURRENT ORDER ERROR', error);
      this.getCurrentOrderFailed(error);
    } finally {
      this.getCurrentOrderLoading = false;
    }
  }

  getCurrentOrderSuccess = (data: any) => {
    this.getCurrentOrderData = data;
  };

  getCurrentOrderFailed = (error: any) => {
    this.getCurrentOrderError;
  };

  async postVerifyOtp(dataOtp: any) {
    this.verifyOtpLoading = true;
    try {
      const data = {
        drivers_id: this.driverId,
        orders: {
          transactions_id: dataOtp.transactions_id,
          OTP: dataOtp.otpCode,
        },
      };
      console.log('POST VERIFY OTP', data);
      const response = await axios.post(ApiClient.apiPostVerifyOtp(), data);
      if (response.data.code === 200) {
        console.log('POST VERIFY OTP SUCCESS', response.data);
        this.postVerifyOtpSuccess(response.data);
      } else {
        console.error('POST VERIFY OTP FAILED', response.data);
        this.postVerifyOtpFailed(response.data);
      }
    } catch (error) {
      console.log('POST VERIFY OTP ERROR', error);
      this.postVerifyOtpFailed(error);
    } finally {
      this.verifyOtpLoading = false;
    }
  }

  postVerifyOtpSuccess = (data: any) => {
    this.verifyOtpData = data;
  };

  postVerifyOtpFailed = (error: any) => {
    this.verifyOtpError = error;
  };

  async postUploadReceipt(transactionId: any) {
    this.uploadReceiptLoading = true;
    try {
      const data = {
        drivers_id: this.driverId,
        orders: {
          transactions_id: transactionId,
          pictures: this.receiptBase64,
          type: 1,
        },
      };
      const response = await axios.post(ApiClient.apiPostUploadReceipt(), data);
      if (response.data.code === 200) {
        console.log('POST UPLOAD RECEIPT SUCCESS', response.data);
        this.postUploadReceiptSuccess(response.data);
      } else {
        console.error('POST UPLOAD RECEIPT FAILED', response.data);
        this.postUploadReceiptFailed(response.data);
      }
    } catch (error) {
      console.log('POST UPLOAD RECEIPT ERROR', error);
      this.postUploadReceiptFailed(error);
    } finally {
      this.uploadReceiptLoading = false;
    }
  }

  postUploadReceiptSuccess = (data: any) => {
    this.uploadReceiptData = data;
  };

  postUploadReceiptFailed = (error: any) => {
    this.uploadReceiptError = error;
  };

  async postRatingUser(data: any) {
    this.ratingUserLoading = true;
    try {
      const dataForm = {
        drivers_id: this.driverId,
        transactions_id: data.transactionId,
        ratings: data.rating,
        notes: data.note ?? '',
      };
      const response = await axios.post(
        ApiClient.apiPostRatingUser(),
        dataForm,
      );
      if (response.data.code === 200) {
        console.log('POST RATING USER SUCCESS', response.data);
        this.postRatingUserSuccess(response.data.data);
      } else {
        console.error('POST RATING USER FAILED', response.data);
        this.postRatingUserFailed(response.data);
      }
    } catch (error) {
      console.log('POST RATING USER ERROR', error);
      this.postRatingUserFailed(error);
    } finally {
      this.ratingUserLoading = false;
    }
  }

  postRatingUserSuccess = (data: any) => {
    this.ratingUserData = data;
  };

  postRatingUserFailed = (error: any) => {
    this.ratingUserError = error;
  };

  async getHistoryOrder(data) {
    this.historyOrderLoading = true;
    try {
      const response = await axios.get(
        ApiClient.apiGetHistoryOrder(data.driverId, data.start, data.end),
      );
      if (response.data.code === 200) {
        console.log('GET HISTORY ORDER SUCCESS', response.data);
        this.getHistoryOrderSuccess(response.data.data);
      } else {
        console.error('GET HISTORY ORDER FAILED', response.data);
        this.getHistoryOrderFailed(response.data);
      }
    } catch (error) {
      console.log('GET HISTORY ORDER ERROR', error);
      this.getHistoryOrderFailed(error);
    } finally {
      this.historyOrderLoading = false;
    }
  }

  getHistoryOrderSuccess = (data: any) => {
    this.historyOrderData = data;
  };

  getHistoryOrderFailed = (error: any) => {
    this.historyOrderError = error;
  };

  async postSaveFcmToken(dataFcm: any) {
    this.saveFcmTokenLoading = true;
    try {
      const data = {
        drivers_id: dataFcm.driverId,
        tokens: {
          tokens: this.fcmToken,
          type: 2,
        },
      };
      const response = await axios.post(ApiClient.apiSaveToken(), data);
      if (response.data.code === 200) {
        console.log('POST SAVE FCM TOKEN SUCCESS', response.data);
        this.postSaveFcmTokenSuccess(response.data);
      } else {
        console.error('POST SAVE FCM TOKEN FAILED', response.data);
        this.postSaveFcmTokenFailed(response.data);
      }
    } catch (error) {
      console.error('POST SAVE FCM TOKEN FAILED', error);
      this.postSaveFcmTokenFailed(error);
    } finally {
      this.saveFcmTokenLoading = false;
    }
  }

  postSaveFcmTokenSuccess = (data: any) => {
    this.saveFcmTokenData = data;
  };

  postSaveFcmTokenFailed = (error: any) => {
    this.saveFcmTokenError = error;
  };

  clearRatingUser() {
    this.ratingUserData = null;
    this.ratingUserError = null;
  }

  clearReceiptImage = () => {
    this.receiptImage = null;
    this.receiptBase64 = null;
  };

  clearPostUploadReceipt = () => {
    this.uploadReceiptData = null;
    this.uploadReceiptError = null;
    this.clearReceiptImage();
  };

  clearVerifyOtpData = () => {
    this.verifyOtpData = null;
  };

  clearMainStore = () => {
    this.clearVerifyOtpData();
    this.clearReceiptImage();
    this.uploadReceiptData = null;
  };
}
