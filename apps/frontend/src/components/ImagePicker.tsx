import { useEffect, useRef, useState } from "react";

type Props = {
  onChange?: (file: File | null) => void;
  initialUrl?: string;
};

export default function ImagePicker({ onChange, initialUrl }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);

  useEffect(() => {
    setPreview(initialUrl ?? null);
  }, [initialUrl]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(file);
    } else {
      setPreview(initialUrl ?? null);
      onChange?.(null);
    }
  }

  return (
    <div className="flex items-start gap-4">
      <div className="w-40 h-28 rounded-lg bg-black/5 overflow-hidden grid place-items-center">
        {preview ? (
          <img src={preview} alt="Pré-visualização" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-500">Sem imagem</span>
        )}
      </div>

      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => inputRef.current?.click()}
        >
          Escolher imagem
        </button>
        {preview && (
          <button
            type="button"
            className="btn btn-ghost text-red-600"
            onClick={() => {
              setPreview(null);
              if (inputRef.current) inputRef.current.value = "";
              onChange?.(null);
            }}
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
}
