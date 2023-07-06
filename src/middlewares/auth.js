const User = require("../api/models/user.model");
const { verifySign } = require("../utils/jwt");


const pruebaMiddleware = (req, res, next) => {
    console.log("paso por el middleware");
    next(); //Funcion next da paso a lo siguiente
}

const isAuth = async(req, res, next) => {
    try {
        const authorization = req.headers.authorization; //cojo la authorization

        if(!authorization){
            return res.status(401).json({message: "Unauthorized"});
        }
        
        //Mi authorization es Bearer XXXX -> hago un split para quedarme con XXX
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

        next()
    } catch (error) {
        return res.status(500).json(error)
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization; //cojo la authorization

        if(!authorization){
            return res.status(401).json({message: "Unauthorized"});
        }
        
        //Mi authorization es Bearer XXXX -> hago un split para quedarme con XXX
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