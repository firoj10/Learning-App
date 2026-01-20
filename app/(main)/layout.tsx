// import { MainNav } from "@/components/main-nav";
import { MainNav } from "@/components/MainNav";

import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

/* ---------------- types ---------------- */

type NavLink = {
  title: string;
  href: string;
};

/* ---------------- data ---------------- */

const navLinks: NavLink[] = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
];

/* ---------------- layout ---------------- */

const MainLayout = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b ">
        <SessionProvider>
          <div className="container mx-auto w-full max-w-7xl px-4 flex h-20 items-center justify-between py-6 ">
            <MainNav items={navLinks} />
          </div>
        </SessionProvider>
      </header>

      <main className="flex-1 pt-20 flex flex-col">{children}</main>

      {/* <SiteFooter /> */}
    </div>
  );
};

export default MainLayout;
