import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  income: [],
  expenses: [],
  total: 0
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {

      addIncome: (state, action) => {
        const { type, description, value } = action.payload;
        const numericValue = parseFloat(value); 
  
        if (type === 'income') {
          state.income.push({
            id: Date.now(),
            description,
            value: numericValue
          });
          state.total += numericValue;
        } else if (type === 'expense') {
          if (state.income.length === 0) {
            throw new Error('Cannot add an expense without any income');
          }
  
          state.expenses.push({
            id: Date.now(),
            description,
            value: numericValue
          });
          state.total -= numericValue;
        }
      },
  
      editTransaction: (state, action) => {
        const { type, id, description, value } = action.payload;
        const numericValue = parseFloat(value);
  
        if (type === 'income') {
          const incomeIndex = state.income.findIndex((item) => item.id === id);
          if (incomeIndex !== -1) {
            state.total = state.total - state.income[incomeIndex].value + numericValue;
            state.income[incomeIndex] = { ...state.income[incomeIndex], description, value: numericValue };
          }
        } else if (type === 'expense') {
          const expenseIndex = state.expenses.findIndex((item) => item.id === id);
          if (expenseIndex !== -1) {
            state.total = state.total + state.expenses[expenseIndex].value - numericValue;
            state.expenses[expenseIndex] = { ...state.expenses[expenseIndex], description, value: numericValue };
          }
        }
      },
  
      deleteTransaction: (state, action) => {
        const id = action.payload;
        const incomeIndex = state.income.findIndex((item) => item.id === id);
        const expenseIndex = state.expenses.findIndex((item) => item.id === id);
  
        if (incomeIndex !== -1) {
          state.total -= state.income[incomeIndex].value;
          state.income.splice(incomeIndex, 1);
        } else if (expenseIndex !== -1) {
          state.total += state.expenses[expenseIndex].value;
          state.expenses.splice(expenseIndex, 1);
        }
      }
    }
  });
  

export const { addIncome, editTransaction, deleteTransaction } = balanceSlice.actions;
export default balanceSlice.reducer;
