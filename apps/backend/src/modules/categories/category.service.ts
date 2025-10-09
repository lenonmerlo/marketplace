import { CategoryRepository } from './category.repository.js'
import { slugify } from '@/utils/slugify.js'
import { AppError } from '@/core/errors.js'

export class CategoryService {
  constructor(private repo = new CategoryRepository()) {}

  listAll(q?: string) {
    return this.repo.listAll(q)
  }

  async create(input: { name: string }) {
    const slug = slugify(input.name)
    const exists = await this.repo.getBySlug(slug)
    if (exists) throw new AppError('Categoria já existe', 409)
    return this.repo.create({ name: input.name, slug })
  }

  async update(id: string, input: { name: string }) {
    const current = await this.repo.getById(id)
    if (!current) throw new AppError('Categoria não encontrada', 404)

    const slug = slugify(input.name)
    const conflict = await this.repo.getBySlug(slug)
    if (conflict && conflict.id !== id) {
      throw new AppError('Já existe outra categoria com este nome', 409)
    }

    return this.repo.update(id, { name: input.name, slug })
  }

  async remove(id: string) {
    const current = await this.repo.getById(id)
    if (!current) throw new AppError('Categoria não encontrada', 404)

    const count = await this.repo.countProducts(id)
    if (count > 0) {
      throw new AppError('Categoria com produtos vinculados não pode ser removida.', 400)
    }

    await this.repo.delete(id)
  }
}
