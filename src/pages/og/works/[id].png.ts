import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImage } from "@/lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await getCollection("work", ({ data }) => !data.draft);
  return works.map((work) => ({
    params: { id: work.id },
    props: { work },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const work = props.work as CollectionEntry<"work">;
  const png = await generateOgImage({
    title: work.data.title,
    label: "WORKS",
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
