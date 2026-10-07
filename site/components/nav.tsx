"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/hypothesis", label: "Hypothesis" },
  { href: "/method", label: "Method & data" },
  { href: "/conclusion", label: "Conclusion" },
  { href: "/replication", label: "Replication" },
];

export function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-x-8 gap-y-2 px-5 py-3">
        <Link href="/" className="text-sm font-semibold tracking-[0.18em] uppercase">
          Eudai
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {links.map((link) => {
            const current = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={current ? "border-b border-ink pb-0.5" : "text-muted hover:text-ink"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
