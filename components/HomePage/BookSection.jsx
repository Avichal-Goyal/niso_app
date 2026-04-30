'use client'
import { useState } from "react";
import { Button } from "../ui/button";
import { BooksGrid } from "./BooksGrid";
import { FiltersSidebar } from "./Filters/FiltersSidebar";

export function BookSection({subjects = [], categories = [], books = []}) {
    const [filtersOpen, setFiltersOpen] = useState(true);
    return(
        <div className="flex gap-6 w-full justify-start items-start">
            {/*Filters Sidebar*/}
            <aside className={`w-64 shrink-0 border-r pr-4 ${!filtersOpen ? "hidden md:block" : ""}`}>
                <FiltersSidebar
                    categories={categories}
                    subjects={subjects}
                />
            </aside>

            {/*Main Area*/}
            <main className="flex-1 shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className=""
                        onClick={() => setFiltersOpen((prev) => !prev)}
                    >
                        {filtersOpen ? "Hide Filters" : "Show Filters"}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                        Showing {books.length} books
                    </p>
                </div>

                {/*Books Section*/}
                <BooksGrid books={books}/>

            </main>
        </div>
    )
}