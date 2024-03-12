import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  async function handleDeleteActivity(id: string) {
    setSubmitting(true);
    await agent.Activites.delete(id);
    setActivities(activities.filter(x => x.id !== id));
    setSubmitting(false);

    if (activityStore.selectedActivity?.id === id)
      activityStore.cancelSelectedActivity();
  }
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          onHandleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}
// Makes App component an observer so that we can observe the observables
// Vite doesn't support HMR for class components and we're using a class in activityStore.ts
export default observer(App);
