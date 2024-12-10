const BookModel=require("../models/book")

exports.getThreeBookController=(req,res,next)=>{
    BookModel.getThreeBook().then(books=>{
        res.render('index',{books:books})
    })
}

exports.getallbooksController=(req,res,next)=>{
    BookModel.getallbooks().then(books=>{
        res.render('product',{books:books})
    })
}

exports.getBookByIdController=(req,res,next)=>{
    const id = req.params.id;
    console.log(id)
    BookModel.getBookById(id).then(book=>{
        res.render('details',{book:book})
    })
    .catch((err) => {
        console.error("Error:", err);
        if (err === "Invalid ID format" || err === "No book found with the given ID") {
            res.status(404).send(err); // Send 404 for client-side errors
        } else {
            res.status(500).send("An internal server error occurred"); // Send 500 for server-side errors
        }
    });
}





