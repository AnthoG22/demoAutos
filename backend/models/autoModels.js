const mongoose = require('mongoose')

const autoSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true 
    },
    Marca:{
        type : String,
        required : [true , 'Por favor teclea una cadena']
    },
    Modelo:{
        type : String,
        required : [true , 'Por favor teclea una cadena']
    },
    Año:{
        type : String,
        required : [true , 'Por favor teclea una cadena']
    },
    Color:{
        type : String,
        required : [true , 'Por favor teclea una cadena']
    },
    Image:{
        type : String,
        required : [true , 'Por favor teclea una cadena']
    }
},{
    timestamps : true
}
)
module.exports = mongoose.model('Auto',autoSchema)