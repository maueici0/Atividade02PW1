import { ServiceTechnology } from "../service/serviceTechnology";
import { Request, Response } from "express";

const serviceTechnology = new ServiceTechnology();

export class TechnologyController {
    async list(req: Request, res: Response) {
        const user = req.user;
        try {
            const technologies = await serviceTechnology.list(user.id);
            return res.status(200).json(req.user.technologies);
        } catch (error) {
            return res.status(404).json(error);
        }
    }
    async create(req: Request, res: Response) {

        const { title, deadline } = req.body;
        const user = req.user;

        try {
            const technology = await serviceTechnology.create(title, deadline, user);
            return res.status(201).json({ technology });
        } catch (error) {
            return res.status(404).json(error);
        }
    }
    async update(req: Request, res: Response) {

        const { title, deadline } = req.body;
        const { id } = req.params;
        const user = req.user;

        try {
            const technology = await serviceTechnology.update(id, title, deadline, user);
            return res.status(200).json(technology);
        } catch (error) {
            return res.status(404).json({ error: "Technology not found" });
        }
    }
    async updateStatus(req: Request, res: Response) {

        const { id } = req.params;
        const user = req.user;

        try {
            const technology = await serviceTechnology.updateStatus(id, user);
            return res.status(200).json(technology);
        } catch (error) {
            return res.status(404).json({ error: "Technology not found" });
        }
    }
    async delete(req: Request, res: Response) {

        const { id } = req.params;
        const user = req.user;

        try {
            await serviceTechnology.delete(id, user);
            const technologies = serviceTechnology.list(id);
            return res.status(200).json({ technologies });
        } catch (error) {
            return res.status(404).json({ error: "Technology not found" })
        }
    }
}