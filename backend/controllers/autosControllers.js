const asyncHandler = require('express-async-handler')
const Auto = require('../models/autoModels')


const getAutos = asyncHandler( async (req, res) => {

    const autos = await Auto.find({user : req.user.id})
    res.status(200).json(autos)
})

const setAutos = asyncHandler( async (req,res) => {

    if(!req.body.Marca){
        // res.status(400).json({mensaje:'Favor ingresar la descripcion de la tarea'})
        res.status(400)
        throw new Error('Favor de teclear una informacion para la marca')
    }
    const autos = await Auto.create({
        user : req.user.id,
        Marca : req.body.Marca ,
        Modelo : req.body.Modelo ,
        Año : req.body.Año ,
        Color : req.body.Color ,
        Image : req.body.Image ,
    })

    console.log(req.body);
    res.status(201).json(autos)

    // res.status(201).json({mensaje:`Se crea el auto x`})

})

const updateAutos = asyncHandler( async (req,res) => {
    const autos = await Auto.findById( req.params.id)
    if(!autos){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }
    if(autos.user.toString() != req.user.id){
        res.status(401)
        throw new Error('Tarea no pertenece al usuario logeado')
    }

    const autosModificada = await Auto.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(200).json(autosModificada)
    res.status(200).json({mensaje:`Mofidicar el auto ${req.params.id}`})
})

const deleteAutos = asyncHandler ( async (req,res) => {
    const autos = await Auto.findById(req.params.id)
    if(!autos){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }
    if(autos.user.toString() != req.user.id){
        res.status(401)
        throw new Error('Tarea no pertenece al usuario logeado')
    }
    await autos.deleteOne()
    res.status(200).json({mensaje:'Auto Borrado'})
})

module.exports = {
    getAutos,
    setAutos,
    updateAutos,
    deleteAutos,
}