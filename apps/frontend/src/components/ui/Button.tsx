import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' };

export default function Button({ variant = 'primary', className = '', ...p }: Props) {
    const base = 'btn' + (variant === 'primary' ? 'btn-primary' : 'btn-outline');
    return <button {...p} className={`${base} ${className}`} />
}