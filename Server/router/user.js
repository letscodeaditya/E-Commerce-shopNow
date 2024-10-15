const { SignUp, Login } = require('../controller/userController');
const router = require('express').Router(); 


router.route('/auth/signUpUser').post(SignUp);  
router.route('/auth/loginuser').post(Login);    

module.exports = router;
