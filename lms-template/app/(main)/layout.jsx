import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

const navLinks = [
  { title: "Features", href: "/#features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
  { title: "Documentation", href: "/docs" },
];

const HEADER_HEIGHT = 80; // in px, same as h-20 (20*4=80px)

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 h-20 border-b">
        <div className="container flex h-full items-center justify-between py-6">
          <MainNav items={navLinks} />
        </div>
      </header>

      {/* Main content - centered */}
      <main
        className="flex flex-col items-center justify-center"
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        {children}
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
};

export default MainLayout;
