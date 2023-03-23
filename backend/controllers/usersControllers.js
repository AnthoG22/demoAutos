const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const getMisDatos = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

const loginUser = asyncHandler( async (req, res) => {
    //desestructuramos el body del request
    const {email, password} = req.body
    //verificamos que recibamos la informacion del modelo user necesita
    if(!email || !password){
        res.status(400)
        throw new Error('Favor de verificar que esten todos los campos')
    }
    //verificamos que el usuario exista
    const user = await User.findOne({email})

    //comparamos el hash del password y el usuario
    if (user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email:user.email,
            token : generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Credenciales Incorrectos')
    }
    res.status(200).json({mensaje:"login"})
})

const registerUser = asyncHandler( async (req, res) => {
    //desestructuramos el body del request
    const {name,email,password} = req.body
    //verificamos que recibamos la informacion del modelo user necesita
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Favor de verificar que esten todos los campos')
    }
    //verificamos que no exista ese usuario en la coleccion
    const userExiste = await User.findOne({email})

    if(userExiste){
        res.status(400)
        throw new Error('Ese email ya fue registrado')
    }
    //Hash al password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            
        })
    }else{
        res.status(400)
        throw new Error('no se registro user')
    }
})

const generateToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET)
        expiresIn: '30d'
}

module.exports = {
    getMisDatos,
    loginUser,
    registerUser
}