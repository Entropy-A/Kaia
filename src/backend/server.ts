import express, {NextFunction, Request, Response} from "express"
import {Logger, LoggerOrigin} from "../utils/index.js";
import {connectDb} from "./config/db/index.js";
import {IStatistic} from "./models/index.js";
import statisticRouter from "./routes/statistics.js";
import {Keys} from "../keys/keys.js";
import validator, {body, checkSchema, matchedData, query, validationResult} from "express-validator";
import {IsEmptyOptions} from "express-validator/lib/options.js";

const logger = new Logger(LoggerOrigin.SERVER);
const app = express();

app.use("/statistics", statisticRouter);

app.listen(Keys.PORT, () => {
    logger.log(`Server started at [http://localhost:${Keys.PORT}]`);
    const connection = connectDb();
    logger.log(`MongoDB connected to [${connection.connection.host}]`);
})

// TUTORIAL
app.use(express.json())

const users = [
    {id: 1, username: "joe", displayName: "Joe"},
    {id: 2, username: "donald", displayName: "Donald"},
    {id: 3, username: "melania", displayName: "Melania"},
    {id: 4, username: "xxanus", displayName: "Nibba"},
    {id: 5, username: "anton", displayName: "Anton"},
    {id: 6, username: "moloch", displayName: "Satan"},

]

const resolveUserIndexByID = (req, res, next) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) return res.status(400).send("Invalid ID");

    const findUserIndex = users.findIndex(user => user.id === parsedId);

    if (findUserIndex === -1) return res.status(404).send("Invalid ID");
    req.findUserIndex = findUserIndex; // adding it to the request for later middleware
    next()
}

app.get("/", (req, res, next) => {
    console.log("base url");
    next();
}, (req, res) => {
    res.send("Hello World!")
});

// Validation, with message after every check -> corrensponding message
app.get("/api/users", query("filter").isString().notEmpty().withMessage("Cannot be empty").isLength({min: 3, max: 10}).withMessage("length must be between 3 and 10"), (req, res) => {
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
})

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

app.post(
    "/api/users",
    checkSchema(validationSchema),
    // will run an array of middleware (functions)
    [(rq, res, next) => {console.log("test"); next()}],
    (req, res) => {
        const validation = validationResult(req)
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
        return res.status(201).send(newUser);
    }
)

app.get("/api/users/:id", resolveUserIndexByID, (req, res) => {
    const { findUserIndex } = req

    const user = users[findUserIndex];
    if (!user) return res.status(404).send("user not found");

    return res.status(200).send(user);
})

app.put("/api/users/:id", resolveUserIndexByID, (req, res) => {
    const {body, findUserIndex} = req;

    users[findUserIndex] = {id: users[findUserIndex].id, ...body};
    console.log(users[findUserIndex])
    return res.sendStatus(200)
})

app.patch("/api/users/:id", resolveUserIndexByID, (req, res) => {
    const {body, findUserIndex} = req;

    users[findUserIndex] = {...users[findUserIndex], ...body}
    return res.sendStatus(200)
})

app.delete("/api/users/:id", resolveUserIndexByID, (req, res) => {
    const {body, findUserIndex} = req
    users.splice(findUserIndex, 1);
})