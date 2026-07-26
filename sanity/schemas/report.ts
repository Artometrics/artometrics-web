import { defineField, defineType } from "sanity";

export const report = defineType({
  name: "report",
  title: "Report",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "pubDate", type: "datetime" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "heroImage", type: "url" }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(2).max(2),
    }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "body", type: "text", title: "Body HTML" }),
    defineField({ name: "draft", type: "boolean", initialValue: false }),
  ],
});
