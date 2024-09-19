import React from "react";
import { Box, Typography, Card, CardContent} from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const TransactionList = ({
  transactions,
  type,
  handleEdit,
  handleDelete,
  total,
}) => {
  const balance = useSelector((state) => state.balance);

  const stateValue = {
    income: balance.income.reduce((sum, item) => sum + item.value, 0),
  }
  return (
    <Card  className={type === 'income' ? 'income_card' : 'expense_card'} style={{
      backgroundColor:'transparent' 
    }} >
      <CardContent>
      <Typography variant="h6" className={type === 'income' ? 'green' : 'red'}>
          {type === "income" ? "Income" : "Expenses"}
        </Typography>
        
        {transactions.map((item) => {
          
        console.log(transactions,'transactions') ;

          const percentage =
            type === "expense" && total >0
              ? ((item.value / stateValue.income) * 100).toFixed(2)
              : 0;

          return (
            <>
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={2}
              style={{ backgroundColor:'white' }}
              className={type === 'income' ? 'income_card' : 'expense_card'}
            >
              <Typography sx={{ fontWeight: 700, padding: "10px" }}>
                {item.description
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Dont have Inbuilt Method for Captalize...After Split Fetch First Word and UpperCase It and COncat other with lowercase
                  )
                  .join(" ")}
                : {item.value} ₹
              </Typography>

              <Box style={{ padding: "10px" }} className="actions">
                <FaEdit
                  onClick={() => handleEdit({ ...item, type })}
                  style={{ cursor: "pointer", marginRight: 8 }}
                />
                <FaTrashAlt
                  onClick={() => handleDelete(item.id)}
                  style={{ cursor: "pointer", color: "red" }}
                />
                &nbsp;&nbsp;

                {type === "expense" && total > 0 ? (
                  <> 
                  {/* showing percentage when type is expense */}
                    <span className="item__percentage">{percentage}%</span>
                  </>
                ) : null}
              </Box>
            </Box>
            {/* <Divider sx={{ backgroundColor: 'gray' }} /> */}

            </>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
