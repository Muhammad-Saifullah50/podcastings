import { db } from "@/lib/prisma"

export const getUserByAuthorId = async (authorId: string) => {

    try {
        const author =  await db.user.findUnique({
            where: {
                userId: authorId
            }
        });
        return author
    } catch (error) {
        console.error(error)
    }
  
}