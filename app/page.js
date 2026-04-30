import { CarouselBooks } from "@/components/HomePage/CarouselBooks";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BOOKS_QUERY, FEATURED_BOOKS_QUERY, FILTERED_BOOKS_QUERY } from "@/lib/sanity/queries/books";
import { BookSection } from "@/components/HomePage/BookSection";
import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories";
import { ALL_SUBJECTS_QUERY } from "@/lib/sanity/queries/subjects";


export default async function Home({ searchParams }) {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const inStock = params.inStock === "true";
  const subject = params.subject ?? "";
  const publisher = params.publisher ?? "";
  const author = params.author ?? "";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;


  const { data: categories} = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  const { data : subjects } = await sanityFetch({
    query: ALL_SUBJECTS_QUERY,
  })

  const { data: books } = await sanityFetch({
    query: FILTERED_BOOKS_QUERY,
    params: {
      searchQuery,
      categorySlug,
      inStock,
      subject,
      publisher,
      author,
      minPrice,
      maxPrice,
    },
  });

  const { data : featuredBooks } = await sanityFetch({
    query: FEATURED_BOOKS_QUERY,
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f7fc]">
      <Navbar />
      {
        featuredBooks.length > 0 && (
          <CarouselBooks featuredBooks={featuredBooks} />
        )
      }
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <BookSection
          subjects={subjects}
          categories={categories}
          books={books}
        />
      </div>
    </div>
  );
}
