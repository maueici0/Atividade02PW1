import { ServiceUser } from "../service/serviceUser";
import { Request, Response } from "express";

const serviceUser = new ServiceUser();

export class UserController {
    async create(req: Request, res: Response) {
        const { name, username } = req.body;
        try {
            const user = await serviceUser.create(name, username);
            return res.status(201).json(user);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}