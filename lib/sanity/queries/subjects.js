import { defineQuery } from "next-sanity";

export const ALL_SUBJECTS_QUERY = defineQuery(`
  *[_type == "subject"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
}
`);