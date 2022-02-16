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
  const title = formData.get("title");
  const action = formData.get("_action");
  invariant(typeof id === "string", "id must be a string");
  invariant(typeof title === "string", "title must be a string");

  switch (action) {
    case "delete": {
      await db.post.delete({
        where: {
          id: id,
        },
      });
      return redirect("/");
    }
    case "edit": {
      return redirect(`/post/${title}/edit`);
    }
  }
};

export default function Post() {
  const post = useLoaderData<Post>();
  return (
    <div className=" py-8 pl-6 max-w-md w-screen bg-white/50 rounded-xl">
      <h1 className="text-3xl semibold text-slate-800 mb-6">{post.title}</h1>
      <p className="mb-6">{post.content}</p>
      <Form method="post" className="space-x-4">
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="title" value={post.title} />
        <button
          type="submit"
          name="_action"
          value="edit"
          className="border px-6 py-2 rounded-xl"
        >
          Edit
        </button>
        <button
          type="submit"
          name="_action"
          value="delete"
          className="border px-6 py-2 rounded-xl"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
