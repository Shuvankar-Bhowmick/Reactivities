// this file contains all of our requests that go to our API
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/Routes";

const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

// axios interceptors (one of the most important features of axios).
axios.interceptors.response.use(
  async response => {
    await sleep(1000);
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];

          for (const key in data.errors) {
            if (data.errors[key]) modalStateErrors.push(...data.errors[key]);
          }
          throw modalStateErrors;
        } else toast.error(data);
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        toast.error("server error");
        break;
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activites = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>(`/activities`, activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`activities/${id}`),
};

const agent = {
  Activites,
};

export default agent;
