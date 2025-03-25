import express, {Router} from "express";
import {checkSchema, matchedData, query, validationResult} from "express-validator";
import {users} from "../server.js";
import {resolveUserIndexByID} from "../utils/middleware.js";

const router = Router();

router.get(
    "/",
    query("filter")
        .isString()
        .notEmpty().withMessage("Cannot be empty")
        .isLength({min: 3, max: 10}).withMessage("length must be between 3 and 10"),
    (req, res) => {
        const result = validationResult(req)
        console.log(result)

        const {query: {filter, value}} = req;
        if (filter && value) {
            return res.send(
                users.filter(user => user[filter].includes(value))
            )
        }else {
            return res.send(users);
        }
    }
)

const validationSchema = {
    username: {
        notEmpty: {
            errorMessage: "Cannot be empty"
        },
        isString: {
            errorMessage: "Must be a string"
        },
        isLength: {
            options: {min: 5, max: 32},
            errorMessage: "Length must be between 5 and 32"
        }
    }
}

router.post(
    "/",
    checkSchema(validationSchema),
    // will run an array of middleware (functions)
    [(rq, res, next) => {console.log("test"); next()}],
    (request, response) => {
        /*const validation = validationResult(req)
        console.log(validation);

        if (!validation.isEmpty()) {
            return res.status(400).send({error: validation.array()})
        }

        const data = matchedData(req)

        const newUser = {
            id: users.length + 1,
            ...data
        };
        users.push(newUser);
        return res.status(201).send(newUser);*/

        const {body} = request;
    }
)

router.get("/:id", resolveUserIndexByID, (req, res) => {
    const { findUserIndex } = req

    const user = users[findUserIndex];
    if (!user) return res.status(404).send("user not found");

    return res.status(200).send(user);
})

router.put("/:id", resolveUserIndexByID, (req, res) => {
    const {body, findUserIndex} = req;

    users[findUserIndex] = {id: users[findUserIndex].id, ...body};
    console.log(users[findUserIndex])
    return res.sendStatus(200)
})

router.patch("/:id", resolveUserIndexByID, (req, res) => {
    const {body, findUserIndex} = req;

    users[findUserIndex] = {...users[findUserIndex], ...body}
    return res.sendStatus(200)
})

router.delete("/:id", resolveUserIndexByID, (req, res) => {
    const {body, findUserIndex} = req
    users.splice(findUserIndex, 1);
})

export default router;