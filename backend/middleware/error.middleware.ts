import { NextFunction, Response } from "express";
import { HttpError } from "../util/httpError";

export const errorMidddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(err.stack);

    let statusCode = 500
    let message = "Server Error"

    if(err instanceof HttpError) {
        statusCode = err.status
        message = err.message
    }

    res.status(statusCode).json({ success: false, message: message })
    next()
}