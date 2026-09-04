const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new mongoose.Schema({
    item: String,
    price: Number,
});

const customerSchema = new mongoose.Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
})

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

const addCustomer = async () => {
    // let customer1 = new Customer({
    //     name: "John Doe",
    // });

    // let order1 = await Order.findOne({item: "Burger"});
    // let order2 = await Order.findOne({item: "Pizza"});

    // customer1.orders.push(order1);
    // customer1.orders.push(order2);

    // let result = await customer1.save();
    // console.log(result);

    let result = await Customer.find({});
    console.log(result);
};

const findCustomer = async () => {
    let result = await Customer.find({}).populate('orders');
    console.log(result[0]);
}

addCustomer();
findCustomer();




// const addOrders = async () => {
//     let result = await Order.insertMany([
//         {item: "Samosa", price: 20},
//         {item: "Burger", price: 50},
//         {item: "Pizza", price: 100},
//     ]);
//     console.log(result);
// };

// addOrders();
