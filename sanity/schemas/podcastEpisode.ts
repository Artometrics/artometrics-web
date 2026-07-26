import { defineField, defineType } from "sanity";

export const podcastEpisode = defineType({
  name: "podcastEpisode",
  title: "Podcast episode",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "pubDate", type: "datetime" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "image", type: "url" }),
    defineField({ name: "guestAvatar", type: "url" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "episodeNumber", type: "number" }),
    defineField({ name: "duration", type: "string" }),
    defineField({ name: "audioSrc", type: "url" }),
    defineField({ name: "isLocked", type: "boolean", initialValue: false }),
  ],
});
