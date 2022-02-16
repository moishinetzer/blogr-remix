import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { db } from "~/utils/db.server";
import type { Post } from "~/routes/__index";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
  const post = await db.post.findFirst({
    where: {
      title: params.post,
    },
  });
  return post;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  invariant(typeof id === "string", "id must be a string");
  await db.post.delete({
    where: {
      id: id,
    },
  });
  return redirect("/");
};

export default function Post() {
  const post = useLoaderData<Post>();
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Form method="post">
        <input type="hidden" name="id" value={post.id} />
        <button type="submit" name="delete" value={"deleted"}>
          Delete
        </button>
      </Form>
    </>
  );
}
