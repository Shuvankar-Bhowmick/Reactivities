import { Grid, GridColumn, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <GridColumn width="10">
        <List>
          <ActivityList />
        </List>
      </GridColumn>
      <GridColumn width="6">
        <h2>Activity Filters</h2>
      </GridColumn>
    </Grid>
  );
});
