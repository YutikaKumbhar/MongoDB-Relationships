const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String,
        }
    ]
});

const User = mongoose.model('User', userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "sherlockholmes",
        addresses: [
            {
                location: "221B Baker Street",
                city: "London"
            },
        ],
    });

    user1.addresses.push({
        location: "10 Downing Street",
        city: "New York"
    });
    let result = await user1.save();
    console.log(result);
};

addUsers(); 