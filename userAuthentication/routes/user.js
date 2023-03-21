const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const userSchema = require('../validations/userSchema')
const authUser = require('../middlewares/authUserMiddleware')

router.post("/signup",authUser.userNameExistValidation(),authUser.userValidation(userSchema.userNameSchema),authUser.emailExistValidation(),authUser.userValidation(userSchema.emailSchema),authUser.userValidation(userSchema.passwordSchema) , authUser.passwordCriteria(), userController.signup );
router.post("/signin",authUser.requireAuth, authUser.userValidation(userSchema.emailSchema), userController.signin)


module.exports = router