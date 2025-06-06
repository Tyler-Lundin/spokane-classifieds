"use client";

export default function MobileButton({
    isOpen,
    setIsOpen,
  }: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }) {
    const icon = isOpen ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-x"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
      >
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      </svg>
    );
  
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 md:hidden rounded-xl backdrop-blur-md bg-white/60 dark:bg-black/50 text-black dark:text-white shadow-md shadow-black/5 dark:shadow-white/5
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-lg
          active:scale-95 active:shadow-sm
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {icon}
      </button>
    );
  }
  