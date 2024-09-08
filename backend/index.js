import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import userRoute from './routes/userRoutes.js'
dotenv.config({})
const app =  express()
const PORT = process.env.PORT||8080 

app.use(express.json())
app.use("/api/v1/user",userRoute)

app.listen(PORT , ()=>{
    connectDB()
    console.log(`Server is running at PORT : ${PORT}`)
})