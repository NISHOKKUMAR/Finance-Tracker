import React, { useState, useEffect } from 'react';
import './InvestmentTable.css';
import FilterOverlay from '../Filter/FilterOverlay';

const InvestmentTable = ({ investments }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [filteredInvestments, setFilteredInvestments] = useState(investments);
    {/*const [totalReturn, setTotalReturn] = useState(null);*/}

    useEffect(() => {
        setFilteredInvestments(investments);
    }, [investments]);

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const applyFilter = (filters) => {
        let filtered = investments;
        
        if (filters.name) {
            filtered = filtered.filter(inv => inv.stockName.includes(filters.name));
        }
        if (filters.sector) {
            filtered = filtered.filter(inv => inv.sector === filters.sector);
        }
        if (filters.assetClass) {
            filtered = filtered.filter(inv => inv.assetClass === filters.assetClass);
        }
        if (filters.startDate && filters.endDate) {
            filtered = filtered.filter(inv => new Date(inv.purchaseDate) >= new Date(filters.startDate) && new Date(inv.purchaseDate) <= new Date(filters.endDate));
        }

        setFilteredInvestments(filtered);
        setShowFilter(false);
    };

    const resetFilter = () => {
        setFilteredInvestments(investments);
        setShowFilter(false);
    };

    {/*
    const fetchCurrentPrice = async (symbol) => {
        const apiKey = 'ZDOOKYNGYUU8AMCY';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data['Time Series (1min)']) {
                const timeSeries = data['Time Series (1min)'];
                const latestTime = Object.keys(timeSeries)[0];
                const currentPrice = parseFloat(timeSeries[latestTime]['4. close']);
                console.log(data);
                console.log(currentPrice);
                return currentPrice;
            } else {
                throw new Error(`Invalid data for symbol: ${symbol}`);
            }
        } catch (error) {
            console.error(`Error fetching price for ${symbol}:`, error);
            return null;
        }
    };

    const calculateTotalReturn = async () => {
        let totalReturn = 0;
        let validInvestments = 0;
        console.log(filteredInvestments);
        for (const investment of filteredInvestments) {
            const currentPrice = await fetchCurrentPrice(investment.stockName);
            if (currentPrice) {
                const absoluteReturn = ((investment.noOfShares * currentPrice) - (investment.noOfShares * investment.buyPrice)) * 100 / (investment.noOfShares * investment.buyPrice);
                totalReturn += absoluteReturn;
                validInvestments += 1;
            }
        }

        setTotalReturn(validInvestments > 0 ? (totalReturn / validInvestments) : 0);
    };
    */}

    return (
        <div className="investment-table-container">
            <div className="table-header">
                <button className="reset" onClick={resetFilter}>Reset</button>
                <button className="filter" onClick={toggleFilter}>Filter</button>
                {/*<button className="calculate-return" onClick={calculateTotalReturn}>Calculate Absolute Return</button>*/}
            </div>
            <table className="investment-table">
                <thead>
                    <tr>
                        <th>Stock Name</th>
                        <th>Buy Price</th>
                        <th>Number of Shares</th>
                        <th>Date of Purchase</th>
                        <th>Sector</th>
                        <th>Asset Class</th>
                        <th>Amount Invested</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvestments.map((investment, index) => (
                        <tr key={index}>
                            <td>{investment.stockName}</td>
                            <td>{investment.buyPrice}</td>
                            <td>{investment.noOfShares}</td>
                            <td>{investment.purchaseDate}</td>
                            <td>{investment.sector}</td>
                            <td>{investment.assetClass}</td>
                            <td>{(investment.noOfShares * investment.buyPrice).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showFilter && <FilterOverlay onClose={toggleFilter} onApplyFilter={applyFilter} />}
            {/*{totalReturn !== null && (
                <div className="total-return">
                    <h3>Total Absolute Return: {totalReturn.toFixed(2)}%</h3>
                </div>
            )}*/}
        </div>
    );
};

export default InvestmentTable;
