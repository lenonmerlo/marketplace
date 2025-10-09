import { PrismaClient } from '@prisma/client'
import { slugify } from '../src/utils/slugify'

const prisma = new PrismaClient()

async function seedCategories() {
  const base = [
    'Eletrônicos',
    'Moda',
    'Casa e Cozinha',
    'Esportes e Lazer',
    'Livros',
    'Beleza e Cuidados Pessoais',
  ]

  for (const name of base) {
    const slug = slugify(name)
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    })
  }
}

async function main() {
  await seedCategories()

}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
