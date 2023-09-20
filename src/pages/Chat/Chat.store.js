// create mobx store
import {makeAutoObservable, observable} from 'mobx';

export class ChatStore {
  @observable dataChat = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Action
  setDataChat = (data) => {
    this.dataChat = data
  }

  addNewChat = (data) => {
    this.dataChat = data
  }
}
