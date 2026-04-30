import { defineQuery } from "next-sanity";

export const AUTHOR_SUGGESTIONS_QUERY = defineQuery(`
  *[_type == "author" && name match $term + "*"] | order(name asc) [0...5] {
    "name": name
}
`);