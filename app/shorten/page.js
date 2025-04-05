"use client";
import Link from "next/link";
import React, { useState } from "react";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shorturl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!url || !shorturl) {
      alert("Please enter both URL and short URL text.");
      return;
    }

    setLoading(true); // Start loading

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, shorturl }), // Ensure correct data structure
    };
    console.log("URL:", url, "ShortURL:", shorturl);  // Debugging line


    fetch("/api/generate", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response.json();
      })
      .then((result) => {
        if (!result.success) throw new Error(result.message);
        setGenerated(`${window.location.origin}/${shorturl}`);
        setUrl("");
        setShortUrl("");
        alert(result.message);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Generate your short URLs</h1>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={url}
          className="px-4 py-2 focus:outline-purple-600 rounded-md"
          placeholder="Enter your URL"
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />

        <input
          type="text"
          value={shorturl}
          className="px-4 py-2 focus:outline-purple-600 rounded-md"
          placeholder="Enter your preferred short URL text"
          onChange={(e) => setShortUrl(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={generate}
          className={`rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white ${loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-500"
            }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {generated && (
        <>
          <span className="font-bold text-lg">Your Link: </span>
          <code>
            <Link target="_blank" href={generated}>
              {generated}
            </Link>
          </code>
        </>
      )}
    </div>
  );
};

export default Shorten;
