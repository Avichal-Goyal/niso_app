import { defineQuery } from "next-sanity";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants/stock.js";




const BOOK_FILTER_CONDITIONS = `
 _type == "book"

 && ($categorySlug == ""
 || category->slug.current == $categorySlug)

 && ($author == ""
 || author->name == $author)

 && ($publisher == ""
 || publisher->name == $publisher)

 && ($subject == ""
 || $subject in subjects[]->title)

 && ($searchQuery == ""
 || name match $searchQuery + "*"
 || description match $searchQuery + "*")

 && ($inStock == false
 || stock > 0)

 && ($minPrice == 0
 || price >= $minPrice)

 && ($maxPrice == 0
 || price <= $maxPrice)
`;



export const ALL_BOOKS_QUERY = defineQuery(`*[
 _type=="book"
] | order(name asc){

 _id,
 name,

 "slug": slug.current,

 description,

 price,

 "images": images[]{
   _key,
   asset->{
      _id,
      url
   },
   hotspot
 },

 category->{
   _id,
   title,
   "slug": slug.current
 },

 author->{
   _id,
   name
 },

 publisher->{
   _id,
   name
 },

 subjects[]->{
   _id,
   title
 },

 stock,
 featured
}`);
    




export const FEATURED_BOOKS_QUERY = defineQuery(`*[
 _type=="book"
 && featured == true
 && stock > 0
] | order(name asc)[0...6]{

 _id,
 name,

 "slug":slug.current,

 price,

 "images":images[]{
   asset->{
    url
   }
 },

 stock
}`);
    


export const BOOK_BY_SLUG_QUERY = defineQuery(`*[
 _type=="book"
 && slug.current==$slug
][0]{

 _id,
 name,
 description,
 price,
 isbn,
 stock,

 "images":images[]{
   asset->{
      url
   }
 },

 author->{
   name
 },

 publisher->{
   name
 },

 category->{
   title
 },

 subjects[]->{
   title
 }
}`);
    




export const FILTERED_BOOKS_QUERY = defineQuery(`*[
 ${BOOK_FILTER_CONDITIONS}
]
| order(name asc){

 _id,
 name,

 "slug":slug.current,

 price,

 "images":images[]{
   asset->{
     url
   }
 },

 category->{
   title,
   "slug":slug.current
 },

 author->{
   name
 },

 stock
}`);
    



export const SEARCH_BOOKS_QUERY = defineQuery(`*[
 _type=="book"

 && (
   name match $searchQuery + "*"
   || description match $searchQuery + "*"
 )
]{

 _id,
 name,

 "slug":slug.current,

 price,

 "images":images[]{
   asset->{
      url
   }
 }
}`);
    


export const BOOKS_BY_CATEGORY_QUERY = defineQuery(`*[
 _type=="book"
 && category->slug.current==$categorySlug
]{

 _id,
 name,

 "slug":slug.current,

 price
}`);
    


export const BOOKS_BY_SUBJECT_QUERY = defineQuery(`*[
 _type=="book"
 && $subject in subjects[]->title
]{

 _id,
 name,
 price
}`);
    


export const BOOKS_BY_AUTHOR_QUERY = defineQuery(`*[
 _type=="book"
 && author->name==$author
]{
 _id,
 name,
 price
}`);
    

export const BOOKS_BY_PUBLISHER_QUERY = defineQuery(`*[
 _type=="book"
 && publisher->name==$publisher
]{
 _id,
 name,
 price
}`);
    


export const IN_STOCK_BOOKS_QUERY = defineQuery(`*[
 _type=="book"
 && stock > 0
]{
 _id,
 name,
 stock
}`);
    


export const LOW_STOCK_BOOKS_QUERY = defineQuery(`*[
 _type=="book"
 && stock > 0
 && stock <= ${LOW_STOCK_THRESHOLD}
]{
 _id,
 name,
 stock
}`);
    


export const RELATED_BOOKS_QUERY = defineQuery(`*[
 _type=="book"

 && category->_id==$categoryId

 && _id != $bookId

][0...4]{

 _id,
 name,

 "slug":slug.current,

 price,

 "images":images[]{
   asset->{
      url
   }
 }
}`);