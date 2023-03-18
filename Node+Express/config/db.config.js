
const mongoose = require("mongoose");



const connect = ()=>{
    console.log('connect-mongoose');
    mongoose
    .connect(
        'mongodb://127.0.0.1:27017/notesapp',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    const userSchema = new mongoose.Schema({
        username: String,
        email: String
    })
    const postSchema = new mongoose.Schema({
        title: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
    const User = mongoose.model('User', userSchema);
    const Post = mongoose.model('Post', postSchema);
    Post.find()
    .then(p => console.log(
        "QUERY DONE"
    ))
    .catch(error => console.log(error));
    console.log("DONE")
}

module.exports = {
    connect
} 