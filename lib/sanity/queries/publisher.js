import { defineQuery } from "next-sanity";

export const PUBLISHER_SUGGESTIONS_QUERY = defineQuery(`
  *[_type == "publisher" && name match $term + "*"] | order(name asc) [0...5] {
    "name": name
}
`);