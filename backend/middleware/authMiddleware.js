const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const User = require('../models/userModels')

const protect = asyncHandler( async (req, res , next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            //obtengo el token del encabezado
            token = req.headers.authorization.split(' ')[1]
            
            //verificar la firma del token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //Obtener el usuario del token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error ('Acceso no autorizado 1')
        }
    }
    if(!token){
        res.status(401)
        throw new Error ('Acceso no autorizado 2')
    }
})

module.exports = {
    protect
}
