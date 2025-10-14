import { useState } from "react";
import ImagePicker from "./ImagePicker";

export type ProductFormValues = {
  title: string;
  description: string;
  price: string;    
  category: string;
  imageFile?: File | null;
  imageUrl?: string | null; 
};

type Props = {
  initial?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  submitLabel?: string;        
  onCancel?: () => void;
};

export default function ProductForm({ initial = {}, onSubmit, submitLabel = "Salvar e publicar", onCancel }: Props) {
  const [f, setF] = useState<ProductFormValues>({
    title: initial.title ?? "",
    description: initial.description ?? "",
    price: initial.price ?? "",
    category: initial.category ?? "Móvel",
    imageFile: null,
    imageUrl: initial.imageUrl ?? null,
  });

  function handlePick(file: File) {
    setF(s => ({ ...s, imageFile: file, imageUrl: URL.createObjectURL(file) }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.title.trim()) return alert("Informe o título");
    if (!f.price.trim()) return alert("Informe o valor");
    onSubmit(f);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[415px_minmax(0,1fr)] gap-8">
      <ImagePicker previewUrl={f.imageUrl ?? null} onPick={handlePick} />

      <form onSubmit={submit} className="rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-[16px] font-semibold text-[var(--color-gray-500)] mb-6">Dados do produto</h2>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_240px] gap-6">
          <div>
            <Label>TÍTULO</Label>
            <input
              className="input"
              placeholder="Ex.: Sofá"
              value={f.title}
              onChange={(e) => setF(s => ({ ...s, title: e.target.value }))}
            />
          </div>

          <div>
            <Label>VALOR</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a]">R$</span>
              <input
                className="input pl-10"
                inputMode="decimal"
                placeholder="0,00"
                value={f.price}
                onChange={(e) => setF(s => ({ ...s, price: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Label>DESCRIÇÃO</Label>
          <textarea
            className="textarea min-h-[152px]"  
            rows={6}
            placeholder="Detalhes do produto…"
            value={f.description}
            onChange={(e) => setF(s => ({ ...s, description: e.target.value }))}
          />
        </div>

        <div className="mt-6">
          <Label>CATEGORIA</Label>
          <select
            className="select appearance-none"
            value={f.category}
            onChange={(e) => setF(s => ({ ...s, category: e.target.value }))}
          >
            <option>Móvel</option>
            <option>Vestuário</option>
            <option>Beleza</option>
            <option>Brinquedos</option>
            <option>Eletrônicos</option>
          </select>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button type="button" onClick={onCancel} className="btn btn-outline w-full">Cancelar</button>
          <button type="submit" className="btn btn-primary w-full">{submitLabel}</button>
        </div>
      </form>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[12px] tracking-[.12em] text-[#6b7280] mb-2 uppercase">
      {children}
    </label>
  );
}