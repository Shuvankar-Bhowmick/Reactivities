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

interface Props {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
}

export default function ActivityList({
  activities,
  handleSelectedActivity,
  handleDeleteActivity,
}: Props) {
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
                  onClick={() => handleSelectedActivity(activity.id)}
                >
                  View
                </Button>
                <Button
                  floated="right"
                  color="red"
                  onClick={() => handleDeleteActivity(activity.id)}
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
