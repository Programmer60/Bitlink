import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url, shorturl } = body;

    // ✅ Normalize URL (ensure it starts with https://)
    const finalUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;

    const client = await clientPromise;
    const db = client.db("Bitlink");
    const collection = db.collection("url");

    // ✅ Check if the shorturl already exists
    const existing = await collection.findOne({ shorturl });

    if (existing) {
      if (existing.url === finalUrl) {
        // ✅ Same shorturl and same original URL — reuse it
        return new Response(
          JSON.stringify({
            success: true,
            error: false,
            reused: true,
            message: "Short URL created successfully!",
            shorturl,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } else {
        // ❌ shorturl is taken for a different long URL
        return new Response(
          JSON.stringify({
            success: false,
            error: true,
            message: `Short URL "${shorturl}" is already used for a different link.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // ✅ Save new shorturl and long URL pair
    await collection.insertOne({ url: finalUrl, shorturl });

    return new Response(
      JSON.stringify({
        success: true,
        error: false,
        reused: false,
        message: "Short URL created successfully!",
        shorturl,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: "Internal Server Error. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
