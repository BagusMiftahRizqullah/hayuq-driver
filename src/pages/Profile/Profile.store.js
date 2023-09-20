import {makeAutoObservable} from 'mobx';
import axios from 'axios';

export class ProfileStore {
  webViewParam = '';

  constructor() {
    makeAutoObservable(this);
  }

  setWebViewParam = (param) => {
    this.webViewParam = param;
  };
}
