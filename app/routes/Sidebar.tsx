import { NavLink } from "remix";

type PropTypes = {
  posts: {
    id: string;
    title: string;
  }[];
};

export default function Sidebar(props: PropTypes) {
  const activeButtonStyles = "border-b-2 border-green-300";
  const inactiveButtonStyles = "border-b-2 border-slate-300";

  return (
    <div className="text-lg space-y-2 text-slate-900 pr-8 border-r border-r-slate-900/50">
      {props.posts.map((post) => (
        <div>
          <NavLink
            key={post.id}
            to={`/post/${encodeURI(post.title)}`}
            className={({ isActive }) =>
              isActive ? activeButtonStyles : inactiveButtonStyles
            }
          >
            {post.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
}
