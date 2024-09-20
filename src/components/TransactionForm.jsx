import React from "react";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const TransactionForm = ({
  type,
  setType,
  description,
  setDescription,
  value,
  setValue,
  handleAddTransaction,
  isEdit,
}) => {
  const balance = useSelector((state) => state.balance);

  const stateValue = {
    total: balance.total,
    income: balance.income.reduce((sum, item) => sum + item.value, 0),
    expenses: balance.expenses.reduce((sum, item) => sum + item.value, 0),
  };

  const percentage = ((stateValue.expenses / stateValue.income) * 100).toFixed(
    2
  );

  const handleSubmit = () => {
    if (!type) {
      toast.error("Choose Either Credit or Debit.");
      return;
    }
    if (!description || !value) {
      toast.error("Description and value fields cannot be empty.");
      return;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue <= 0) {
      toast.error("Please enter a valid numeric value.");
      return;
    }

    if (type === "expense" && stateValue.total <= 0) {
      toast.error(
        `Your balance is ${stateValue.total}. You cannot add expenses.`
      )
     
      return;

    }
    if(stateValue.total > 0 && type==='expense' && value >stateValue.total)
      {
        toast.error(
        `Your balance is ${stateValue.total}. You cannot add expenses because expense is greater than income`
      )
      return;
      }

    handleAddTransaction();
    setDescription("");
    setValue("");
  };

  return (
    <>
      <div className="container ">
        <div className="col totalClass">
          <div className="col-12 col-sm-3 mb-1">
            <div className="form-group" id="income-show">
              <p className="totalIncomeP">INCOME</p>
              <span className="totalIncomeSpan">+ {stateValue.income} ₹</span>
            </div>
          </div>
          <div className="col-12 col-sm-3 mb-1">
            <div className="form-group" id="expense-show">
              <p className="totalExpenseP">EXPENSES</p>
              <div>
                <span className="totalExpenseSpan">
                  - {stateValue.expenses} ₹
                </span>
                &nbsp;&nbsp;
                {percentage >= 0 && (
                  <span className="item__percentage">{percentage}%</span> // We are showing Percentage in Total Expense Div.
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <Card sx={{ marginBottom: 4, bgcolor: "transparent" }}>
        <CardContent>
          <RadioGroup
            row
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ marginLeft: "49rem", color: "white" }}
          >
            <FormControlLabel
              value="income"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "blue",
                    },
                  }}
                />
              }
              label="Credit"
              required
            />
            <FormControlLabel
              value="expense"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "blue",
                    },
                  }}
                />
              }
              label="Debit"
              required
            />
          </RadioGroup>
          <br />

          <div className="row transactionInput">
            <div className="col-12 col-sm-6 col-md-4 mb-1 ">
              <div className="form-group form_input">
                <input
                  type="text"
                  className="form-control "
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add Description"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-1 ">
              <div className="form-group form_input ">
                <input
                  type="text"
                  className="form-control "
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Add Value"
                />
              </div>
            </div>
          </div>

          <Box mt={3} textAlign="center">
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {isEdit ? "Save Edit" : "Add"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionForm;
