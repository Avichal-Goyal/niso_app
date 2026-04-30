// import React from 'react';
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Star } from "lucide-react";
// import Image from 'next/image';

// const BookCard = ({ book }) => {
//     const { name, author, price, images, category, stock } = book;

//     const imageUrl = (images && images.length > 0)
//         ? images[0].asset?.url
//         : null;
//     return (
//         <Card className="py-0 group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover-shadow-md w-80">
//             <div className='relative w-full aspect-[3/4] overflow-hidden h-64 bg-[#f8f7ff]'>
//                 <Image
//                     src={imageUrl}
//                     alt={name}
//                     fill
//                     className='object-contain transition-transform duration-500 group-hover:scale-105'
//                 />
//             </div>

//             <CardContent className="pt-0 flex felx-1 flex-col space-y-2.5 p-4">
//                 <div className='flex items-center justify-between'>
//                     <span className='rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-600'>
//                         Book
//                     </span>

//                     <span className={`text-xs font-msemibold ${stock > 0 ? "text-emerald-600" : "text-rose-500"}`}>
//                         {stock > 0 ? "In Stock" : "Out of Stock"}
//                     </span>
//                 </div>

//                 <div className='flex-1'>
//                     <h3 className='line-clamp-2 text-sm font-bold text-slate-900 md:text-base'>
//                         {name}
//                     </h3>
//                     <p className='text-xs text-slate-500'>
//                         {author?.name}
//                     </p>
//                 </div>

//                 <p className='text-lg font-black text-slate-900'>₹ {price}</p>
//             </CardContent>

//             <CardFooter className="p-4 pt-0">
//                 <Button
//                     className='w-full rounded-lg bg-[#7c5cff] text-white hover:bg-[#6d4df0] active:scale-[0.98] transition-all'
//                     disabled={stock === 0}
//                 >
//                     <ShoppingCart className='mr-2 h-4 w-4'/>
//                     {stock > 0 ? "Add to Cart" : "Unavailable"}
//                 </Button>
//             </CardFooter>

//         </Card>
//     );
// };

// export default BookCard;

import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from 'next/image';

const BookCard = ({ book }) => {
    const { name, author, price, images, stock } = book;
    const imageUrl = (images && images.length > 0) ? images[0].asset?.url : null;

    return (
        <div className="group flex flex-col items-center w-full max-w-[220px] transition-all duration-300">
            {/* Image Container - Width of image, no extra card border */}
            <div className='relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-sm border border-slate-100 bg-slate-50'>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-300 text-xs">No Cover</div>
                )}
                
                {/* Optional: Stock badge overlaying the image like your screenshot */}
                {stock <= 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-white px-2 py-1 rounded shadow-sm">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Content Area - Minimalist and Centered */}
            <div className="mt-3 w-full text-center space-y-1">
                <h3 className='line-clamp-1 text-sm font-bold text-slate-900'>
                    {name}
                </h3>
                <p className='text-[11px] text-slate-500 truncate'>
                    {
                        author === null ? "author" : author?.name
                    }
                </p>
                <p className='text-sm font-bold text-violet-600'>₹{price}</p>
            </div>

            {/* Permanent Add to Cart Button */}
            <div className="mt-3 w-full">
                <Button
                    size="sm"
                    className='w-full rounded-lg bg-violet-600 h-9 text-xs font-semibold text-white hover:bg-violet-700 shadow-sm active:scale-95 transition-all'
                    disabled={stock === 0}
                >
                    <ShoppingCart className='mr-2 h-3.5 w-3.5'/>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default BookCard;