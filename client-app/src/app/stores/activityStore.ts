/* MobX is mutable so don't confuse this with redux. We can mutate the state directly here. */

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

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

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activites.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activites.update(activity);
      runInAction(() => {
        this.activities = [
          ...this.activities.filter(a => a.id !== activity.id),
          activity,
        ];
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
