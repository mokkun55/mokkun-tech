import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImage } from "@/lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getCollection("blog", ({ data }) => !data.draft);
  return blogs.map((blog) => ({
    params: { id: blog.id },
    props: { blog },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const blog = props.blog as CollectionEntry<"blog">;
  const png = await generateOgImage({
    title: blog.data.title,
    label: "BLOG",
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
