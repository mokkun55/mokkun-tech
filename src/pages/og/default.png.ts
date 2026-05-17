import type { APIRoute } from "astro";
import { generateOgImage } from "@/lib/og";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "もっくんのポートフォリオ",
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
