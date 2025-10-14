import type { InputHTMLAttributes } from "react";

export function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-sm text-[var(--color-grey-300)] mb-1">{children}</label>
}

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={`input ${props.className ?? ''}`} />
}