import { Navigation } from "./navigations";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export function Sidebar() {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
}
