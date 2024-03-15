import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Segment,
} from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    loading,
    createActivity,
    updateActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const INIT = {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(INIT);

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent />;

  function handleSubmit() {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  }

  function handleOnChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setActivity(prev => ({ ...prev, [name]: value }));
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormInput
          name="title"
          placeholder="Title"
          value={activity.title}
          onChange={handleOnChange}
        ></FormInput>
        <FormTextArea
          placeholder="Description "
          name="description"
          value={activity.description}
          onChange={handleOnChange}
        ></FormTextArea>
        <FormInput
          placeholder="Category"
          name="category"
          value={activity.category}
          onChange={handleOnChange}
        ></FormInput>
        <FormInput
          name="date"
          type="date"
          placeholder="Date"
          value={activity.date}
          onChange={handleOnChange}
        ></FormInput>
        <FormInput
          name="city"
          placeholder="City"
          value={activity.city}
          onChange={handleOnChange}
        ></FormInput>
        <FormInput
          name="venue"
          placeholder="Venue"
          value={activity.venue}
          onChange={handleOnChange}
        ></FormInput>
        <Button loading={loading} floated="right" positive type="submit">
          Submit
        </Button>
        <Button as={Link} to="/activities" floated="right" type="button">
          Cancel
        </Button>
      </Form>
    </Segment>
  );
});
