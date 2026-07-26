import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({ name: "page", type: "string", validation: (r) => r.required() }),
    defineField({ name: "pubDate", type: "datetime" }),
    defineField({ name: "body", type: "text" }),
  ],
});
