import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({
      name: "image",
      type: "object",
      fields: [
        { name: "url", type: "url" },
        { name: "alt", type: "string" },
      ],
    }),
  ],
});
