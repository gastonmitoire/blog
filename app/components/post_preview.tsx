import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Image } from "~/components/image";

type PostPreviewProps = {
  slug: string;
  image: string | null;
  title: string;
  markdown: string;
};

export function PostPreview({
  slug,
  image,
  title,
  markdown,
}: PostPreviewProps) {
  return (
    <Link
      to={`posts/${slug}`}
      className="grid h-full text-center p-3 text-neutral-800 dark:text-neutral-200 bg-neutral-100 bg-opacity-90 dark:bg-neutral-800 dark:bg-opacity-90 shadow-md"
    >
      <Image src={image || ""} alt="" className="object-cover w-full" />
      <h5 className="text-lg uppercase font-medium pt-5">TypeScript</h5>
      <h2 className="text-3xl text-center font-medium">{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: markdown }} className="pt-3" />
    </Link>
  );
}
