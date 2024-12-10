const mybook=require("../controllers/book")
const router=require('express').Router()

router.get("/",mybook.getThreeBookController)
router.get("/product",mybook.getallbooksController)
router.get("/books/:id",mybook.getBookByIdController)



module.exports=router