/* eslint-disable no-unused-vars */
import {Router} from "express";
import {
    index,
    show,
    add,
    edit,
    create,
    update,
    remove

} from "../controllers/CardsController.js";

const router = Router();

router.get("/", index);
router.get("/new",add);
router.get("/:id", show);
router.get("/:id/edit",edit);
router.post("/", create);
router.put("/", update);
router.delete("/:id", remove);

export default router;


