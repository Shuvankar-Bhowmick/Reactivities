import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7rem" }}>
        <Outlet />
      </Container>
    </>
  );
}
// Makes App component an observer so that we can observe the observables
// Vite doesn't support HMR for class components and we're using a class in activityStore.ts
export default observer(App);
