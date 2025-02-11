const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const usercontroller = require('../controllers/user.controller');

// auth
router.post("/register", authController.signUp);


//user display : 'block'
router.get("/",usercontroller.getAllUsers);
router.get("/:id", usercontroller.userInfo);    
router.put("/:id", usercontroller.updateUser);
router.delete("/:id", usercontroller.deleteUser);
router.patch("/follow/:id",usercontroller.follow);
router.patch("/unfollow/:id",usercontroller.unfollow);


module.exports= router;