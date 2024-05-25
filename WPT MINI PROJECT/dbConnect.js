const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://projectgroup38:cdac%40123@cluster0.dmigjsl.mongodb.net/SpendMoney')
const connection = mongoose.connection
connection.on('error',err => console.log(err))
connection.on('connected', () => console.log('MongoDB connection is successful'))
//module.exports = connectDb;