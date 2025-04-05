import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const client = await clientPromise;
  const db = client.db("Bitlink");
  const collection = db.collection("url");

  const data = await collection.findOne({ shorturl: params.shorturl });

  if (data) {
    // Add safety check
    const finalUrl = data.url.startsWith("http") ? data.url : `https://${data.url}`;
    redirect(finalUrl);
  } else {
    // Redirect to custom error page or homepage if not found
    redirect("/error"); // Make sure /error exists
  }
}
