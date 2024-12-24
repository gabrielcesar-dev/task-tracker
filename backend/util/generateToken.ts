import { ENV } from "../config/env"
import jwt from "jsonwebtoken"

export const generateJWT = (id: string | object | Buffer) => {
    return jwt.sign({ id }, ENV.JWT_SECRET, {
        expiresIn: '1d'
    })
}