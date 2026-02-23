import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})

import express from "express"
import cors from "cors"
import connectDB from "./db/db.js"
import cookieParser from "cookie-parser"
import seatMatrixRouter from './route/seatMatrix.route.js'
import userRouter from './route/user.route.js'
import closingRankRouter from './route/closingRank.route.js'
import allotmentRouter from "./route/allotment.route.js";
import feeStipendBondRouter from "./route/feeStipendBond.route.js";
import seatIncreaseRouter from "./route/seatIncrease.route.js";
import courseRouter from "./route/course.route.js";
import counsellingRouter from "./route/counselling.route.js";
import universityRouter from "./route/university.route.js";
import instituteRouter from "./route/institute.route.js";

const app = express()

// Fix CORS to handle multiple origins
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : "*";

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(cookieParser())

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use("/api/v1/seat-matrix", seatMatrixRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/closing-rank", closingRankRouter)
app.use("/api/v1/allotment", allotmentRouter);
app.use("/api/v1/fee-stipend-bond", feeStipendBondRouter);
app.use("/api/v1/seat-increase", seatIncreaseRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/counselling", counsellingRouter);
app.use("/api/v1/universities", universityRouter);
app.use("/api/v1/institutes", instituteRouter);


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT || 5000}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })