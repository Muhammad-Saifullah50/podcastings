'use server'

import { db } from "@/lib/prisma"

export const getDbUser = async (email: string) => {

    try {
        const user =  await db.user.findUnique({
            where: {
                emailaddress: email
            }
        });
        return user
    } catch (error) {
        console.error(error)
    }
}