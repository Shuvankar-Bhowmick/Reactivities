import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  onFormOpen: (id?: string | undefined) => void;
}

export default function NavBar({ onFormOpen }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="./assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => onFormOpen(undefined)}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
