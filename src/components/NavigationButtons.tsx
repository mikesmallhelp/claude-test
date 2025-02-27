"use client";

import React from 'react';
import Link from 'next/link';

interface NavigationButtonsProps {
  backUrl?: string;
  nextUrl?: string;
  onSubmit?: () => void;
  disableNext?: boolean;
  submitLabel?: string;
}

export default function NavigationButtons({
  backUrl,
  nextUrl,
  onSubmit,
  disableNext = false,
  submitLabel = 'Tallenna'
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      {backUrl ? (
        <Link 
          href={backUrl}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          Takaisin
        </Link>
      ) : (
        <div></div>
      )}
      
      {onSubmit ? (
        <button
          onClick={onSubmit}
          disabled={disableNext}
          className={`px-4 py-2 rounded transition-colors ${
            disableNext
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {submitLabel}
        </button>
      ) : nextUrl ? (
        <Link
          href={nextUrl}
          className={`px-4 py-2 rounded transition-colors ${
            disableNext
              ? 'bg-gray-300 text-gray-500 pointer-events-none'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          aria-disabled={disableNext}
          tabIndex={disableNext ? -1 : undefined}
          onClick={(e) => {
            if (disableNext) {
              e.preventDefault();
            }
          }}
        >
          Seuraava
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}