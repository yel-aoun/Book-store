import express from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Midleware to parse request body
app.use(express.json());

// Allow Custom Origins
app.use(cors({
    origin: "http://localhost:5173",  // allow requests from only localhost:5555
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow only these mothodes
    allowedHeaders: ['Content-Type'],
    })
);

app.get("/", (req, res) => {
    return res.status(234).send("Mern Stack ...");
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("APP conected to database");
    app.listen(PORT, () => {
        console.log(`listning on Port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})