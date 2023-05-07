import { LoaderArgs } from "@remix-run/server-runtime";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { PostPreview } from "~/components/post_preview";

export const loader = async ({ request }: LoaderArgs) => {
  const postListItems = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      author: { select: { username: true } },
      image: true,
      secondaryImage: true,
    },
    take: 5,
  });

  return { postListItems };
};

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-full">
      {data.postListItems.map((post, index) => (
        <PostPreview {...post} />
      ))}
    </div>
  );
}
