import { defineQuery } from "next-sanity";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants/stock";

const BOOK_FILTER_CONDITIONS = `
    _type == "book"
    && ($categorySlug == "" || category->slug.current == $categorySlug)
    && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*")
    && ($inStock == false || stock > 0)`;


export const ALL_BOOKS_QUERY = defineQuery(`*[
    _type == "product" ] | order(name asc) {
        _id,
        name,
        "slug": slug.current,
        description,
        price,
        "images": images[]{
            _key,
            asset -> {
                _id,
                url
            },
            hotspot
        },
        category -> {
            _id,
            title,
            "slug": slug.current
        },
        author,
        publisher,
        stock,
        featured,
}`);

export const FEATURED_BOOKS_QUERY = defineQuery(`*[
    _type == "book"
    && featured == true
    && stock > 0
] | order(name asc) [0...6] {
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
    stock
}`);