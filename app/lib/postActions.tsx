import { db } from "~/utils/db.server";

type CreatePostParams = {
  content: string;
  title: string;
};

export async function createPost({ content, title }: CreatePostParams) {
  const createdPost = await db.post.create({
    data: { content: content, title: title, published: true },
  });
  return createdPost;
}

type EditPostParams = {
  id: string;
  title: string;
  content: string;
};

export async function editPost({ id, title, content }: EditPostParams) {
  const editedPost = await db.post.update({
    where: {
      id: id,
    },
    data: {
      content: content,
      title: title,
    },
  });
  return editedPost;
}
