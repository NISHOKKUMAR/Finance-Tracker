import React, { useState } from 'react';
import InvestmentForm from '../../Components/Investments/InvestmentForm/InvestmentForm';
import InvestmentTable from '../../Components/Investments/InvestmentTable/InvestmentTable';

const Investments = () => {
  const [investments, setInvestments] = useState([]);

  const addInvestment = (newInvestment) => {
    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
  };

  return (
    <>
      <InvestmentForm onAddInvestment={addInvestment} />
      <InvestmentTable investments={investments} />
    </>
  );
};

export default Investments;
