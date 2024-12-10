const mongoose=require("mongoose")

var schemaBook=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    description:String,
    author:String,
    price:Number,
    image:String
})

var Book=mongoose.model('book',schemaBook,)
var url='mongodb://localhost:27017/Library'



exports.getallbooks=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            console.log("connected with db")
            return Book.find()
        }).then((books)=>{
            console.log("Books fetched"); // Debugging
            mongoose.disconnect()
            resolve(books)

        })
        .catch((err)=>{
            console.error("Error fetching books:", err); // Debugging

            reject(err);
    })

})
}
exports.getThreeBook=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            console.log("connected with db")
            return Book.find({}).limit(3)
        }).then((books)=>{
            console.log("Books fetched"); // Debugging
            mongoose.disconnect()
            resolve(books)

        })
        .catch((err)=>{
            console.error("Error fetching books:", err); // Debugging

            reject(err);
    })

})
}

exports.getBookById = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject("Invalid ID format");
    }

    const objectId = new mongoose.Types.ObjectId(id); // Convert string to ObjectId
    console.log(typeof objectId, 'type');

    return new Promise((resolve, reject) => {
        mongoose
            .connect(url)
            .then(() => {
                console.log("Connected with DB");
                return Book.findById(objectId); // Use the pre-converted ObjectId
            })
            .then((book) => {
                mongoose.disconnect();

                if (!book) {
                    return reject("No book found with the given ID"); // Reject if no book is found
                }

                resolve(book); // Resolve with the found book
            })
            .catch((err) => {
                mongoose.disconnect(); // Disconnect on any error
                console.error("Error fetching book:", err);
                reject(err); // Reject with the error
            });
    });
};
