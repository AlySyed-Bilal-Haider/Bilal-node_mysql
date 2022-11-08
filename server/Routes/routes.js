import * as user from "../Controller/user.js";
import express from "express";
const router = express.Router();
router.post("/save", user.saveuser);
router.get("/getuser", user.Readuser);
router.delete("/remove/:id", user.Remove);
router.post("/update", user.updateHandler);
export default router;
