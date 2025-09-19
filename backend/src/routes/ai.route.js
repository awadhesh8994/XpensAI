import { Router } from "express";
import { getSuggestions } from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.post("/ai/suggestions", getSuggestions);

export default aiRouter;
