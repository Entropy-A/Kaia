import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "$/server/core/errors/api.error.js";

function notFoundHandler(version: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const error = new NotFoundError(`Route does not exist on version ${version}`);
        next(error);
    };
}

export default notFoundHandler;