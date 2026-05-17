import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, "") ?? "https://mokkun.tech";

  const works = (await getCollection("work", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  const blogs = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  const worksList = works
    .map(
      (work) =>
        `- [${work.data.title}](${baseUrl}/works/${work.id}.md): ${work.data.description}`,
    )
    .join("\n");

  const blogsList = blogs
    .map(
      (blog) =>
        `- [${blog.data.title}](${baseUrl}/blogs/${blog.id}.md): ${blog.data.description}`,
    )
    .join("\n");

  const content = `# もっくん.tech

> もっくんのポートフォリオサイト。制作物 (Works) と技術ブログ (Blog)、プロフィールを掲載しています。Webサイト本体は ${baseUrl}/ にあります。

このファイルは LLM 向けにサイトの目次と各コンテンツへのリンクをまとめたものです。各エントリーの \`.md\` リンクには本文の Markdown が格納されています。

## Profile

- サイト名: もっくん.tech
- 著者: もっくん
- URL: ${baseUrl}/

## Works

${worksList}

## Blog

${blogsList}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
