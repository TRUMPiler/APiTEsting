import express from 'express';
import cors from 'cors';
import records from './routes/records';
import dotenv from "dotenv";
import bodyparser from "body-parser";
dotenv.config();

let port:number|string=process.env.PORT || 5000;
let app:express.Application=express();
app.use(cors());
app.use(express.json());
app.use(records);
app.use(express.urlencoded({ extended: true })); 
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})
