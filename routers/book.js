const bookController=require("../controllers/book")
const router=require('express').Router()
const guardAuth=require("./guardAuth")
const multer=require("multer")

router.get("/",bookController.getThreeBookController)
router.get("/product",guardAuth.isAuth,bookController.getallbooksController)
router.get("/books/:id",guardAuth.isAuth,bookController.getBookByIdController)

router.get('/addbook',guardAuth.isAuth,bookController.GetAddBook)

router.post('/addbook',multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'assets/uploads')
            },
            filename:(req,file,cb)=>{
                cb(null,Date.now()+'cha'+file.originalname)
                }
            })
   
}).single('image'),
guardAuth.isAuth,
bookController.PostAddBook)


module.exports=router