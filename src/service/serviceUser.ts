import { prisma } from "../database/repositoryClient";

export class ServiceUser {

    async create(name: string, username: string) {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    username
                }
            });

            if (user) {
                throw new Error("User already exists");
            }

            const newUser = await prisma.user.create({
                data: {
                    name,
                    username
                }
            });

            return newUser;
        } catch (error) {
            throw error;
        }

    }

}