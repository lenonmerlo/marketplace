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
            <Link
              to="/products/new"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px]
                         bg-[var(--color-orange-base)] text-white hover:bg-[var(--color-orange-dark)]"
            >
              <img src={IconPlus} className="w-4 h-4 brightness-0 invert" />
              <span>Novo produto</span>
            </Link>
          )}
          <img src={Avatar} alt="Perfil" className="w-10 h-10 rounded-full object-cover" />
        </div>
      </div>
    </header>
  );
}
