/* MobX is mutable so don't confuse this with redux. We can mutate the state directly here. */

import { makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
  // Observables
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const response = await agent.Activites.list();

      /* Every step (tick) that updates observables in an asynchronous process should be marked as action. (docs)
      That can be done in two ways:
        1. Using runInAction() */
      // runInAction(() => {
      // this.activities = response.map(activity => {
      //   const date = activity.date.split("T")[0];
      //   return { ...activity, date };
      // });
      // });

      /* 2. Or we can simply modularise the different steps(ticks) inside separate actions of their own */
      this.setActivities(response);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  setActivities = (response: Activity[]) => {
    this.activities = response.map(activity => {
      const date = activity.date.split("T")[0];
      return { ...activity, date };
    });
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };
}
