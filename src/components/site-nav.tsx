import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { user, ready, logout } = useAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hash = useRouterState({ select: (state) => state.location.hash });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link to="/" className="lux-rise group flex items-center" aria-label="William L. Todd">
          <img src="/logo.png" alt="" className="h-12 w-auto object-contain transition duration-500 group-hover:scale-105" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" hash="intro" activeOptions={{ exact: true, includeHash: true }} className="nav-link">
            Introduction
          </Link>
          <Link to="/" hash="portfolio" activeOptions={{ exact: true, includeHash: true }} className="nav-link">
            Portfolio
          </Link>
          <Link to="/" hash="experience" activeOptions={{ exact: true, includeHash: true }} className="nav-link">
            Experience
          </Link>
          <Link to="/" hash="contact" activeOptions={{ exact: true, includeHash: true }} className="nav-link">
            Contact
          </Link>
          <span className={cn("flex items-center gap-8", !ready && "invisible")}>
            {user ? (
              <>
                <Link to="/dashboard" className={cn("nav-link", pathname === "/dashboard" && "is-active")}>
                  Dashboard
                </Link>
                <button type="button" onClick={logout} className="nav-link">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={cn("nav-link", pathname === "/login" && "is-active")}>
                  Login
                </Link>
                <Link to="/signup" className="gold-btn lux-btn">
                  Sign up
                </Link>
              </>
            )}
          </span>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-[oklch(0.82_0.11_85/0.45)] text-foreground transition duration-300 hover:border-accent md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lux-rise border-t border-[oklch(0.82_0.11_85/0.18)] bg-[oklch(0.09_0.045_255/0.98)] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link to="/" hash="intro" activeOptions={{ exact: true, includeHash: true }} className="nav-link w-fit py-2">
              Introduction
            </Link>
            <Link to="/" hash="portfolio" activeOptions={{ exact: true, includeHash: true }} className="nav-link w-fit py-2">
              Portfolio
            </Link>
            <Link to="/" hash="experience" activeOptions={{ exact: true, includeHash: true }} className="nav-link w-fit py-2">
              Experience
            </Link>
            <Link to="/" hash="contact" activeOptions={{ exact: true, includeHash: true }} className="nav-link w-fit py-2">
              Contact
            </Link>
            {ready &&
              (user ? (
                <>
                  <Link to="/dashboard" className="nav-link w-fit py-2">
                    Dashboard
                  </Link>
                  <button type="button" onClick={logout} className="nav-link w-fit py-2 text-left">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link w-fit py-2">
                    Login
                  </Link>
                  <Link to="/signup" className="gold-btn lux-btn mt-2 w-fit">
                    Sign up
                  </Link>
                </>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="lux-fade mt-auto w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row md:px-8">
        <span>© 2026 William L. Todd</span>
        <span>Connecting the world from California</span>
      </div>
    </footer>
  );
}
