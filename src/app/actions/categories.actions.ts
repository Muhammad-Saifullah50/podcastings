'use server'
import { db } from "@/lib/prisma"

export const getCategories = async () => {
    const categoroies = await db.category.findMany()
    return categoroies
}