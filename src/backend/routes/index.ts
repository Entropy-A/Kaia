import {Router} from "express";
import productsRouter from "./products.js";
import usersRouter from "./users.js";

const router = Router();

router.use("/products", productsRouter)
router.use("/users", usersRouter)

router.get("/", async (request, response ) => {
    response.cookie("hello", "world", {maxAge: 360000};
    response.status(201).send("Hello World!");
})

export default router;