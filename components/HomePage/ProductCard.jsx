import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

const BookCard = ({ book }) => {
    const { title, author, price, image, category, rating } = book;

    return (
        <Card className="w-full max-w-[280px] overflow-hidden transition-all hover:shadow-lg">
        {/* 1. Book Cover */}
        <div className="relative aspect-[3/4] w-full bg-muted">
            <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
        </div>

        {/* 2. Metadata */}
        <CardHeader className="p-4 pb-0">
            <div className="flex items-center gap-1 text-yellow-500 mb-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-medium text-muted-foreground">{rating}</span>
            </div>
            <h3 className="font-bold text-lg leading-tight line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{author}</p>
        </CardHeader>

        {/* 3. Pricing and Actions */}
        <CardContent className="p-4 pt-2">
            <p className="text-xl font-bold">${price}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
            <Button className="w-full gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
            </Button>
        </CardFooter>
        </Card>
    );
};

export default BookCard;