import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { Image } from "~/components/image";

type PostPreviewProps = {
  slug: string;
  image: string | null;
  title: string;
};

export function PostPreview({ slug, image, title }: PostPreviewProps) {
  return (
    <Link to={`posts/${slug}`}>
      <Image src={image || ""} alt="" />
      {title}
    </Link>
  );
}
