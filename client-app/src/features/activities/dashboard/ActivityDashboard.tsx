import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  onHandleSelectedActivity: (id: string) => void;
  onHandleCancelSelectedActivity: () => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  onHandleSelectedActivity: handleSelectedActivity,
  onHandleCancelSelectedActivity: handleCancelSelectedActivity,
}: Props) {
  return (
    <Grid>
      <GridColumn width="10">
        <List>
          <ActivityList
            handleSelectedActivity={handleSelectedActivity}
            activities={activities}
          />
        </List>
      </GridColumn>
      <GridColumn width="6">
        {selectedActivity && (
          <ActivityDetails
            handleCancelSelectedActivity={handleCancelSelectedActivity}
            activity={selectedActivity}
          />
        )}
        <ActivityForm />
      </GridColumn>
    </Grid>
  );
}
