import { Message } from "semantic-ui-react";

interface Props {
  errors: string[];
}

export const ValidationError = ({ errors }: Props) => {
  console.log(errors);
  return (
    <Message error>
      <Message.List>
        {errors.map((err: string, i) => (
          <Message.Item key={i}>{err}</Message.Item>
        ))}
      </Message.List>
    </Message>
  );
};
