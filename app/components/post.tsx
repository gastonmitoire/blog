import type { Post } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

export function PostDisplay({
  canDelete = true,
  isOwner,
  post,
}: {
  canDelete?: boolean;
  isOwner: boolean;
  post: Pick<Post, "slug" | "title">;
}) {
  return (
    <div>
      <p>Here's your post:</p>
      <p>{post.title}</p>
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
