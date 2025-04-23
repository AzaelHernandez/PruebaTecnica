import { config } from "dotenv";
import dotenv from "dotenv";

config();

export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET;


dotenv.config();
