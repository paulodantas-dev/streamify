import { Actions } from "./actions";
import { Logo } from "./logo";

interface NavbarProps {
  username: string;
}

export function Navbar({ username }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full h-20 z-10 bg-gray-800 px-4 flex gap-x-2 lg:gap-x-0 justify-between items-center shadow-sm">
      <Logo username={username} />
      <Actions />
    </nav>
  );
}
