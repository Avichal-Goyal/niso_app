import BookCard from "./BookCard";

export function BooksGrid({books = []}) {
    return (
        <div className="grid grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5 gap-x-10
            gap-y-10 justify-items-start w-full mx-auto">
            {
                books.map((book) => (
                    <BookCard key={book._id} book={book}/>
                ))
            }

            {
                books.length === 0 && (
                    <p className="col-span-full text-sm text-muted-foreground">
                        No books found matching your filters
                    </p>
                )
            }
        </div>
    )
}