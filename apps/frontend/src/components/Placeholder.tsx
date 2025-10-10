type Props = { title: string }

export default function Placeholder({ title }: Props) {
  return <div style={{ padding: 24, fontFamily: 'sans-serif' }}>{title}</div>
}
