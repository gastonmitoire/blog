import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";

import { PostDisplay } from "~/components/post";
import { db } from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/session.server";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const { description, title } = data
    ? {
        description: `Enjoy the "${data.post.slug}" post and much more`,
        title: `"${data.post.slug}" post`,
      }
    : { description: "No post found", title: "No post" };

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title },
  ];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await getUserId(request);
  const post = await db.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
  if (!post) {
    throw new Response("Not found.", {
      status: 404,
    });
  }
  return json({
    isOwner: userId === post.authorId,
    post,
  });
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }
  const userId = await requireUserId(request);
  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });
  if (!post) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }
  if (post.authorId !== userId) {
    throw new Response("You can't delete someone else's post", {
      status: 403,
    });
  }
  await db.post.delete({
    where: { slug: params.slug },
  });
  return redirect("/posts");
};

export default function PostRoute() {
  const data = useLoaderData<typeof loader>();

  return <PostDisplay isOwner={data.isOwner} post={data.post} />;
}

export function ErrorBoundary() {
  const { postSlug } = useParams();
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div>
          <h1>Bad Request</h1>
          <p>What you're trying to do is not allowed.</p>
        </div>
      );
    }

    if (error.status === 403) {
      return (
        <div>
          <h1>Forbidden</h1>
          <p>You can't delete someone else's post</p>
        </div>
      );
    }
    if (error.status === 404) {
      return (
        <div>
          <h1>Post Not Found</h1>
          <p>Sorry, we couldn't find a post with the slug "{postSlug}"</p>
        </div>
      );
    }
  }
}
