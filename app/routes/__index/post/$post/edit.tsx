import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";
import PostView from "~/routes/components/PostView";
import { Post } from "~/routes/__index";
import { db } from "~/utils/db.server";

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
  const content = formData.get("content");
  invariant(typeof id === "string", "id must be a string");
  invariant(typeof title === "string", "title must be a string");
  invariant(typeof content === "string", "content must be a string");

  const editedPost = await db.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
    },
  });
  return redirect(`/post/${editedPost.title}`);
};

export default function EditPost() {
  const transition = useTransition();
  const post = useLoaderData<Post>();
  return transition.submission ? (
    <PostView post={Object.fromEntries(transition.submission?.formData)} />
  ) : (
    <>
      <Form method="post" className="grid grid-cols-3 gap-3">
        <input type="hidden" name="id" value={post.id} />
        <label>Title</label>
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          className="col-span-2"
        />
        <label>Content</label>
        <textarea
          name="content"
          defaultValue={post.content}
          className="col-span-2 h-28"
        />
        <button
          type="submit"
          name="edit"
          defaultValue={"edited"}
          className="rounded-xl bg-emerald-200 px-6 py-2 text-emerald-700"
        >
          Edit
        </button>
      </Form>
    </>
  );
}
