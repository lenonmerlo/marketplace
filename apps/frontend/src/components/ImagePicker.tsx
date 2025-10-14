import { useRef } from "react";
import IconUpload from "../assets/icons/image-upload.svg";

type Props = {
  previewUrl?: string | null;
  onPick: (file: File) => void;
  className?: string;
};

export default function ImagePicker({ previewUrl, onPick, className = "" }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const pick = () => ref.current?.click();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) onPick(f);
  }

  return (
    <div className={`rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden ${className}`}>

      <div className="relative aspect-[415/340]">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Pré-visualização"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={pick}
            className="absolute inset-0 grid place-items-center text-center p-6 hover:bg-black/5 transition"
          >
            <div className="flex flex-col items-center gap-3">
              <img src={IconUpload} className="w-8 h-8 opacity-80" />
              <div className="text-sm text-[#6b7280]">
                Selecione uma imagem do produto
                <div className="text-xs opacity-70">PNG, JPG até 5MB</div>
              </div>
            </div>
          </button>
        )}
      </div>

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  );
}
