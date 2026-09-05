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

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post('findOneAndDelete', async (customer) => {
    if(customer.orders.length) {
        let result = await Order.deleteMany({ _id: {$in: customer.orders}});
        console.log(result);
    }
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

//Functions
const findCustomer = async () => {
    let result = await Customer.find({}).populate('orders');
    console.log(result[0]);
}

const addCustomer = async () => {
    let newCustomer = new Customer({
        name: "Karan Aujla"
    });

    let newOrder = new Order({
        item: "Burger",
        price: 100
    });

    newCustomer.orders.push(newOrder);
    await newOrder.save();
    await newCustomer.save();

    console.log("new customer added");
}

const deleteCustomer = async () => {
    let data = await Customer.findByIdAndDelete('6a9c18c54408d175c8d59f74');
    console.log(data);
}

deleteCustomer();
