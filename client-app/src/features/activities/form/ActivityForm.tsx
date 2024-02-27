import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Segment,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  activity: Activity | undefined;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: Activity) => void;
}

export default function ActivityForm({
  activity: selectedActivity,
  onFormClose,
  onCreateOrEditActivity,
}: Props) {
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
    onCreateOrEditActivity(activity);
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
        <Button floated="right" positive type="submit">
          Submit
        </Button>
        <Button floated="right" type="button" onClick={onFormClose}>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}
