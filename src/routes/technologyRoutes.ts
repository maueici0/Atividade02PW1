import { Router } from "express";
import { checkExistsUserAccount } from "../middleware/checkExistsUserAccount";
import { TechnologyController } from "../controller/technologyController";

const technologyRoutes = Router();
const technologyController = new TechnologyController();

technologyRoutes.get('/technologies', checkExistsUserAccount, technologyController.list);
technologyRoutes.post('/technologies', checkExistsUserAccount, technologyController.create);
technologyRoutes.put('/technologies/:id', checkExistsUserAccount, technologyController.update);
technologyRoutes.patch('/technologies/:id/studied', checkExistsUserAccount, technologyController.updateStatus);
technologyRoutes.delete('/technologies/:id', checkExistsUserAccount, technologyController.delete);

export default technologyRoutes;