import { RequestHandler } from "express";
import { HttpError } from "../util/httpError";
import userModal from "../models/user.model";
import bcrypt from "bcryptjs"
import { generateJWT } from "../util/generateToken";


interface registerBody {
    name: string;
    email: string;
    password: string;
}

export const register: RequestHandler<{}, {}, registerBody> = async (req, res, next) => {
    const { name, email, password } = req.body

    try {
        if(!name || !email || !password) {
            throw new HttpError("Please add all fields", 400)
        }

        if(await userModal.findOne({ email })) {
            throw new HttpError("User already exists", 400)
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModal({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = generateJWT(user._id); 

        res.cookie('authToken', token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ success: true, message: "Account created successfully!"})

    } catch (error) {
        console.error("Error in register route:", error); 
        next(error)
    }
}

interface loginBody {
    email: string;
    password: string;
}

export const login: RequestHandler<{}, {}, loginBody> = async (req, res, next) => {
    const { email, password } = req.body 

    const user = await userModal.findOne({ email })

    try{
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateJWT(user._id); 

            res.cookie('authToken', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
                
            });

            res.status(201).json({ success: true , message: "You have successfully logged in."})

        } 
        else {
            throw new HttpError("Invalid credentials", 400)
        }
    } catch (error) {
        next(error)
    }
}
