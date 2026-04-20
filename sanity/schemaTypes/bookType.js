import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const bookType = defineType({
  name: "book",
  title: "Book",
  type: "document",
  icon: BookIcon,

  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media"},
    { name: "inventory", title: "Inventory"},
  ],

  fields: [

    defineField({
      name: "name",
      type: "string"
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name"
      }
    }),

    defineField({
      name: "description",
      type: "text"
    }),

    defineField({
      name: "price",
      type: "number"
    }),

    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }]
    }),

    defineField({
      name: "publisher",
      type: "reference",
      to: [{ type: "publisher" }]
    }),

    defineField({
      name: "subjects",
      type: "array",

      of: [
        {
          type: "reference",
          to: [{ type: "subject" }]
        }
      ]
    }),

    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }]
    }),

    defineField({
      name: "images",
      type: "array",

      of: [
        {
          type: "image"
        }
      ]
    }),

    defineField({
      name: "stock",
      type: "number"
    }),

    defineField({
      name: "featured",
      type: "boolean"
    }),

    defineField({
      name: "isbn",
      type: "string"
    })

  ],

  preview: {
    select: {
      title: "name",
      subtitle: "author.name",
      media: "images.0"
    }
  }

});