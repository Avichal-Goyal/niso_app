"use client"
import { useEffect, useState, useRef } from "react";
import { client } from "@/sanity/lib/client";
import { AUTHOR_SUGGESTIONS_QUERY } from "@/lib/sanity/queries/author";
import { PUBLISHER_SUGGESTIONS_QUERY } from "@/lib/sanity/queries/publisher";
import { Input } from "@/components/ui/input";



export function Author_Publisher_Search({ updateParams }) {
    //Local State
    const [authorInput, setAuthorInput] = useState("");
    const [authorSuggestions, setAuthorSuggestions] = useState([]);
    const [publisherInput, setPublisherInput] = useState("");
    const [publisherSuggestions, setPublisherSuggestions] = useState([]);

    const authRef = useRef(null)
    const pubRef = useRef(null)

    useEffect(() => {
        const fetchAuthors = async () => {
            const term = authorInput;

            if(term.length === 0) {
                setAuthorSuggestions([]);
                updateParams({ author : null });
                return;
            }
            try {
                const results = await client.fetch(AUTHOR_SUGGESTIONS_QUERY, { term });

                setAuthorSuggestions(results);

            } catch (error) {
                console.error("Error fetching the author suggestions", error);
            }
        }
        const timer = setTimeout(fetchAuthors, 300);
        return () => clearTimeout(timer);
    }, [authorInput])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (authRef.current && !authRef.current.contains(event.target)) {
                setAuthorSuggestions([]);
            }

            if (pubRef.current && !pubRef.current.contains(event.target)) {
                setPublisherSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchPublishers = async () => {
            const term = publisherInput;
            if(term.length === 0) {
                setPublisherSuggestions([]);
                updateParams({ publisher : null });
                return;
            }
            try {
                const results = await client.fetch(PUBLISHER_SUGGESTIONS_QUERY, { term });

                setPublisherSuggestions(results);
            } catch (error) {
                console.error("Error fetching the publisher suggestions", error);
            }
        }
        const timer = setTimeout(fetchPublishers, 300);
        return () => clearTimeout(timer);
    }, [publisherInput])

    return (
        <div className="space-y-6">
            {/* Author Input Section */}
            <div className="space-y-2 relative" ref={authRef}>
                <h4 className="font-bold text-sm text-slate-900 uppercase">Author</h4>
                <div className="relative">
                    <Input
                        type="text"
                        value={authorInput}
                        onChange={(e) => setAuthorInput(e.target.value)}
                        placeholder="Search authors..."
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Suggestion Dropdown, shows only when suggestion is actually present */}
                    {
                        authorSuggestions.length > 0 && (
                            <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-40 overflow-auto">
                                {
                                    authorSuggestions.map((auth) =>
                                        <li
                                            key={auth.name}
                                            onClick={
                                                () => {
                                                    setAuthorInput(auth.name);
                                                    setAuthorSuggestions([]);
                                                    updateParams({ author: auth.name});
                                                }
                                            }
                                        >
                                            {auth.name}
                                        </li>
                                    )
                                }
                            </ul>
                        )
                    }
                </div>
            </div>

            {/* Publisher Input Section */}
            <div className="space-y-2" ref={pubRef}>
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-tight">Publisher</h4>
                <div className="relative">
                    <Input
                        value={publisherInput}
                        onChange={(e) => setPublisherInput(e.target.value)}
                        placeholder="Search publishers..."
                        className="w-full focus-visible:ring-violet-500"
                    />

                    {publisherSuggestions.length > 0 && (
                        <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 overflow-auto">
                            {publisherSuggestions.map((pub) => (
                                <li
                                    key={pub.name}
                                    onClick={() => {
                                        setPublisherInput(pub.name);
                                        setPublisherSuggestions([]);
                                        updateParams({ publisher: pub.name });
                                    }}
                                    className="px-4 py-2 text-sm hover:bg-violet-50 cursor-pointer transition-colors"
                                >
                                    {pub.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
        
    )
}