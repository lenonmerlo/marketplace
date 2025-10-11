type Props = { status: 'ANUNCIADO'| 'VENDIDO' | 'DESATIVADO' };

export default function BadgeStatus({ status }: Props) {
    const m = {
        ANUNCIADO: 'badge badge-anunciado',
        VENDIDO: 'badge badge-vendido',
        DESATIVADO: 'badge badge-desativado',
    } as const
    const label = { ANUNCIADO: 'ANUNCIADO', VENDIDO: 'VENDIDO', DESATIVADO: 'DESATIVADO' } [status];
    return <span className={m[status]}>{label}</span>
}