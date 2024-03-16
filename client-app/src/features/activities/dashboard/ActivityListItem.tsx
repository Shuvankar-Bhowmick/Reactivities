import { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemGroup,
  ItemHeader,
  ItemImage,
  ItemMeta,
  Label,
  Segment,
  SegmentGroup,
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
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage size="tiny" circular src="/assets/user.png" />
            <ItemContent>
              <ItemHeader as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </ItemHeader>
              <ItemDescription>Hosted by Bob</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {activity.date + " "}
          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          color="teal"
          floated="right"
          to={`/activities/${activity.id}`}
        >
          View
        </Button>
      </Segment>
    </SegmentGroup>
  );
}
