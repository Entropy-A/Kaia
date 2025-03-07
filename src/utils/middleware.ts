import {users} from "../backend/server.js";

export const resolveUserIndexByID = (req, res, next) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) return res.status(400).send("Invalid ID");

    const findUserIndex = users.findIndex(user => user.id === parsedId);

    if (findUserIndex === -1) return res.status(404).send("Invalid ID");
    req.findUserIndex = findUserIndex; // adding it to the request for later middleware
    next()
}