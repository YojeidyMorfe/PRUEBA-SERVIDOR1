import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "../user/model/user.model.js";


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false 
    },
    entities: [User],
    synchronize: true
});