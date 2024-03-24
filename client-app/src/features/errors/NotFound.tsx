import { Link } from "react-router-dom";
import { Button, Header, Segment, SegmentInline } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon="search">
        Oops - we've looked everywhere but could not find what you are looking
        for! :(
      </Header>
      <SegmentInline>
        <Button as={Link} to="/acitivities">
          Return to activities page
        </Button>
      </SegmentInline>
    </Segment>
  );
}
