'use client'
import { useState } from "react";
import { Button } from "../ui/button";
import { BooksGrid } from "./BooksGrid";

export function BookSection({categories = [], books = [], searchQuery = []}) {
    const [filtersOpen, setFiltersOpen] = useState(true);
    return(
        <div className="flex gap-6">
            {/*Filters Sidebar*/}
            <aside className={`w-64 shrink-0 border-r pr-4 ${!filtersOpen ? "hidden md:block" : ""}`}>

            </aside>

            {/*Main Area*/}
            <main className="flex-1">
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
                <BooksGrid boos={books}/>

            </main>
        </div>
    )
}