import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export async function GET(request, { params }) {
  try {
    const { shorturl } = params; // Get short URL from request params
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // Find the original URL
    const doc = await collection.findOne({ shorturl });

    if (doc) {
      // Redirect to the original URL
      return Response.redirect(doc.url, 301); // 301 for permanent redirect
    } else {
      // If short URL is not found, return 404 error
      return new Response(JSON.stringify({ error: "Short URL not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
