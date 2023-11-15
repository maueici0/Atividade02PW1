import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/repositoryClient";

export async function checkExistsUserAccount(req: Request, res: Response, next: NextFunction) {

    const { username } = req.headers as { username: string };

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (!user) {
        return res.status(404).json({ "error": "User doesn't exists" });
    }
    req.user = user;
    return next();
}
