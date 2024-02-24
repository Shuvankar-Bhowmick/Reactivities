import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  handleCancelSelectedActivity: () => void;
}

export default function ActivityDetails({
  activity,
  handleCancelSelectedActivity,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <ButtonGroup widths="3">
          <Button basic color="blue">
            Edit
          </Button>
          <Button basic color="grey" onClick={handleCancelSelectedActivity}>
            Cancel
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
