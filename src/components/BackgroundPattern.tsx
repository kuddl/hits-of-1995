import React, {  useState } from 'react';

export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
      <svg 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg"
        
      >
        <defs>
          <pattern id="notes-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M40 30v40m0 0q-5 0-10 5t-5 10q0 10 15 10t15-10q0-5-5-10t-10-5" stroke="currentColor" fill="currentColor"/>
            <circle cx="120" cy="40" r="6" fill="currentColor"/>
            <line x1="120" y1="40" x2="120" y2="80" stroke="currentColor" strokeWidth="3"/>
            <path d="M160 120c-10-10-10-20 0-30s10-20 0-30c-15 20-15 40 0 60z" stroke="currentColor" fill="currentColor"/>
          </pattern>

          <pattern id="guitar-pattern" x="100" y="100" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M50 50c0-20 40-20 40 0v60c20 20 20 40 0 60c-40 20-40-20-40-60z" stroke="currentColor" fill="none" strokeWidth="2"/>
            <line x1="60" y1="60" x2="60" y2="160" stroke="currentColor" strokeWidth="1"/>
            <line x1="70" y1="60" x2="70" y2="160" stroke="currentColor" strokeWidth="1"/>
            <line x1="80" y1="60" x2="80" y2="160" stroke="currentColor" strokeWidth="1"/>
          </pattern>

          <pattern id="piano-pattern" x="0" y="0" width="250" height="100" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="35" height="100" stroke="currentColor" fill="none"/>
            <rect x="35" y="0" width="35" height="100" stroke="currentColor" fill="none"/>
            <rect x="70" y="0" width="35" height="100" stroke="currentColor" fill="none"/>
            <rect x="25" y="0" width="20" height="60" fill="currentColor"/>
            <rect x="60" y="0" width="20" height="60" fill="currentColor"/>
          </pattern>

          <pattern id="staff-pattern" x="0" y="0" width="400" height="100" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="1"/>
            <line x1="0" y1="40" x2="400" y2="40" stroke="currentColor" strokeWidth="1"/>
            <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" strokeWidth="1"/>
            <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="1"/>
            <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1"/>
          </pattern>

          <pattern id="vinyl-pattern" x="50" y="50" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="100" cy="100" r="80" stroke="currentColor" fill="none" strokeWidth="2"/>
            <circle cx="100" cy="100" r="60" stroke="currentColor" fill="none" strokeWidth="1"/>
            <circle cx="100" cy="100" r="40" stroke="currentColor" fill="none" strokeWidth="1"/>
            <circle cx="100" cy="100" r="20" stroke="currentColor" fill="none" strokeWidth="1"/>
            <circle cx="100" cy="100" r="5" fill="currentColor"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#staff-pattern)" className="animate-pulse"/>
        <rect width="100%" height="100%" fill="url(#notes-pattern)" className="animate-pulse delay-100"/>
        <rect width="100%" height="100%" fill="url(#vinyl-pattern)" className="animate-pulse delay-200"/>
        <rect width="100%" height="100%" fill="url(#guitar-pattern)" className="animate-pulse delay-300"/>
        <rect width="100%" height="100%" fill="url(#piano-pattern)" className="animate-pulse delay-400"/>
      </svg>
    </div>
  );
}