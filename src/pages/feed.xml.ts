import type { APIRoute } from "astro";
import blogPosts from "../data/blog-posts.json";

export const GET: APIRoute = ({ site, url }) => {
  const siteUrl = site?.href || `${url.protocol}//${url.host}`;
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hanif Adedotun - Blog</title>
    <description>Blog posts by Hanif Adedotun</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogPosts
      .map((post) => {
        const pubDate = new Date(post.date).toUTCString();
        const postUrl = `${siteUrl}/blog/${post.slug}`;
        const description = post.intro || "";
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${post.author}</author>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};

