import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import type { Post } from "~/routes/__index";

export const loader: LoaderFunction = async ({ params }) => {
  // Get post from database
  console.log(params);
  const post = await db.post.findFirst({
    where: {
      title: params.post,
    },
  });
  return post;
};

export default function Post() {
  const post = useLoaderData<Post>();
  console.log(post);
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  );
}
