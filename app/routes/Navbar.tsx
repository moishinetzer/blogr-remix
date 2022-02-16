import { NavLink } from "remix";

export default function Navbar() {
  const activeButtonStyles =
    "text-xl text-slate-700 border-b-2 border-green-300";
  const inactiveButtonStyles =
    "text-xl text-slate-700 border-b-2 border-slate-300";

  return (
    <div className="flex items-center space-x-9 p-4">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? activeButtonStyles : inactiveButtonStyles
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/post/new"}
        className={({ isActive }) =>
          isActive ? activeButtonStyles : inactiveButtonStyles
        }
      >
        New Post
      </NavLink>
    </div>
  );
}
