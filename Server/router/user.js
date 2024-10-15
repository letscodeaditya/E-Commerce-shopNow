const { SignUp, Login } = require('../controller/userController');
const router = require('express').Router(); 


router.route('/signUpUser').post(SignUp);  
router.route('/loginuser').post(Login);    

module.exports = router;
