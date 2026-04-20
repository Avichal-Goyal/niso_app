import { defineField, defineType } from "sanity";

export const subjectType = defineType({
  name: "subject",
  title: "Subject",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Subject Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    })
  ],

  preview: {
    select: {
      title: "title"
    }
  }
});