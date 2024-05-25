import { DatePicker, Form, message, Select, Table } from "antd";
import axios from "axios"; //For making HTTP requests , API interactions
import React, { useEffect, useState } from "react";  //Core React library and hooks (useEffect, useState).that we can use to isolate the reusable part from a functional component

//Custom components: 
import AddEditTransaction from "../components/AddEditTransaction";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import "../resources/transactions.css";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";  //For date formatting.
import Analatics from "../components/Analatics";
const { RangePicker } = DatePicker;

function Home() {
  //Controls the visibility of the modal for adding/editing transactions.
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [loading, setLoading] = useState(false);  //manages the spinner visibility.
  const [transactionsData, setTransactionsData] = useState([]); //stores the list of transactions.
  const [frequency, setFrequency] = useState("7");   //stores the selected time range for transactions.
  const [type, setType] = useState("all");   //stores the type of transactions to filter (all, income, expense).
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");  //determines whether to show the table view or analytics view

  //Fetches transactions based on user ID, selected frequency, date range, and type.
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("SpendMoney-user")); //JSON is a lightweight format for storing and transporting data. 


      setLoading(true);
      //Makes a POST request to fetch transactions and updates the state
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  //Deletes a transaction by sending a POST request to the server
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted successfully");
      getTransactions();
      setLoading(false); //Refreshes the transaction list upon successful deletion.
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  //this useEffect hook Fetches transactions whenever frequency, selectedRange, or type changes
  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined className="mx-3" onClick={() => deleteTransaction(record)} />
          </div>
        );
      },
    },
  ];
  //Performing JSX Rendering(Rendering : data sent from server to web page )
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expence">Expence</Select.Option>
            </Select>
          </div>
        </div>

        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`mx-3 ${viewType === "table" ? "active-icon" : "inactive-icon"
                  } `}
                onClick={() => setViewType("table")}
                size={30}
              />
              <AreaChartOutlined
                className={`${viewType === "analytics" ? "active-icon" : "inactive-icon"
                  } `}
                onClick={() => setViewType("analytics")}  //Switches between table view and analytics view.
                size={30}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="table-analtics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData} />
          </div>
        ) : (
          <Analatics transactions={transactionsData} />
        )}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;