import { MouseEventHandler } from "react";

export const SortButton = (props: {
  handleSortClick: MouseEventHandler<HTMLButtonElement> | undefined;
  sortByVotes: boolean;
}) => {
  return (
    <button
      onClick={props.handleSortClick}
      className="ml-4 flex gap-1 rounded-full bg-pink-700 px-4 py-2 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-pink-500"
    >
      <span className="block text-white">
        {!props.sortByVotes ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 12h2m-9-2v4a2 2 0 1 0 4 0v-4a2 2 0 1 0-4 0m12 5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.73 17.753L4.5 12.572A5 5 0 1 1 12 6.006a5 5 0 0 1 8.563 5.041m-2.763 9.77l-2.172 1.138a.392.392 0 0 1-.568-.41l.415-2.411l-1.757-1.707a.389.389 0 0 1 .217-.665l2.428-.352l1.086-2.193a.392.392 0 0 1 .702 0l1.086 2.193l2.428.352a.39.39 0 0 1 .217.665l-1.757 1.707l.414 2.41a.39.39 0 0 1-.567.411z"
            />
          </svg>
        )}
      </span>
    </button>
  );
};
