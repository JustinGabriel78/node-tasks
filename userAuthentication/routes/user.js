const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const userSchema = require('../validations/userSchema')
const emailExistValidation = require('../middlewares/emailExistValidationMiddleware')
const userNameExistValidation = require('../middlewares/userNameExistValidationMiddleware')
const userValidation = require('../middlewares/userValidationMiddleware')

router.post("/signup",userNameExistValidation(),userValidation(userSchema.userNameSchema),emailExistValidation(),userValidation(userSchema.emailSchema),userValidation(userSchema.passwordSchema) , userController.signup );
router.post('/signin',userValidation(userSchema.emailSchema), userController.signin)


module.exports = router