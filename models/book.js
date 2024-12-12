const mongoose = require("mongoose");

// Schema Definition
const schemaBook = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    price: Number,
    image: String,
    userId:String,
});

// MongoDB Connection URL
const url = process.env.MONGO_URI ;
const urllocal="mongodb://localhost:27017/Library"

// Book Model
const Book = mongoose.model('book', schemaBook);

// Helper to Handle Mongoose Connection and Disconnection
const connectToDB = () => mongoose.connect(urllocal);


const disconnectFromDB = () => mongoose.disconnect();

// Fetch All Books
exports.getallbooks = () => {
    return new Promise((resolve, reject) => {
        connectToDB()
            .then(() => {
                return Book.find();
            })
            .then((books) => {
                console.log("Books fetched:", books);
                resolve(books);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
                reject(err);
            })
            .finally(() => {
                disconnectFromDB()
                    .then(() => console.log("Disconnected from DB books.js"));
            });
    });
};

// Fetch Three Books
exports.getThreeBook = () => {
    return new Promise((resolve, reject) => {
        connectToDB()
            .then(() => {
                console.log("Connected with DB from books.js");
                return Book.find({}).limit(3);
            })
            .then((books) => {
                console.log("Books fetched:", books);
                resolve(books);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
                reject(err);
            })
            .finally(() => {
                disconnectFromDB()
                    .then(() => console.log("Disconnected from DB from books.js"));
            });
    });
};

// Fetch Book by ID
exports.getBookById = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject("Invalid ID format");
    }

    return new Promise((resolve, reject) => {
        connectToDB()
            .then(() => {
                console.log("Connected from DB from books.js");
                return Book.findById(id);
            })
            .then((book) => {
                if (!book) {
                    throw new Error("No book found with the given ID");
                }
                resolve(book);
            })
            .catch((err) => {
                console.error("Error fetching book:", err);
                reject(err);
            })
            .finally(() => {
                disconnectFromDB()
                    .then(() => console.log("Disconnected from DB from books.js"));
            });
    });
};


exports.addBookFunModel=(title, author,price,description,image,userId)=>{
    // test email if exit 
    //(true go to login)
    //(false add this user to collection)

    return new Promise((resolve,reject)=>{
        connectToDB()
        .then(()=>{
            console.log("connected from auth.js add book")

            console.log("Successfully connected to the database for login.");
            return Book.findOne({title:title})

        }).then((book)=>{
            if(book){
                console.log("book exists");
                disconnectFromDB()
                reject("Books already Exist")
            } 
            else{
                let b=new Book({
                    title:title,
                    author:author,
                    price:price,
                    description:description,
                    image:image,
                    userId:userId


                })
                return b.save()
                
                }
                    
                }).then((b)=>{
                    disconnectFromDB()
                    console.log("Disconnect from auth.js")
                    resolve(b)
                })
                .catch((err)=>{
                    disconnectFromDB()
                    console.log("Disconnect from books.js add book  ")
                    reject(err)
                    })
        })
        


    }
