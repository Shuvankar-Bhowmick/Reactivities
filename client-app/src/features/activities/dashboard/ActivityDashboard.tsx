import { Grid, List, ListItem } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          {activities.map(activity => (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
}
