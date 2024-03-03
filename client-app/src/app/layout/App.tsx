import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activites.list().then(response => {
      const activities: Activity[] = response.map(activity => {
        const date = activity.date.split("T")[0];
        return { ...activity, date };
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

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

  function handleDeleteActivity(id: string) {
    if (selectedActivity?.id === id) handleCancelSelectedActivity();

    setActivities(activities.filter(x => x.id !== id));
  }
  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar onFormOpen={handleFormOpen} />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          onCreateOrEditActivity={handleCreateOrEditActivity}
          activities={activities}
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

export default App;
