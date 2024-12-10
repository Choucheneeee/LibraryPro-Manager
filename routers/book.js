const mybook=require("../controllers/book")
const router=require('express').Router()
const guardAuth=require("./guardAuth")

router.get("/",mybook.getThreeBookController)
router.get("/product",guardAuth.isAuth,mybook.getallbooksController)
router.get("/books/:id",guardAuth.isAuth,mybook.getBookByIdController)



module.exports=router