import React, { useReducer, useState, useEffect } from 'react';
import './IncomeExpenses.css';
import { initialState, incomeExpensesReducer } from './incomeExpensesReducer';

const IncomeExpenses = () => {
  const [Income, setIncome] = useState({ value: 0, editing: false });
  const [Balance, setBalance] = useState({ value: 0, editing: false });
  const [state, dispatch] = useReducer(incomeExpensesReducer, initialState);

  useEffect(() => {
    // Initialize balance with the income value when component mounts
    dispatch({ type: 'UPDATE_BALANCE', payload: Income.value });
  }, [Income.value]);

  const handleInputChange = (e, type) => {
    const value = parseFloat(e.target.value) || 0;
    if (type === 'income') {
      setIncome({ ...Income, value });
    } else if (type === 'balance') {
      setBalance({ ...Balance, value });
    }
  };

  const handleInputKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      if (type === 'income') {
        setIncome({ ...Income, editing: false });
        dispatch({ type: 'UPDATE_INCOME', payload: Income.value });
        // Also set the balance to the initial income value if not already set
        if (state.balance === 0) {
          dispatch({ type: 'UPDATE_BALANCE', payload: Income.value });
        }
      } else if (type === 'balance') {
        setBalance({ ...Balance, editing: false });
        // Add the new balance value to the existing balance
        dispatch({ type: 'UPDATE_BALANCE', payload: state.balance + Balance.value });
      }
    }
  };

  const handleIncomeClick = () => {
    setIncome({ ...Income, editing: true });
  };

  const handleBalanceClick = () => {
    setBalance({ ...Balance, editing: true });
  };

  const addExpense = () => {
    dispatch({ type: 'ADD_EXPENSE' });
  };

  return (
    <div className="income-expenses">
      <div className="card balance-card">
        <div className="card-header">
          <h2 className="card-title">Balance</h2>
          {Balance.editing ? (
            <input
              className="balance-edit-input"
              type="number"
              value={Balance.value}
              onChange={(e) => handleInputChange(e, 'balance')}
              onKeyDown={(e) => handleInputKeyPress(e, 'balance')}
              onBlur={() => setBalance({ ...Balance, editing: false })}
              autoFocus
            />
          ) : (
            <div className="balance-display" onClick={handleBalanceClick}>
              <p className="balance-amount">₹{state.balance.toFixed(2)}</p>
              <button className="edit-button">Edit</button>
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="card-item">
            <h3 className="card-subtitle">Income</h3>
            {Income.editing ? (
              <input
                className="income-edit-input"
                type="number"
                value={Income.value}
                onChange={(e) => handleInputChange(e, 'income')}
                onKeyDown={(e) => handleInputKeyPress(e, 'income')}
                onBlur={() => setIncome({ ...Income, editing: false })}
                autoFocus
              />
            ) : (
              <div className="income-display" onClick={handleIncomeClick}>
                <p className="income-amount">₹{Income.value.toFixed(2)}</p>
                <button className="edit-button">Edit</button>
              </div>
            )}
          </div>
          <div className="card-item">
            <h3 className="card-subtitle">Expenses</h3>
            <p className="expense-amount">₹{state.totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="expense-form-container">
        <div className="expense-form">
          <input
            type="text"
            placeholder="Expense Name"
            value={state.productName}
            onChange={(e) => dispatch({ type: 'SET_PRODUCT_NAME', payload: e.target.value })}
          />
          <input
            type="date"
            value={state.date}
            onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={state.price}
            onChange={(e) => dispatch({ type: 'SET_PRICE', payload: e.target.value })}
          />
          <button onClick={addExpense}>Add Expense</button>
        </div>

        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {state.expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.productName}</td>
                  <td>{expense.date}</td>
                  <td>₹{expense.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
