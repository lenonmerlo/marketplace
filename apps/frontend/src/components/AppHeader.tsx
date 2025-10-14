import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/Logo.png";
import Avatar from "../assets/avatar.png";
import IconPlus from "../assets/icons/icon-plus.svg";
import IconDash from "../assets/icons/chart-histogram.svg";
import IconBox from "../assets/icons/package.svg";

import NavTab from "./NavTab";

type Props = {
  active?: "dashboard" | "products";
  showNewButton?: boolean;
};

export default function AppHeader({ active = "dashboard", showNewButton = true }: Props) {
  const [showSecret, setShowSecret] = useState(false);
  const hoverTimer = useRef<number | null>(null);

  const armTimer = () => {
    if (hoverTimer.current) return;
    hoverTimer.current = window.setTimeout(() => setShowSecret(true), 7000);
  };

  const disarmTimer = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setShowSecret(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        window.clearTimeout(hoverTimer.current);
      }
    };
  }, []);

  return (
    <header className="h-20 flex items-center">
      <div className="mx-auto w-full max-w-[1200px] px-4 flex items-center justify-between">
        <img src={Logo} alt="Marketplace" className="h-10 w-auto" />

        <nav className="hidden md:flex items-center gap-6">
          <NavTab
            to="/dashboard"
            active={active === "dashboard"}
            icon={<img src={IconDash} className="w-4 h-4" />}
          >
            Dashboard
          </NavTab>

          <NavTab
            to="/products"
            active={active === "products"}
            icon={<img src={IconBox} className="w-4 h-4" />}
          >
            Produtos
          </NavTab>
        </nav>

        <div className="flex items-center gap-4">
          {showNewButton && (
            <div
              className="relative"
              onMouseEnter={armTimer}
              onMouseLeave={disarmTimer}
              onFocus={armTimer}
              onBlur={disarmTimer}
            >
              <Link
                to="/products/new"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px]
                           bg-[var(--color-orange-base)] text-white hover:bg-[var(--color-orange-dark)]"
              >
                <img src={IconPlus} className="w-4 h-4 brightness-0 invert" />
                <span>Novo produto</span>
              </Link>

              {showSecret && (
                <div
                  className="absolute right-0 mt-2 rounded-md bg-black text-white text-xs px-3 py-2 shadow-lg
                             animate-in fade-in slide-in-from-top-1"
                  role="tooltip"
                >
                  Tá esperando o quê? Boraa moeer!! 🚀
                </div>
              )}
            </div>
          )}

          <img src={Avatar} alt="Perfil" className="w-10 h-10 rounded-full object-cover" />
        </div>
      </div>
    </header>
  );
}
