import express from "express";
import cors from "cors";
import customers from "./src/routes/record.js";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config()
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/record", customers);

const server = http.createServer(app)
mongoose.connect(process.env.ATLAS_URI).then(()=>{
  console.log("Mongodb connected")
  server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err)=>{
  console.log({err});
  process.exit(1);
})
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

