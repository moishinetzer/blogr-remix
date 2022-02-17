import { ActionFunction, Form, redirect, useTransition } from "remix";
import invariant from "tiny-invariant";
import PostView from "~/routes/components/PostView";
import { createPost } from "~/lib/postActions";

export const action: ActionFunction = async ({ request }) => {
  // Create a post with the request
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof content === "string", "content must be a string");

  const createdPost = await createPost({ title, content });
  return redirect(`/post/${createdPost.title}`);
};

type ValidCreatedPost = {
  title: string;
  content: string;
};

const isValidPost = (
  post: { [k: string]: FormDataEntryValue } | undefined
): post is ValidCreatedPost => {
  return typeof post?.title === "string" && typeof post?.content === "string";
};

export default function NewPost() {
  const transition = useTransition();
  const createdPost = transition.submission
    ? Object.fromEntries(transition.submission?.formData)
    : undefined;
  return transition.submission && isValidPost(createdPost) ? (
    <PostView post={createdPost} />
  ) : (
    <Form method="post" className="grid grid-cols-3 gap-3">
      <label>Title</label>
      <input type="text" name="title" className="col-span-2" />
      <label>Content</label>
      <textarea name="content" className="col-span-2 h-28" />
      <button
        type="submit"
        className="rounded-xl bg-emerald-200 px-6 py-2 text-emerald-700 "
      >
        Create
      </button>
    </Form>
  );
}
