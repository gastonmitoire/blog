import { LoaderArgs } from "@remix-run/server-runtime";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const postListItems = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { slug: true, title: true, author: { select: { username: true } } },
    take: 5,
  });

  return { postListItems };
};

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>();

  console.log(data);
  return (
    <div className="min-h-screen">
      <aside>
        <ul>
          {data.postListItems.map(({ slug, title }) => (
            <li key={slug}>
              <Link to={`posts/${slug}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        <h1>Home</h1>
      </main>
    </div>
  );
}
