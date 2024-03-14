import { Navigation } from "./navigations";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
