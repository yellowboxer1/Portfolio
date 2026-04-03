"use client";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body className="antialiased bg-black text-white overflow-x-hidden">
      {children}
    </body>
  );
}
