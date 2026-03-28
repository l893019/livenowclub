"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder = "Search..." }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <svg
        className="search-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {query && (
        <button onClick={handleClear} className="search-clear" aria-label="Clear search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      <style jsx>{`
        .search-bar {
          position: relative;
          max-width: 400px;
          margin-bottom: 32px;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(45, 42, 38, 0.4);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 14px 44px;
          font-size: 1rem;
          font-family: inherit;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: white;
          color: var(--charcoal, #1a1a1a);
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--pink, #e84a8a);
        }

        .search-input::placeholder {
          color: rgba(45, 42, 38, 0.4);
        }

        .search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: rgba(45, 42, 38, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .search-clear:hover {
          color: var(--pink, #e84a8a);
        }
      `}</style>
    </div>
  );
}
