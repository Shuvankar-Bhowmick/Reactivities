import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Segment,
} from "semantic-ui-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    closeForm,
    selectedActivity,
    loading,
    createActivity,
    updateActivity,
  } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    activity.id ? updateActivity(activity) : createActivity(activity);
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
        <Button floated="right" type="button" onClick={closeForm}>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
});
