import React, { useState } from "react";  //useState hook for managing state.useEffect is used to perform side effects in a component, such as updating the document title
import { Form, Input, message, Modal, Select } from "antd"; //Components and utilities from the Ant Design library for building forms 
import Spinner from "./Spinner";
import axios from "axios"; //For making HTTP requests , API interactions

//Props:
//setShowAddEditTransactionModal:: Function to control the visibility of the modal.
//showAddEditTransactionModal: Boolean to indicate if the modal is visible.
//selectedItemForEdit: The transaction item to be edited, if any.
//setSelectedItemForEdit: Function to reset the selected item for edit.
//getTransactions: Function to fetch transactions.

function AddEditTransaction({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);  //loading: State variable to manage the loading state.
  //onFinish: Async function to handle form submission
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("SpendMoney-user"));
      setLoading(true);  //Sets the loading state to true to indicate processing
      //selectedItemForEdit determine if the form is for editing or adding a transaction.
      if (selectedItemForEdit) {
        //Makes a POST request to the backend API to edit  a transaction.
        await axios.post("/api/transactions/edit-transaction", {
           payload : {
            ...values,
            userid: user._id,
           },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();  //Calls getTransactions to refresh the list of transactions.
        message.success("Transaction Updated successfully");
      } else {
        //Makes a POST request to the backend API to add  a transaction.
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transaction added successfully");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}   // Conditional title based on whether a transaction is being edited or added.
      visible={showAddEditTransactionModal}  // Controls the visibility of the modal.
      onCancel={() => setShowAddEditTransactionModal(false)}  //Function to close the modal.
      footer={false}   //Disables the default footer.

    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expence">Expence</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            {" "}
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;