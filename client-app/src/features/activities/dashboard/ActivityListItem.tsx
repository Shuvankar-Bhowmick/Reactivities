import { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemHeader,
  ItemMeta,
  Label,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
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
  );
}
