import { prisma } from "../database/repositoryClient";
import { User } from "@prisma/client";

export class ServiceTechnology {

    async list(id: string) {
        try {
            const technologies = await prisma.technology.findMany({
                where: {
                    userId: id
                }
            });

            return technologies;
        }
        catch (error) {
            console.log(error);
            return []
        }
    }

    async create(title: string, deadline: Date, user: User) {
        try {
            const technology = await prisma.technology.findFirst({
                where: {
                    title: title,
                    userId: user.id
                }
            });

            if (technology) {
                throw new Error("Technology already exists");
            }

            const newTechnology = await prisma.technology.create({
                data: {
                    title,
                    studied: false,
                    deadline: new Date(deadline),
                    created_at: new Date(),
                    User: {
                        connect: { id: user.id },
                    }
                }
            });

            return newTechnology;
        } catch (error) {
            console.error("Error creating technology:", error);
            throw error;
        }
    }


    async update(id: string, title: string, deadline: Date, user: User) {
        try {

            const technology = await prisma.technology.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });

            if (!technology) {
                throw new Error("Technology does not exists");;
            }

            const updatedTechnology = await prisma.technology.update({
                where: {
                    id,
                    userId: user.id
                },
                data: {
                    title,
                    deadline: new Date(deadline)
                }
            });

            return updatedTechnology;

        } catch (error) {
            throw error;
        }
    }

    async updateStatus(id: string, user: User) {

        try {

            const technology = await prisma.technology.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });

            if (!technology) {
                throw new Error("Technology does not exists");;
            }

            const updatedTechnology = await prisma.technology.update({
                where: {
                    id,
                    userId: user.id
                },
                data: {
                    studied: true
                }
            });

            return updatedTechnology;

        } catch (error) {
            throw error;
        }

    }

    async delete(id: string, user: User) {

        try {

            const technology = await prisma.technology.findFirst({
                where: {
                    id,
                    userId: user.id
                }
            });

            if (!technology) {
                throw new Error("Technology does not exists");;
            }

            const deletedTechnology = await prisma.technology.delete({
                where: {
                    id,
                    userId: user.id
                }
            })

            return deletedTechnology;
        } catch (error) {
            throw error;
        }

    }
}