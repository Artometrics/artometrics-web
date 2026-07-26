import { defineField, defineType } from "sanity";

/** Approved member UGC promoted toward the magazine surface. */
export const memberContribution = defineType({
  name: "memberContribution",
  title: "Member contribution",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "body", type: "text" }),
    defineField({ name: "memberHandle", type: "string" }),
    defineField({ name: "supabasePostId", type: "string" }),
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] }, initialValue: "draft" }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
});
