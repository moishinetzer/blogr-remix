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
    <Form method="post">
      <label>Title</label>
      <input type="text" name="title" />
      <label>Content</label>
      <input type="text" name="content" />
      <button type="submit">Submit</button>
    </Form>
  );
}
