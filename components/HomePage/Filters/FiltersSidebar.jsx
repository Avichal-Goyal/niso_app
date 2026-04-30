"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect, use } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Author_Publisher_Search } from "./Author_Publisher_Search";

export function FiltersSidebar({ categories = [], subjects = [] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("q") ?? "";
    const currentCategory = searchParams.get("category") ?? "";
    const inStock = searchParams.get("inStock") ?? "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 5000;
    const currentSubject = searchParams.get("subject") ?? "";

    // Local state for the slider
    const [localPrice, setLocalPrice] = useState([minPrice, maxPrice]);

    useEffect(() => {
        setLocalPrice([minPrice, maxPrice || 5000]);
    }, [minPrice, maxPrice]);

    const updateParams = useCallback((updates) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "" || value === false || value === 0) {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        })

        router.push(`?${params.toString()}`, { scroll: false});
    }, [router, searchParams]);

    return(
        <div className="flex flex-col gap-8 py-2">
            {/* Search Field */}
            <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                    Search
                </h4>
                <div className="relative">
                    <Input
                        placeholder="Search by title..."
                        defaultValue={currentSearch}
                        onChange={(e) => updateParams({ q: e.target.value})}
                        className="pl-9 border-slate-200 focus-visible:ring-violet-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
            </div>


            {/* Category Dropdown */}
            <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                    Genre
                </h4>
                <Select
                    value={currentCategory || "all"}
                    onValueChange={(value) => updateParams({ category: value === "all" ? null : value})
                    }
                >
                    <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Genres</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat._id} value={cat.slug}>
                                {cat.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* 3. NEW: Subject Dropdown */}
            <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Subject</h4>
                <Select
                    value={currentSubject || "all"}
                    onValueChange={(value) => updateParams({ subject: value === "all" ? null : value})}
                >
                    <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map((sub) => (
                            <SelectItem key={sub._id} value={sub.slug}>
                                {sub.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Price Slider */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Budget</h4>
                    <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded">
                        ₹{localPrice[0]} - ₹{localPrice[1]}
                    </span>
                </div>
                <Slider
                    min={0}
                    max={5000}
                    step={50}
                    value={localPrice}
                    onValueChange={setLocalPrice}
                    onValueCommit={(val) => updateParams({ minPrice: val[0], maxPrice: val[1] })}
                    className="py-4"
                />
            </div>

            {/* Stock Toggle */}
            <div
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => updateParams({ inStock: !inStock })}
            >
                <Input
                    type="checkbox"
                    checked={Boolean(inStock)}
                    readOnly
                    className="h-4 w-4 rounded border-slate-300 text-violet-600 focus: ring-violet-500"
                />
                <span className="text-sm font-semibold text-slate-700">In Stock Only</span>
            </div>

            {/* Author Search */}
            <Author_Publisher_Search updateParams={updateParams}/>
        </div>
    )



}