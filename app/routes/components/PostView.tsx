import { ReactElement } from "react";
import { Form } from "remix";

type Props = {
  post: {
    id: string;
    title: string;
    content: string;
  };
};
export default function PostView({ post }: Props) {
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
