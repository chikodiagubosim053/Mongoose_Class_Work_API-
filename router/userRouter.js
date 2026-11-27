const router = require('express').Router();
const { authenticate } = require('../middlewares/authorization');


const { signUp, login, verifyEmail, forgotPassword, resetPassword, getAllUsers, getOneUser, updateUser }  = require('../controllers/userController');

router.post('/newUser', signUp)
router.post('/login', login)
router.post('/verify-otp', verifyEmail)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword',  resetPassword)
router.get('/allUsers', authenticate, getAllUsers)
router.get('/oneUser/:id', getOneUser)
router.patch('/updatedUser/:id', updateUser)


module.exports = router