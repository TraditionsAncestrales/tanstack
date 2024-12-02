import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, linkOptions } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { tv, type ClassValue } from "tailwind-variants";
import ListIcon from "~icons/ph/list";
import LogoIcon from "~icons/ta/logo";

// CONST ***********************************************************************************************************************************
const navs = [
  linkOptions({ text: "A propos", to: "/$collection/$slug", params: { collection: "articles", slug: "la-fondatrice" } }),
  linkOptions({ text: "Chamanisme", to: "/$knowledge", params: { knowledge: "chamanisme" } }),
  linkOptions({ text: "Rêves", to: "/$knowledge", params: { knowledge: "reves" } }),
  linkOptions({ text: "Reiki", to: "/$knowledge", params: { knowledge: "reiki" } }),
  linkOptions({ text: "Tarot", to: "/$knowledge", params: { knowledge: "tarot" } }),
  linkOptions({ text: "Boutique", to: "/boutique" }),
];

const leftNavs = navs.slice(0, Math.ceil(0.5 * navs.length));
const rightNavs = navs.slice(Math.ceil(0.5 * navs.length));

// STYLES **********************************************************************************************************************************
const NAV_BURGER = tv({
  slots: {
    ROOT: `p-2 text-sm text-neutral-800 rounded hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200`,
    LINK: `hover:bg-primary block p-4 px-8 font-bold uppercase text-black hover:text-white`,
  },
  variants: {
    isActive: {
      true: { LINK: `bg-primary text-white` },
    },
  },
});

const NAV_LINK = tv({
  base: `text-xs font-bold p-2 uppercase rounded group-data-top:text-white hover:bg-primary hover:text-white`,
  variants: { isActive: { true: "bg-primary text-white [view-transition-name:active-page]" } },
});

// MAIN ************************************************************************************************************************************
export function TheHeader({ className }: TheHeaderProps) {
  const [isScrolled, setScrolled] = useState(typeof window !== "undefined" ? window.scrollY > 0 : false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handler, { capture: false, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={cn(`group bg-white p-2 data-scrolled:bg-white data-scrolled:shadow-lg sm:bg-transparent`, className)}
      data-scrolled={isScrolled}
    >
      <nav className="container mx-auto flex items-center justify-between sm:justify-center sm:group-data-scrolled:justify-between">
        <Link to="/" aria-label="Retour à l'accueil" className="flex items-center gap-1 group-data-scrolled:flex sm:hidden">
          <LogoIcon className="h-12 w-12 fill-neutral-800 text-primary hover:text-primary-400" />
          <hgroup className="font-heading uppercase">
            <h3 className="text-sm leading-none text-neutral-800">Traditions</h3>
            <h4 className="text-xs leading-none text-neutral-500">Ancestrales</h4>
          </hgroup>
        </Link>
        <NavBurger navs={navs} className="sm:hidden" />
        <ul className="hidden items-center sm:flex">
          {leftNavs.map((nav, i) => (
            <NavItem key={i} nav={nav} />
          ))}
          <li>
            <Link to="/">
              <LogoIcon
                aria-label="Retour à l'accueil"
                className="mx-8 h-20 w-20 fill-neutral-800 text-primary hover:text-primary-400 group-data-scrolled:hidden"
              />
            </Link>
          </li>
          {rightNavs.map((nav, i) => (
            <NavItem key={i} nav={nav} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

// NAV BURGER ******************************************************************************************************************************
const { LINK, ROOT } = NAV_BURGER();
function NavBurger({ className, navs }: NavBurgerProps) {
  return (
    <Sheet>
      <SheetTrigger className={ROOT({ className })}>
        <ListIcon />
      </SheetTrigger>
      <SheetContent>
        {navs.map((nav, i) => (
          <Link key={i} {...nav} activeProps={{ className: "bg-primary text-white" }} className={LINK()}>
            {nav.text}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}

// NAV ITEM ********************************************************************************************************************************
function NavItem({ nav }: NavItemProps) {
  return (
    <li className="mx-1">
      <Link {...nav} activeProps={{ className: "bg-primary text-white [view-transition-name:active-page]" }} className={NAV_LINK()}>
        {nav.text}
      </Link>
    </li>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheHeaderProps = { className?: ClassValue };
type NavBurgerProps = { className: string; navs: Nav[] };
type NavItemProps = { nav: Nav };
type Nav = (typeof navs)[number];
