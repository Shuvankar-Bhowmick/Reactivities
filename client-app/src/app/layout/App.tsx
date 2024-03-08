import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find(a => a.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    console.log(id);
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity(); // is equivalent to if (id) handleSelectedActivity(id), id is NEVER null
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  async function handleCreateOrEditActivity(activity: Activity) {
    /* using uuid() for generating a random Guid for our id property */
    setSubmitting(true);
    if (activity.id) {
      try {
        await agent.Activites.update(activity);
        setActivities([
          ...activities.filter(x => x.id !== activity.id),
          activity,
        ]);
      } catch (error) {
        console.log("Error" + error);
      }
    } else {
      try {
        activity.id = uuid();
        await agent.Activites.create(activity);
        setActivities([...activities, activity]);
      } catch (error) {
        console.log("Error: " + error);
      }
    }
    setEditMode(false);
    setSelectedActivity(activity);
    setSubmitting(false);
  }

  async function handleDeleteActivity(id: string) {
    setSubmitting(true);
    await agent.Activites.delete(id);
    setActivities(activities.filter(x => x.id !== id));
    setSubmitting(false);

    if (selectedActivity?.id === id) handleCancelSelectedActivity();
  }
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar onFormOpen={handleFormOpen} />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          onCreateOrEditActivity={handleCreateOrEditActivity}
          activities={activityStore.activities}
          selectedActivity={selectedActivity}
          onHandleSelectedActivity={handleSelectedActivity}
          onHandleCancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          onFormOpen={handleFormOpen}
          onFormClose={handleFormClose}
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
