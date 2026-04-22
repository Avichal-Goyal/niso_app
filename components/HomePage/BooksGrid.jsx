import BookCard from "./BookCard";

export function BooksGrid({books = []}) {
    return (
        <div>
            {
                books.map((book) => (
                    <div
                        key={book._id}
                        className="border rounded-lg p-3 flex flex-col gap-2"
                    >
                        <BookCard book={book}/>
                    </div>
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