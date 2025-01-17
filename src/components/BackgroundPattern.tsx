export const BackgroundPattern = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 -scale-[3] overflow-hidden opacity-[0.2]">
      {/* <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="staff-pattern"
            x="0"
            y="0"
            width="400"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="20"
              x2="400"
              y2="20"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="40"
              x2="400"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="60"
              x2="400"
              y2="60"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="80"
              x2="400"
              y2="80"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="100"
              x2="400"
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>

          <pattern
            id="vinyl-pattern"
            x="50"
            y="50"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
            <circle cx="100" cy="100" r="5" fill="currentColor" />
          </pattern>
          <pattern
            id="a"
            width="20"
            height="20"
            patternTransform="rotate(15)scale(5)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" fill="#2b2b31" />
            <path
              fill="none"
              stroke="#ecc94b"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
              d="M-4.8 4.44 4 16.59 16.14 7.8M32 30.54l-13.23 7.07 7.06 13.23M-9 38.04l-3.81 14.5 14.5 3.81M65.22 4.44 74 16.59 86.15 7.8M61 38.04l-3.81 14.5 14.5 3.81m-11.98 6.53v3h3M4.84 25.54 2.87 27.8l2.26 1.97m7.65 16.4-2.21-2.03-2.03 2.21m29.26 7.13.56 2.95 2.95-.55m17.67-28.31-2.35-10.74-10.75 2.36M31.98-4.87l2.74 10.65 10.65-2.73M31.98 65.13l2.74 10.66 10.65-2.74M8.42 62.57l6.4 2.82 2.82-6.41m33.13-15.24-4.86-5.03-5.03 4.86m-14-19.64 4.84-5.06-5.06-4.84"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#a)"
          transform="translate(-295 -260)"
        />
        <rect width="200%" height="200%" fill="url(#staff-pattern)" />
        <rect
          width="200%"
          height="200%"
          fill="url(#vinyl-pattern)"
          className="scale-[0.5]  translate-x-1/4 translate-y-1/4"
        />
      </svg> */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern
            id="a"
            width="53.101"
            height="79.65"
            patternTransform="rotate(65)scale(3)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" fill="#011628" />
            <path
              fill="none"
              stroke="#e71d34"
              stroke-width="2"
              d="M57.589 69.148 45.16 81.466M55.4 65.24 41.735 78.784M50.49 64.03 38.873 75.544m5.424-11.453L37 71.324m20.642-1.662-.006.002a5.98 5.98 0 0 0-1.747-3.985 6.006 6.006 0 0 0-8.495 0l-.125.125-.125-.125a6.006 6.006 0 0 0-8.495 0 5.98 5.98 0 0 0-1.747 3.985l-.006-.002s-1.022 6.436 10.362 13.126l.009.009.003-.002.003.002.009-.01c11.382-6.689 10.36-13.125 10.36-13.125Zm-.053-80.164L45.16 1.816M55.4-14.408 41.735-.866M50.49-15.62 38.873-4.106m5.424-11.453L37-8.326m20.642-1.662-.006.002a5.98 5.98 0 0 0-1.747-3.985 6.006 6.006 0 0 0-8.495 0l-.125.125-.125-.125a6.006 6.006 0 0 0-8.495 0 5.98 5.98 0 0 0-1.747 3.985l-.006-.002S35.874-3.552 47.258 3.138l.009.009.003-.002.003.002.009-.01c11.382-6.689 10.36-13.125 10.36-13.125ZM4.488 69.148-7.94 81.466M2.299 65.24l-13.663 13.543m8.752-14.753-11.615 11.513m5.423-11.453-7.297 7.233m20.642-1.662-.006.002a5.98 5.98 0 0 0-1.746-3.985 6.006 6.006 0 0 0-8.495 0l-.125.125-.126-.125a6.006 6.006 0 0 0-8.495 0 5.98 5.98 0 0 0-1.746 3.985l-.006-.002s-1.023 6.436 10.361 13.126l.01.009.002-.002.003.002.01-.01c11.382-6.689 10.36-13.125 10.36-13.125ZM33.283 29.32 20.854 41.639m10.24-16.224L17.43 38.957m8.753-14.753L14.567 35.717m5.424-11.452-7.297 7.232m20.642-1.662-.006.002a5.98 5.98 0 0 0-1.747-3.985 6.006 6.006 0 0 0-8.494 0l-.126.125-.125-.125a6.006 6.006 0 0 0-8.495 0 5.98 5.98 0 0 0-1.747 3.985l-.006-.002s-1.022 6.437 10.362 13.126l.009.009.003-.002.003.002.009-.01c11.382-6.688 10.36-13.125 10.36-13.125ZM4.488-10.502-7.94 1.816M2.299-14.408-11.364-.866m8.752-14.753L-14.227-4.106m5.423-11.453-7.297 7.233M4.541-9.988l-.006.002a5.98 5.98 0 0 0-1.746-3.985 6.006 6.006 0 0 0-8.495 0l-.125.125-.126-.125a6.006 6.006 0 0 0-8.495 0 5.98 5.98 0 0 0-1.746 3.985l-.006-.002S-17.227-3.552-5.843 3.138l.01.009.002-.002.003.002.01-.01C5.563-3.551 4.541-9.987 4.541-9.987Z"
            />
            <path
              fill="none"
              stroke="#2fc6b7"
              stroke-width="2"
              d="M31.106 13.62h4m-2-2v4m9.462 11.313h4m-2-2v4M6.806 53.445h4m-2-2v4m4.962 11.313h4m-2-2v4"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          fill="url(#a)"
          transform="translate(-273 -399)"
        />
      </svg>
    </div>
  );
};
