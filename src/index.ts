import express, { json } from "express";
import dotenv from "dotenv";

const App = express();

App.use(json())
dotenv.config();


const port = 7000 || process.env.PORT;

App.listen(port, () => {
    console.log(port);
})