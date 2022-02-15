import { ActionFunction, Form } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  // Create a post with the request
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  await db.post.create({
    data: { content: content, title: title, published: true },
  });
  return <p>okkk</p>;
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
