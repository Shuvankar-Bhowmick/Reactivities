import { Header, ItemGroup, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;
  const groupedActivitiesArray = Object.entries(groupedActivities);
  return (
    <>
      {groupedActivitiesArray.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          <Segment>
            <ItemGroup divided>
              {activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </ItemGroup>
          </Segment>
        </Fragment>
      ))}
    </>
  );
});
