'use client';

import { useState, useEffect } from "react";
import { Share2, Check } from "lucide-react";

interface ShareBarProps {
  title: string;
  image: string;
}

// Inline SVGs — avoids loading the entire Font Awesome bundle for 4 icons
function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

export default function ShareBar({ title, image }: ShareBarProps) {
  const [url, setUrl] = useState("");
  const [absImage, setAbsImage] = useState(image);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    if (!image.startsWith('http')) {
      const origin = window.location.origin;
      setAbsImage(`${origin}${image.startsWith('/') ? '' : '/'}${image}`);
    } else {
      setAbsImage(image);
    }
  }, [image]);

  const shareLinks = [
    {
      name: "Facebook",
      Icon: FacebookIcon,
      color: "hover:text-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "X (Twitter)",
      Icon: TwitterIcon,
      color: "hover:text-[#000000]",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      Icon: LinkedInIcon,
      color: "hover:text-[#0077B5]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Pinterest",
      Icon: PinterestIcon,
      color: "hover:text-[#E60023]",
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(absImage)}&description=${encodeURIComponent(title)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-y border-gray-100">
      <div className="flex items-center gap-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold">
          Share Article
        </span>
        <div className="flex items-center gap-3" role="list" aria-label="Share on social media">
          {shareLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label={`Share on ${s.name}`}
              className={`w-10 h-10 flex items-center justify-center border border-gray-100 rounded-full text-gray-400 ${s.color} hover:border-current transition-all duration-300`}
            >
              <s.Icon />
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={copyToClipboard}
        aria-label={copied ? "Link copied to clipboard" : "Copy article link"}
        className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gold-text hover:text-gold-text transition-colors min-w-[120px] justify-end"
      >
        {copied ? (
          <>
            <Check size={14} className="animate-in zoom-in duration-300" />
            <span className="animate-in fade-in slide-in-from-right-2">Copied!</span>
          </>
        ) : (
          <>
            <Share2 size={14} />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
