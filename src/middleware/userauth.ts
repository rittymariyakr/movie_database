import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Usermodel extends express.Request{
userData?:{userId:string}
}

const authMiddleware = (req: Usermodel, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const accessToken = jwt.verify(token, "supersecret ") as {userId:string}
        req.userData = { userId: accessToken.userId }
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }

}

export default authMiddleware