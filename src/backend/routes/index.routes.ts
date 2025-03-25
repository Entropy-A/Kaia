import {Router} from "express";
import productsRouter from "./products.routes.js";
import usersRouter from "./users.routes.js";
import {checkSchema, validationResult} from "express-validator";
import {users} from "../server.js"
import passport from "passport";

const router = Router();

router.use("/products", productsRouter)
router.use("/users", usersRouter)

router.get("/", async (request, response ) => {
    request.session.visited = true;

    console.log(request.session.id);

    response.cookie("hello", "w orld", {maxAge: 360000, signed: true};
    response.send({message: "Hello World"});
})

const authValidation = {
    username: {
            notEmpty: true,
        },
    password: {
        notEmpty: true,
    }
}

router.post(
    "/auth",
    passport.authenticate("local"),
    async (request, response ) => {
        response.status(200).send({message: "Authentication"});
    }
)

router.get("/auth/status", async (request, response ) => {
    return request.user ?
        response.status(200).send({ message: `User ${request.session.user.username} is logged in` }) :
        response.status(401).send({ message: "Not logged in " })
})

router.post("/auth/logout", async (request, response ) => {
    if (!request.user) return response.sendStatus(401)

    request.logout((err) => {
        if (err) return response.sendStatus(400)
        return response.status(200).send({msg: "User logged out"})
    })
})

router.post("/cart", async (request, response ) => {
    if (!request.session.user) return response.status(401).send({msg: "not logged in"})

    const {body: item} = request;

    const {cart} = request.session;

    if (cart) cart.push(item)
    else request.session.cart = [item]

    return response.status(201).send(request.session.cart)
}

export default router;