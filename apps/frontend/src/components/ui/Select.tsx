type Option = { value: string; label: string };
type Props = { value?: string; onChange?: (v: string) => void; options: Option[]; placeholder?: string; };
export default function Select({ value, onChange, options, placeholder }: Props) {
    return (
        <select
            className="select"
            value={value}
            onChange={e => onChange?.(e.target.value)}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    )
}