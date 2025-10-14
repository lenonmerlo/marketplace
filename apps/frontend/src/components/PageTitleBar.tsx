import { Link } from "react-router-dom";

type Props = {
  backTo?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode; 
};

export default function PageTitleBar({ backTo, title, subtitle, right }: Props) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        {backTo && (
          <Link to={backTo} className="text-[var(--color-orange-base)] text-sm">&larr; Voltar</Link>
        )}
        <h1 className="text-[28px] font-bold leading-[120%] mt-2">{title}</h1>
        {subtitle && <p className="text-[14px] text-[#7a7a7a]">{subtitle}</p>}
      </div>
      {right && <div className="pt-6">{right}</div>}
    </div>
  );
}
