import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const secretKey = process.env.jwt_key;

export const signPayload = (payload, time) => {
} 