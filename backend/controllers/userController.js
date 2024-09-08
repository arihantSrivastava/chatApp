import bcrypt from 'bcryptjs'
import {User} from '../models/userModer.js'
import jwt from 'jsonwebtoken'
export const register = async(req , res) =>{
    try {
        const {fullName ,username ,password,confirmPassword ,  gender} = req.body
      
        if(!fullName || !username || !password || !confirmPassword || !gender){
             return res.status(400).json({message: "All feilds are required "})
        }

        if(password !== confirmPassword){
            return res.status(400).json({message:"Password do not match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({message:"User already exits"})
        }

        const hashedPassword =await bcrypt.hash(password, 10)
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        await User.create ({
            fullName,
            username,
            password:hashedPassword,
            profilePhoto: gender == "male"? maleProfilePic : femaleProfilePic ,
            gender
        })

       return res.status(201).json({
        message: "account created",
        success: true,
       })
        
    }

    catch (error){
       console.log(error)
    }
}

export const login  =  async (req,res)=>{
    try {
        
        const {username , password } = req.body
        if(!username || !password){
            return res.status(400).json({message:"All fields are required "})
        }

        const user = await  User.findOne({username})
       
        if(!user){
            return res.status(400).json({
                message: "Incorrect username or Password",
                success : false,
            })}

            const isPasswordMatch = await bcrypt.compare(password,user.password)
           
            if(!isPasswordMatch){
             
                return res.status(400).json({
                    message:"Incorrect Password"
                })
            }

        const tokenData = {
            userID : user._id
        }

        const token = await jwt.sign(tokenData ,process.env.JWT_KEY,{expiresIn:'1d'} )
         return res.status(200).cookie("token",token,{
            maxAge:1*24*60*60*1000,
            httpOnly:true,
            sameSite:'strict'
         }).json({
            _id:user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
         })
    } catch (error) {
        console.log(error)
    }
}

export const logout =  (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "You are logged out Succesfully"
        })
    } catch (error) {
        console.log(error)
    }
}