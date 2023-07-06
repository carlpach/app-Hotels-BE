const User = require("../api/models/user.model");
const { verifySign } = require("../utils/jwt");


const pruebaMiddleware = (req, res, next) => {
    console.log("paso por el middleware");
    next();
}

const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        console.log("authorization token --------", authorization);

        // Check if the authorization header is missing
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Extract the token from the authorization header
        const token = authorization.split(" ")[1];

        // Check if the token is missing
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const tokenVerified = verifySign(token);
        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified);
        }

        // Find the user associated with the token
        const userLogged = await User.findById(tokenVerified.id);

        req.user = userLogged;

        // Call the next middleware
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization; 

        if(!authorization){
            return res.status(401).json({message: "Unauthorized"});
        }
        
        const token = authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Invalid token"});
        }

        const tokenVerified = verifySign(token);
        console.log(tokenVerified)
        if(!tokenVerified.id){
            return res.status(401).json(tokenVerified);
        }

        const userLogged = await User.findById(tokenVerified.id);
        req.user = userLogged;


        if(userLogged.role !== 'admin') {
            return res.status(401).json({message: "Necesitas ser administrador"});
        }
        next()
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {pruebaMiddleware, isAuth, isAdmin}