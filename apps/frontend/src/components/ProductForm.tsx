import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, updateProduct, listCategories } from "../api/products";
import ImagePicker from "./ImagePicker";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  price: z.union([z.number(), z.string()]),
  categoryId: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

type Initial = {
  id?: string;
  title?: string;
  description?: string;
  price?: number | string;
  categoryId?: string;
  imageUrl?: string | null;
};

export default function ProductForm({
  initial,
  onSuccess,
}: {
  initial?: Initial;
  onSuccess?: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

  const defaults = useMemo<FormData>(
    () => ({
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      price: typeof initial?.price === "number" ? (initial!.price / 100) : (initial?.price ?? ""),
      categoryId: initial?.categoryId ?? "",
    }),
    [initial]
  );

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: defaults,
  mode: "onChange",
});

  useEffect(() => {
    let active = true;
    listCategories().then((cats) => { if (active) setCategories(cats); }).catch(() => {});
    return () => { active = false; };
  }, []);

  async function onSubmit(values: FormData) {
    setLoading(true);
    setError(null);
    try {
      const priceCents =
        typeof values.price === "string"
          ? Math.round(parseFloat(values.price.replace(",", ".")) * 100)
          : Math.round(values.price * 100);

      if (initial?.id) {
        await updateProduct(initial.id, {
          title: values.title,
          description: values.description,
          priceCents,
          categoryId: values.categoryId,
          imageFile: file ?? undefined,
          imageUrl: initial.imageUrl ?? null,
        });
      } else {
        await createProduct({
          title: values.title,
          description: values.description,
          priceCents,
          categoryId: values.categoryId,
          imageFile: file,
        });
      }
      onSuccess?.();
    } catch {
      setError("Falha ao salvar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm mb-2">Imagem</label>
        <ImagePicker onChange={setFile} initialUrl={initial?.imageUrl ?? undefined} />
      </div>

      <div>
        <label className="block text-sm mb-2">Título</label>
        <input className="input" {...register("title")} placeholder="Título do produto" />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm mb-2">Descrição</label>
        <textarea className="input min-h-[96px]" {...register("description")} placeholder="Descrição" />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message as string}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Valor (R$)</label>
          <input
            className="input"
            type="number"
            step="0.01"
            inputMode="decimal"
            {...register("price")}
            placeholder="0,00"
          />
          {errors.price && <p className="text-sm text-red-600 mt-1">Valor inválido</p>}
        </div>
        <div>
          <label className="block text-sm mb-2">Categoria</label>
          <select className="select w-full" {...register("categoryId")}>
            <option value="">Selecione</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-sm text-red-600 mt-1">{errors.categoryId.message as string}</p>}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting || loading} className="btn btn-primary">
          {initial?.id ? "Salvar alterações" : "Salvar e Publicar"}
        </button>
        <button type="button" className="btn btn-outline" onClick={() => history.back()}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
