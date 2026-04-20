import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,

  fields: [
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text"
    }),
  ],

  preview: {
    select: {
      title: "name"
    }
  }
});