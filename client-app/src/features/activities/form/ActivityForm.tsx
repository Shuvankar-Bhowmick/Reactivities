import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Segment,
} from "semantic-ui-react";

export default function ActivityForm() {
  return (
    <Segment clearing>
      <Form>
        <FormInput placeholder="Title"></FormInput>
        <FormTextArea placeholder="Description "></FormTextArea>
        <FormInput placeholder="Category"></FormInput>
        <FormInput placeholder="Dates"></FormInput>
        <FormInput placeholder="City"></FormInput>
        <FormInput placeholder="Venue"></FormInput>
        <Button floated="right" positive type="submit">
          Submit
        </Button>
        <Button floated="right" type="button">
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}
