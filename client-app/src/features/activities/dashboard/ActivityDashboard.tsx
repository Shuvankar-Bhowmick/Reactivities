import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  submitting: boolean;
  onHandleDeleteActivity: (id: string) => void;
}

export default observer(function ActivityDashboard({
  activities,
  submitting,
  onHandleDeleteActivity,
}: Props) {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <GridColumn width="10">
        <List>
          <ActivityList
            activities={activities}
            handleDeleteActivity={onHandleDeleteActivity}
            submitting={submitting}
          />
        </List>
      </GridColumn>
      <GridColumn width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </GridColumn>
    </Grid>
  );
});
