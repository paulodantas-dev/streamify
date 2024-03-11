import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-gray-800 px-4 flex gap-x-2 lg:gap-x-0 justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
}
