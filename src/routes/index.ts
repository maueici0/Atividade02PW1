import express from "express";
import userRoutes from "./userRoutes";
import technologyRoutes from "./technologyRoutes";

const router = express.Router();

router.use(userRoutes);
router.use(technologyRoutes);

export default router;