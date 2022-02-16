import { Link, LoaderFunction, NavLink, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

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
    <>
      <div className="mb-8 border-b bg-slate-200">
        <Navbar />
      </div>
      <div className="mx-auto max-w-3xl pl-6 xl:pl-0">
        <div className="flex">
          <Sidebar posts={posts} />
          <div className="flex-none pl-10 text-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
