const express = require('express')  //main framework used to create the web server.
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json()) //This middleware parses incoming JSON requests and makes the parsed data available in req.body
const path = require('path')  //path: A built-in Node.js module to handle file and directory paths.
const userRoute = require('./routes/usersRoute') //This file likely contains the route handlers for user-related requests.
const transactionsRoute = require('./routes/transactionsRoute') //This file likely contains the route handlers for transaction-related requests.
app.use('/api/users/',userRoute)  //will be handled by the userRoute, and requests to 
app.use('/api/transactions/' , transactionsRoute) //will be handled by the transactionsRoute

//const port = 5000



//listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`node started at server ${PORT}`))