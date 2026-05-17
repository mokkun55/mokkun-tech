import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getCollection("blog", ({ data }) => !data.draft);
  return blogs.map((blog) => ({
    params: { id: blog.id },
    props: { blog },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const blog = props.blog as CollectionEntry<"blog">;
  const publishDate = blog.data.publishDate.toISOString().split("T")[0];
  const tags = blog.data.tags.length > 0 ? blog.data.tags.join(", ") : "—";

  const content = `# ${blog.data.title}

> ${blog.data.description}

- 公開日: ${publishDate}
- タグ: ${tags}

---

${blog.body ?? ""}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
