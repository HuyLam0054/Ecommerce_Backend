import { Router } from "express";
import { getAllUsers, addUser } from "../controllers/user.controller";

const ctrls = require("../controllers/user.controller");

const router = Router();

router.get("/users", ctrls.getAllUsers);
router.post("/users", ctrls.addUser);

export default router;
