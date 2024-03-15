import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Homepage from "../../features/home/Homepage";

function App() {
  const location = useLocation(); // returns the current location.

  return (
    <>
      {location.pathname === "/" ? (
        <Homepage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7rem" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}
// Makes App component an observer so that we can observe the observables
// Vite doesn't support HMR for class components and we're using a class in activityStore.ts
export default observer(App);
