import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
};

export const loader: LoaderFunction = async () => {
  return await db.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });
};

export default function Index() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex bg-blue-600 items-center space-x-9 p-4">
        <Link
          to={"/"}
          className="text-2xl bg-blue-100 font-semibold text-slate-700"
        >
          Home
        </Link>
        <Link
          to={"/post/new"}
          className="text-2xl bg-blue-200 text-slate-700 font-semibold"
        >
          New Post
        </Link>
      </div>
      <div className="flex bg-gray-400">
        <div className="bg-blue-300 w-64">
          {posts.map((post) => (
            <div key={post.id}>
              <Link to={`/post/${post.title}`}>{post.title}</Link>
            </div>
          ))}
        </div>
        <div className="bg-blue-400 flex-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
