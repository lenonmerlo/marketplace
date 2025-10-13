type Props = {
  icon: string
  value: string | number
  labelA: string
  labelB: string
}

export default function StatCard({ icon, value, labelA, labelB }: Props) {
  return (
    <div className="h-[112px] rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    flex items-center gap-4 px-5">
      <div className="w-14 h-14 rounded-[16px] bg-[var(--color-shape)] grid place-items-center">
        <img src={icon} alt="" className="w-6 h-6" />
      </div>
      <div>
        <div className="text-[28px] font-bold leading-[120%]">{value}</div>
        <div className="text-[12px] leading-[120%] text-[#656565]">
          {labelA}<br />{labelB}
        </div>
      </div>
    </div>
  )
}
