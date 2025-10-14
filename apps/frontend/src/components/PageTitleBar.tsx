type Props = {
  title: string;
  onBack?: () => void;
};

export default function PageTitleBar({ title, onBack }: Props) {
  return (
    <div className="flex items-center gap-3">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Voltar
        </button>
      )}
      <h1 className="text-[24px] font-bold leading-[120%]">{title}</h1>
    </div>
  );
}
