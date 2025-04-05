"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shorturl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reset the copied state after animation completes
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Link copied to clipboard!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error("Failed to copy!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      console.error("Copy failed:", err);
    }
  };

  const generate = () => {
    if (!url) {
      toast.error("Please enter a URL to shorten", {
        position: "bottom-right",
      });
      return;
    }

    if (!shorturl) {
      toast.error("Please enter your preferred short URL text", {
        position: "bottom-right",
      });
      return;
    }

    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, shorturl }),
    };

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
        toast.success(result.message, {
          position: "bottom-right",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      <ToastContainer />
      
      <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg shadow-md flex flex-col gap-4">
        <h1 className="font-bold text-2xl text-purple-800">Generate your short URLs</h1>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="url-input" className="text-sm font-medium text-purple-700">Original URL</label>
            <input
              id="url-input"
              type="text"
              value={url}
              className="px-4 py-2 focus:outline-purple-600 rounded-md border border-purple-200 shadow-sm"
              placeholder="https://example.com/very-long-url"
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="shorturl-input" className="text-sm font-medium text-purple-700">Custom Short URL</label>
            <input
              id="shorturl-input"
              type="text"
              value={shorturl}
              className="px-4 py-2 focus:outline-purple-600 rounded-md border border-purple-200 shadow-sm"
              placeholder="mylink"
              onChange={(e) => setShortUrl(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            onClick={generate}
            className={`rounded-lg shadow-md p-3 py-2 my-3 font-bold text-white cursor-pointer transition-all flex items-center justify-center gap-2 ${
              loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <lord-icon
                  src="https://cdn.lordicon.com/xjovhxra.json"
                  trigger="loop"
                  colors="primary:#ffffff"
                  style={{ width: "24px", height: "24px" }}
                ></lord-icon>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <lord-icon
                  src="https://cdn.lordicon.com/wloilxuq.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#ffffff"
                  style={{ width: "24px", height: "24px" }}
                ></lord-icon>
                <span>Generate</span>
              </>
            )}
          </button>
        </div>

        {generated && (
          <div className="mt-4 bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg text-purple-800">Your Shortened Link:</span>
              <button 
                onClick={() => copyToClipboard(generated)}
                className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors p-1"
                aria-label="Copy to clipboard"
              >
                <lord-icon
                  src={copied ? "https://cdn.lordicon.com/zrkkrrpl.json" : "https://cdn.lordicon.com/lywgqtim.json"}
                  trigger={copied ? "loop" : "hover"}
                  colors="primary:#7c3aed,secondary:#7c3aed"
                  style={{ width: "28px", height: "28px" }}
                ></lord-icon>
                <span className="text-sm font-medium">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            
            <div className="flex items-center">
              <Link 
                href={generated} 
                target="_blank"
                className="flex-1 bg-purple-50 p-3 rounded border border-purple-200 text-purple-900 font-mono break-all hover:bg-purple-100 transition-colors"
              >
                {generated}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Shorten;