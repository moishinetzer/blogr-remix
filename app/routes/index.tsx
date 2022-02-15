import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { getAllPosts } from "~/post";
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
  console.log(posts);
  return (
    <>
      <div className="bg-blue-200">Header</div>
      <div className="flex h-screen w-full">
        <div className="bg-blue-300 w-2/5 flex-auto">
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
            </div>
          ))}
        </div>
        <div className="bg-blue-400 w-full flex-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
