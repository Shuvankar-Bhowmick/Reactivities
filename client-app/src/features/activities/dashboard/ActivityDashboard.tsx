import { Grid, GridColumn, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, loadingInitial } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) {
      loadActivities();
    }
  }, [loadActivities, activityRegistry.size]);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <GridColumn width="10">
        <List>
          <ActivityList />
        </List>
      </GridColumn>
      <GridColumn width="6">
        <ActivityFilters />
      </GridColumn>
    </Grid>
  );
});
