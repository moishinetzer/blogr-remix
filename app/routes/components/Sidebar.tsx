import { NavLink } from "remix";

type PropTypes = {
  posts: {
    id: string;
    title: string;
  }[];
};

export default function Sidebar(props: PropTypes) {
  const activeButtonStyles = "text-slate-900 border-b-2 border-green-400";
  const inactiveButtonStyles = "text-slate-700 border-b-2 border-slate-400";

  return (
    <div className="space-y-2 border-r-slate-900/50 text-lg  text-slate-900">
      {props.posts.map((post) => (
        <div key={post.id}>
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
