const express = require ('express')
const router = express.Router()
const {getAutos, setAutos, updateAutos,deleteAutos} = require('../controllers/autosControllers')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getAutos).post(protect,setAutos)

// router.get('/',getAutos)
// router.post('/',setAutos)

router.route('/:id').put(protect,updateAutos).delete(protect,deleteAutos)

// router.put('/:id',updateAutos)
// router.delete('/:id',deleteAutos)

module.exports = router