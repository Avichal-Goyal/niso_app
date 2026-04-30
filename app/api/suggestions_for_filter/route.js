import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { AUTHOR_SUGGESTIONS_QUERY } from "@/lib/sanity/queries/author";
import { PUBLISHER_SUGGESTIONS_QUERY } from "@/lib/sanity/queries/publisher";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term");
    const type = searchParams.get("type")
}