import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addIncome,
  editTransaction,
  deleteTransaction,
} from "../store/BalanceSlice";
import { Box, Typography } from "@mui/material";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import DeleteConfirmationModal from "./DeleteModal";
import { ToastContainer, toast } from "react-toastify";

const Budget = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.balance);

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleAddTransaction = () => {
    if (isEdit) {
      dispatch(
        editTransaction({
          type,
          id: editId,
          description,
          value: parseFloat(value),
        })
      );
      setIsEdit(false);
      setEditId(null);
    } else {
      dispatch(addIncome({ type, description, value: parseFloat(value) }));
      setType("");
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setEditId(item.id);
    setDescription(item.description);
    setValue(item.value);
    setType(item.type);
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      dispatch(deleteTransaction(deleteItemId));
      toast.success("Transaction deleted successfully!");
      setDeleteItemId(null);
      setIsModalOpen(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <ToastContainer />
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "white" }}
      >
        Available Balance:-
        <Typography variant="h3" sx={{ color: "white" }}>
          {budget.total}
        </Typography>
      </Typography>

      <TransactionForm
        type={type}
        setType={setType}
        description={description}
        setDescription={setDescription}
        value={value}
        setValue={setValue}
        handleAddTransaction={handleAddTransaction}
        isEdit={isEdit}
        totalBalance={budget.total}
      />
      <div className="row">
        <div className="col-12 col-sm-6 mb-4">
          <TransactionList
            transactions={budget.income}
            type="income"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        <div className="col-12 col-sm-6 mb-4">
          <TransactionList
            transactions={budget.expenses}
            type="expense"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            total={budget.total}
          />
        </div>
      </div>
    </Box>
  );
};

export default Budget;
