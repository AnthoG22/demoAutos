const express = require ('express')
const router = express.Router()
const { registerUser, loginUser, getMisDatos} = require('../controllers/usersControllers')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser)

router.post('/login',loginUser)

router.get('/misdatos' , protect ,getMisDatos)


module.exports = router