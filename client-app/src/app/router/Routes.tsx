import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import Homepage from "../../features/home/Homepage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Homepage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "createActivity", element: <ActivityForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
