const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
});

const postSchema = new mongoose.Schema({
    content: String,
    likes: Number,
    user : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }] 
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
    let user1 = await User.findOne({username: "yutika18"});

    let post2 = new Post({
        content: "Lovely image",
        likes: 25,      
    });

    post2.user = user1;
    await post2.save();
};

addData();
