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
    <div className="w-screen max-w-md rounded-xl bg-white py-6 px-6 shadow-md">
      <h1 className="text-slate-00 mb-6 text-2xl">{post.title}</h1>
      <p className="mb-8">{post.content}</p>
      <Form method="post" className="">
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="title" value={post.title} />
        <button
          type="submit"
          name="_action"
          value="edit"
          className="mr-4 rounded-xl border border-slate-200 px-6 py-2 text-sm tracking-wider text-slate-700 shadow shadow-slate-300"
        >
          EDIT
        </button>
        <button
          type="submit"
          name="_action"
          value="delete"
          className=" rounded-xl border border-slate-200 px-6 py-2 text-sm tracking-wider text-slate-700 shadow shadow-slate-300"
        >
          DELETE
        </button>
      </Form>
    </div>
  );
}
