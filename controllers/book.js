const BookModel=require("../models/book")

exports.getThreeBookController=(req,res,next)=>{
    BookModel.getThreeBook().then(books=>{
        res.render('index',{
            books:books,
            verifUser:req.session.userId
        })
    })
}

exports.getallbooksController=(req,res,next)=>{
    BookModel.getallbooks().then(books=>{
        res.render('product',{books:books,verifUser:req.session.userId})
    })
}
exports.getmybooksController=(req,res,next)=>{
    const msg = req.flash('msg')[0] || null; // Retrieve the flash message
    const error = req.flash('error')[0] || null; // Retrieve the flash message

    console.log('Flash message (mybooks):', msg);
    console.log('Flash message (mybooks):', error);
    BookModel.getmybooks(req.session.userId).then(books=>{
        res.render('mybooks',{books:books,verifUser:req.session.userId,message: msg,messageerror: error,})
    })
}
exports.deletemybooksController=(req,res,next)=>{
    BookModel.deletemybooks(req.body.bookId).then(msg=>{
        req.flash('msg',msg);
        res.redirect("mybooks")

    }).catch((err)=>{
        req.flash('error',err);
        console.log("error deleting book",err)
        res.redirect("mybooks")

    })
}
exports.getupdatemybooksController=(req,res,next)=>{

    BookModel.getupdatemybooks(req.body.bookId).then(book=>{
        res.render('updatebook',{book:book,verifUser:req.session.userId})

    })

    /*BookModel.updatemybooks(req.body.bookId).then(msg=>{
        req.flash("msg",msg)
        res.redirect('mybooks')
    }).catch((err)=>{
        req.flash("error",err)
        console.log('error updating',err)
        res.redirect("mybooks")
    })*/
}




exports.getBookByIdController=async(req,res,next)=>{
    const id = req.params.id;
    console.log(id)
    const errorMessage = await req.flash('message')[0] || null;
    console.log(errorMessage,'New Book update') // Retrieve the flash message

    BookModel.getBookById(id).then(book=>{
        res.render('details',{book:book,verifUser:req.session.userId,message:errorMessage})
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

exports.GetAddBook=async(req,res)=>{
    const errorMessage = await req.flash('error')[0] || null; // Retrieve the flash message
    console.log('Flash message (addbook):', errorMessage);

    res.render('addbook',{
        verifUser:req.session.userId,
        message: errorMessage, // Pass the error message to the view

    })

}

exports.PostAddBook=(req,res)=>{
    console.log(req.file,'fileee')
    if (!req.body.title || !req.body.author || !req.body.price|| !req.body.description|| !req.file.originalname) {
        req.flash('error', 'All fields are required');
        return res.redirect('/addbook'); // Redirect back to the register page
    }
    const {title,author,price,description}=req.body
    const image=req.file.filename
    BookModel.addBookFunModel(title,author,price,description,image,req.session.userId)
    .then((book)=>{
        const msg="New Book added with Success"
        console.log(msg)
        console.log(book)
        req.flash('message', msg);
        res.redirect(`/books/${book._id}`)

    })
    .catch((err)=>{
        console.log(err)
        req.flash('error', err);
        res.redirect('/addbook')
            })


}


exports.UpdateBook=(req,res)=>{

    const { title, author, description, price, oldImage } = req.body;

    let image;
     if (req.file) {
         image = req.file.filename; 
     } else {
         image = oldImage;
     }


    BookModel.modifyBookFunModel(req.body.id,title,author,price,description,image,req.session.userId)
    .then((book)=>{
        const msg=" Book Modified with Success"
        
        req.flash('message', msg);

        res.redirect(`/books/${book._id}`)

    })
    .catch((err)=>{
        req.flash('error', err);
        res.redirect('/update')
            })


}

