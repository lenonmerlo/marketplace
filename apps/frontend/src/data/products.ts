import Tshirt from "../assets/Product-Tshirt.png";
import Sofa from "../assets/product-sofa.png";
import Beauty from "../assets/product-beuaty.png";
import Utensil from "../assets/product-utensil-tool.png";
import Note from "../assets/product-notebook.png";
import ToyCar from "../assets/product-car-toy.png";

export type ProductStatus = "ANUNCIADO" | "VENDIDO" | "DESATIVADO";
export type Product = {
  [x: string]: string | null | undefined;
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  status: ProductStatus;
  isMobile?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Sofá",
    price: 1200.9,
    description:
      "Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em…",
    image: Sofa,
    status: "ANUNCIADO",
    isMobile: true,
  },
  {
    id: "2",
    title: "Camiseta masculina",
    price: 35.89,
    description:
      "Camiseta básica cinza, confeccionada em algodão 100%, com corte slim fit e gol…",
    image: Tshirt,
    status: "ANUNCIADO",
    isMobile: true,
  },
  {
    id: "3",
    title: "Kit utensílios",
    price: 86.79,
    description:
      "Conjunto com 10 utensílios de cozinha, feitos em madeira de bambu.",
    image: Utensil,
    status: "ANUNCIADO",
    isMobile: true,
  },
  {
    id: "4",
    title: "Kit de cremes",
    price: 159.9,
    description:
      "Conjunto de cuidados com a pele contendo 3 cremes: hidratante facial, cre…",
    image: Beauty,
    status: "ANUNCIADO",
    isMobile: true,
  },
  {
    id: "5",
    title: "Caderno de desenho",
    price: 56.0,
    description:
      "Caderno tamanho A4 com 120 páginas, gramatura 180g/m²; ideal para técni…",
    image: Note,
    status: "VENDIDO",
    isMobile: true,
  },
  {
    id: "6",
    title: "Carro de brinquedo",
    price: 24.6,
    description:
      "Carrinho de brinquedo na cor amarela, feito de metal, com detalhes realistas.",
    image: ToyCar,
    status: "DESATIVADO",
    isMobile: true,
  },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
