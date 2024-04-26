const JWT = require('jsonwebtoken')

const requireSignIn = async (req, res, next) =>{
   
    try {
        const token =  req.headers.authorization
        if(!token){
            res.status(401).send({ error: "Please authenticate using a valid token" }) 
        }

        const data = await JWT.verify(token , process.env.AUTH_JWT_SECRET)
        req.user = data;
        next();
        
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })   
    }

}

module.exports = requireSignIn;