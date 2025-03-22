import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/routes.js'
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.json(`Welcome to price tracker`)
})
app.use("/api/products", routes);


app.listen(PORT,console.log(`Running on port ${PORT}`));