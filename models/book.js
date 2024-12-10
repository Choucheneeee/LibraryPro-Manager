const mongoose = require("mongoose");

// Schema Definition
const schemaBook = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    author: String,
    price: Number,
    image: String,
});

// MongoDB Connection URL
const url = process.env.MONGO_URI || 'mongodb+srv://chouchene:chouchene@cluster0.w51ol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Book Model
const Book = mongoose.model('book', schemaBook);

// Helper to Handle Mongoose Connection and Disconnection
const connectToDB = () => mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const disconnectFromDB = () => mongoose.disconnect();

// Fetch All Books
exports.getallbooks = () => {
    return new Promise((resolve, reject) => {
        connectToDB()
            .then(() => {
                console.log("Connected with DB");
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
                    .then(() => console.log("Disconnected from DB"));
            });
    });
};

// Fetch Three Books
exports.getThreeBook = () => {
    return new Promise((resolve, reject) => {
        connectToDB()
            .then(() => {
                console.log("Connected with DB");
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
                    .then(() => console.log("Disconnected from DB"));
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
                console.log("Connected with DB");
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
                    .then(() => console.log("Disconnected from DB"));
            });
    });
};
