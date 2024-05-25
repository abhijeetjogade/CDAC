const express = require("express");
const Transaction = require("../models/Transaction"); //A Mongoose model representing the transaction collection in the database.
const router = express.Router(); // An instance of an Express router to define routes.
const moment = require("moment"); //A library for manipulating and formatting dates.

//CRUD Operations ADD,EDIT,DELETE & GET

//Create or Add transaction
router.post("/add-transaction", async function (req, res) {
  try {
    const newtransaction = new Transaction(req.body);  //Creates a new Transaction instance with the data from the request body and saves it to the database.
    await newtransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Edit or update transaction
router.post("/edit-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)  //Finds and updates a transaction based on the transaction ID provided in the request body.
    res.send("Transaction Updated Successfully"); //await makes js wait for promise object to settle before running code in next line0
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete transaction
router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId })  //Finds and deletes a transaction based on the transaction ID provided in the request body.
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//read all transaction
router.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectedRange, type } = req.body;  //Destructures frequency, selectedRange, and type from the request body.
  //If frequency is not "custom", it finds transactions within the specified number of days. If frequency is "custom", it finds transactions within the selected date range.
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
          date: {
            $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
          },
        }
        : {
          date: {
            $gte: selectedRange[0],
            $lte: selectedRange[1],
          },
        }),
      userid: req.body.userid,
      ...(type !== 'all' && { type })  // Filters transactions by the user ID provided in the request body. type: Filters transactions by the type if it is not 'all'.
    });

    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;