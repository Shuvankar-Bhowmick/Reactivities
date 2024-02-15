import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List, ListItem } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h1" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
