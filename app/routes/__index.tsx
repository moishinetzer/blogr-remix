import { Link, LoaderFunction, NavLink, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
      <Navbar />
      <div className="flex">
        <Sidebar posts={posts} />
        <div className="flex-none pl-10 text-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
