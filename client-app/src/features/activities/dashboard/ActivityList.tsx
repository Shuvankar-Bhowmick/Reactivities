import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemGroup,
  ItemHeader,
  ItemMeta,
  Label,
  Segment,
} from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { activitiesByDate, deleteActivity, loading } = activityStore;
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <ItemGroup divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <ItemContent>
              <ItemHeader as="a">{activity.title}</ItemHeader>
              <ItemMeta>{activity.date}</ItemMeta>
              <ItemDescription>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}.
                </div>
              </ItemDescription>
              <ItemExtra>
                <Button
                  as={Link}
                  /* can also write */
                  // to={activity.id} // Relative route
                  to={`/activities/${activity.id}`} // Absolute route
                  floated="right"
                  color="blue"
                >
                  View
                </Button>
                <Button
                  name={activity.id}
                  floated="right"
                  color="red"
                  loading={loading && activity.id === target}
                  onClick={e => handleActivityDelete(e, activity.id)}
                >
                  Delete
                </Button>
                <Label basic>{activity.category}</Label>
              </ItemExtra>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
});
