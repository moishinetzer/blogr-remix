import { LoaderFunction, Outlet, useLoaderData } from "remix";

export type Post = {
  title: string;
  content: string;
};

export const loader: LoaderFunction = async () => {
  return [
    { title: "My new post", content: "Hello world" },
    { title: "My second post", content: "Second post content" },
    { title: "My third post", content: "Third post content" },
  ];
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
            <div key={post.title}>
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
