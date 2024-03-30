import { ServerError } from "../models/serverError";
import { makeAutoObservable } from "mobx";
// for things that don't belong to a particular feature
export default class CommonStore {
  //   observables
  error: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // actions
  setServerError(error: ServerError) {
    this.error = error;
  }
}
