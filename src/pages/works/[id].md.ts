import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await getCollection("work", ({ data }) => !data.draft);
  return works.map((work) => ({
    params: { id: work.id },
    props: { work },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const work = props.work as CollectionEntry<"work">;
  const publishDate = work.data.publishDate.toISOString().split("T")[0];
  const tags = work.data.tags.length > 0 ? work.data.tags.join(", ") : "—";

  const links = [
    work.data.githubUrl && `- GitHub: ${work.data.githubUrl}`,
    work.data.demoUrl && `- Demo: ${work.data.demoUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  const content = `# ${work.data.title}

> ${work.data.description}

- 公開日: ${publishDate}
- タグ: ${tags}
${links ? `\n${links}\n` : ""}
---

${work.body ?? ""}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
