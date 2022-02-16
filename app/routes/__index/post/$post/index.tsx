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
import PostView from "~/routes/components/PostView";

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
  return <PostView post={post} />;
}
