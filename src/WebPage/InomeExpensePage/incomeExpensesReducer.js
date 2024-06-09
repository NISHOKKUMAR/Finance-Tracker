// incomeExpensesReducer.js
export const initialState = {
  balance: 0,
  income: 0,
  totalExpenses: 0,
  productName: '',
  date: '',
  price: 0,
  expenses: [],
};

export const incomeExpensesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_INCOME':
      return { ...state, income: action.payload };
    case 'UPDATE_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_PRODUCT_NAME':
      return { ...state, productName: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_PRICE':
      return { ...state, price: parseFloat(action.payload) };
    case 'ADD_EXPENSE':
      const newExpense = {
        productName: state.productName,
        date: state.date,
        price: state.price,
      };
      return {
        ...state,
        expenses: [...state.expenses, newExpense],
        totalExpenses: state.totalExpenses + state.price,
        balance: state.balance - state.price,
        productName: '',
        date: '',
        price: 0,
      };
    default:
      return state;
  }
};
