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
import { Activity } from "../../../app/models/activity";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";

interface Props {
  activities: Activity[];
  submitting: boolean;
  handleDeleteActivity: (id: string) => void;
}

export default function ActivityList({
  activities,
  submitting,
  handleDeleteActivity,
}: Props) {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    handleDeleteActivity(id);
  }

  return (
    <Segment>
      <ItemGroup divided>
        {activities.map(activity => (
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
                  floated="right"
                  color="blue"
                  onClick={() => {
                    if (!activityStore.editMode)
                      activityStore.selectActivity(activity.id);
                  }}
                >
                  View
                </Button>
                <Button
                  name={activity.id}
                  floated="right"
                  color="red"
                  loading={submitting && activity.id === target}
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
}
