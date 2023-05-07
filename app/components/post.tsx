import type { Post } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

export function PostDisplay({
  canDelete = true,
  isOwner,
  post,
}: {
  canDelete?: boolean;
  isOwner: boolean;
  post: Pick<Post, "slug" | "title" | "image" | "secondaryImage" | "markdown">;
}) {
  return (
    <div className="flex flex-col gap-3 items-center bg-neutral-100 dark:bg-neutral-900">
      <img src={post?.image!} alt="" className="w-full" />
      <h5 className="text-lg uppercase font-medium pt-5">TypeScript</h5>
      <h2 className="text-3xl font-medium">{post.title}</h2>
      <div
        className="bg-red-300"
        dangerouslySetInnerHTML={{
          __html: post.markdown,
        }}
      />
      <Link to=".">"{post.slug}" Permalink</Link>
      {isOwner ? (
        <Form method="post">
          <button
            className="button"
            disabled={!canDelete}
            name="intent"
            type="submit"
            value="delete"
          >
            Delete
          </button>
        </Form>
      ) : null}
    </div>
  );
}
