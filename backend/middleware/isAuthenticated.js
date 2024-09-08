const isAuthenticated = async (req,res,next) =>{
    try {
       const token =  req.cookies.token
       if(!token){
        return res.status(400).json({
            message:"User not authorised"
        })}

        const decode = await jwt.verify(token,process.env.JWT_KEY)
        if(!decode){
            return res.status(400).json({
                message:"Invalid Token"
            })
        }

        req.id  = decode.userId
        next()  
    } catch (error) {
        console.log(error)
    }
}

export default isAuthenticated