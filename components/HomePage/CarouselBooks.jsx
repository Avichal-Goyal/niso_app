import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export function CarouselBooks() {
    return (
        // 1. We keep the max-width but ensure padding is balanced
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Trending Books</h2>
            {/* We can put buttons or 'View All' here to fill space */}
        </div>

        <Carousel
            opts={{ align: "start" }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/3 lg:basis-1/4">
                <div className="group cursor-pointer">
                    <Card className="border-none shadow-none">
                    <CardContent className="p-0">

                        {/* The Book Cover */}
                        <div className="aspect-[3/4] rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2">
                        <span className="text-5xl font-bold text-slate-200">{index + 1}</span>
                        </div>

                        {/* Information Area */}
                        <div className="mt-4">
                        <h3 className="font-bold text-base text-slate-900">Modern Web Design</h3>
                        <p className="text-sm text-slate-500">Author Name</p>
                        <p className="text-base font-bold mt-2 text-blue-600">₹599</p>
                        </div>

                    </CardContent>
                    </Card>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>

            <div className="hidden md:block">
            <CarouselPrevious className="-left-12 opacity-50 hover:opacity-100" />
            <CarouselNext className="-right-12 opacity-50 hover:opacity-100" />
            </div>
        </Carousel>
        </section>
    )
}
