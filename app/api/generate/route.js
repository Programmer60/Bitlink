import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url, shorturl } = body;

    // ✅ Normalize URL (add https:// if missing)
    const ensureHttps = (url) => {
      if (!/^https?:\/\//i.test(url)) {
        return "https://" + url;
      }
      return url;
    };
    const finalUrl = ensureHttps(url);

    const client = await clientPromise;
    const db = client.db("Bitlink");
    const collection = db.collection("url");

    // ✅ Check if shorturl already exists
    const existing = await collection.findOne({ shorturl });

    if (existing) {
      if (existing.url === finalUrl) {
        // ✅ Same shorturl for same long url — OK
        return new Response(
          JSON.stringify({
            success: true,
            error: false,
            message: "Short URL already exists for this link.",
            shorturl,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } else {
        // ❌ Conflict: shorturl is taken for another link
        return new Response(
          JSON.stringify({
            success: false,
            error: true,
            message: "Short URL already used for a different link!",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // ✅ Insert new shorturl
    await collection.insertOne({ url: finalUrl, shorturl });

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        message: "URL generated successfully!",
        shorturl,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return new Response(
      JSON.stringify({ success: false, error: true, message: "Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
