import { ActionFunction, Form, redirect } from "remix";
import { db } from "~/utils/db.server";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  // Create a post with the request
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  invariant(typeof title === "string", "title must be a string");
  invariant(typeof content === "string", "content must be a string");

  const createdPost = await db.post.create({
    data: { content: content, title: title, published: true },
  });
  return redirect(`/post/${createdPost.title}`);
};

export default function NewPost() {
  return (
    <Form method="post" className="grid grid-cols-3 gap-3">
      <label>Title</label>
      <input type="text" name="title" className="col-span-2" />
      <label>Content</label>
      <textarea name="content" className="col-span-2 h-28" />
      <button
        type="submit"
        className="px-6 py-2 rounded-xl bg-emerald-200 text-emerald-700 "
      >
        Create
      </button>
    </Form>
  );
}
