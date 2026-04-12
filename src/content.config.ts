import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()).optional().default([]),
      draft: z.boolean().optional().default(false),
    }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      thumbnailImage: image(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()).optional().default([]),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = { blog, work };
