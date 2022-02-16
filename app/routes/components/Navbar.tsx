import { CSSProperties } from "react";
import { NavLink, NavLinkProps } from "remix";

export default function Navbar() {
  const activeButtonStyles =
    "text-slate-900 text-xl border-b-2 border-green-400";
  const inactiveButtonStyles =
    "text-xl text-slate-600 border-b-2 border-slate-300";

  return (
    <div className="mx-auto flex max-w-3xl items-center space-x-9 p-4 ">
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
