import { Router } from "express";
import { createCategory, deleteCategory, listCategories, updateCategory } from "./category.controller.js";
import { authGuard } from "../auth/auth.middleware.js";
import { roleGuard } from "@/middlewares/roleGuard.js";


const router = Router();

router.get('/', listCategories);

router.post('/', authGuard, roleGuard(['ADMIN', 'SELLER']), createCategory);
router.put('/:id', authGuard, roleGuard(['ADMIN', 'SELLER']), updateCategory);
router.delete('/:id', authGuard, roleGuard(['ADMIN']), deleteCategory);

export default router;