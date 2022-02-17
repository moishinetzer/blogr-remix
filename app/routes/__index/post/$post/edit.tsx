import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";
import { editPost } from "~/lib/postActions";
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

  const editedPost = await editPost({ id, title, content });
  return redirect(`/post/${editedPost.title}`);
};

type ValidEditedPost = {
  title: string;
  content: string;
};

const isValidPost = (
  post: { [k: string]: FormDataEntryValue } | undefined
): post is ValidEditedPost => {
  return typeof post?.title === "string" && typeof post?.content === "string";
};

export default function EditPost() {
  const transition = useTransition();
  const editedPost = transition.submission
    ? Object.fromEntries(transition.submission?.formData)
    : undefined;

  const post = useLoaderData<Post>();
  return transition.submission && isValidPost(editedPost) ? (
    <PostView post={editedPost} />
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
