import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  submitting: boolean;
  onHandleSelectedActivity: (id: string) => void;
  onHandleCancelSelectedActivity: () => void;
  onFormOpen: (id: string) => void;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: Activity) => void;
  onHandleDeleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  submitting,
  onHandleSelectedActivity: handleSelectedActivity,
  onHandleCancelSelectedActivity: handleCancelSelectedActivity,
  editMode,
  onFormOpen,
  onFormClose,
  onCreateOrEditActivity,
  onHandleDeleteActivity,
}: Props) {
  return (
    <Grid>
      <GridColumn width="10">
        <List>
          <ActivityList
            handleSelectedActivity={handleSelectedActivity}
            activities={activities}
            handleDeleteActivity={onHandleDeleteActivity}
            submitting={submitting}
          />
        </List>
      </GridColumn>
      <GridColumn width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            handleCancelSelectedActivity={handleCancelSelectedActivity}
            activity={selectedActivity}
            onFormOpen={onFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            submitting={submitting}
            onCreateOrEditActivity={onCreateOrEditActivity}
            onFormClose={onFormClose}
            activity={selectedActivity}
          />
        )}
      </GridColumn>
    </Grid>
  );
}
