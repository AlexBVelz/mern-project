const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const usercontroller = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);



//user display : 'block'
router.get("/",usercontroller.getAllUsers);
router.get("/:id", usercontroller.userInfo);    
router.put("/:id", usercontroller.updateUser);
router.delete("/:id", usercontroller.deleteUser);
router.patch("/follow/:id",usercontroller.follow);
router.patch("/unfollow/:id",usercontroller.unfollow);

//upload
router.post('/upload',upload.single('file'), uploadController.uploadProfil);



module.exports= router;