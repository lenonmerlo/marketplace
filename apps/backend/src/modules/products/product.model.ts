export type ProductStatus = 'ANUNCIADO' | 'VENDIDO' | 'DESATIVADO';

export type ProductDTO = {
    id: string;
    title: string;
    description: string;
    price: number;
    status: ProductStatus;
    imageUrl: string | null;
    category: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateProductInput = {
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string | null;
}

export type UpdateProductInput = Partial<CreateProductInput> & {
    status?: ProductStatus;
}