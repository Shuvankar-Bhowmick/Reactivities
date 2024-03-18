import Calendar from "react-calendar";
import { Header, Menu, MenuItem } from "semantic-ui-react";

export default function ActivityFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 27 }}>
        <Header icon="filter" color="teal" content="Filters" attached />
        <MenuItem>All activities.</MenuItem>
        <MenuItem>I'm going.</MenuItem>
        <MenuItem>I'm hosting.</MenuItem>
      </Menu>
      <Header />
      <Calendar></Calendar>
    </>
  );
}
