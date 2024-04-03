import express from "express";
import { UserModel } from "../db/user";
import jwt from 'jsonwebtoken';

class UserController {
    register = async (req: express.Request, res: express.Response) => {
        try {
            const { username, email, password } = req.body

            const existingUser = await UserModel.findOne({ email })
            if (existingUser) {
                return res.status(400).json({ message: "user already exists" })
            }
            else {
                const newUser = new UserModel({
                    username,
                    email,
                    password
                })
                await newUser.save()
                res.status(201).json({ message: "user registered successfully" })
            }

        } catch (error) {
            console.error("Error while fetching movies:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            const { email, password } = req.body

            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }
            else {
                const token = jwt.sign({ userId: user._id }, "supersecret")
                res.status(200).json({ token })
            }
        } catch (error) {
            console.error('Error logging in user', error);
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

export default new UserController();
