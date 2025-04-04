import { Request, Response, NextFunction } from "express";

function asyncHandler() {
    return function (
        target: unknown,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (request: Request, response: Response, next: NextFunction) {
            Promise.resolve(originalMethod.call(this, request, response)).catch(next);
        };
        
        return descriptor;
    };
}

export default asyncHandler;