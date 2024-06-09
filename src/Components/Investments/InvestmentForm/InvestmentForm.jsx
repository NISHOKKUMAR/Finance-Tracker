import React, { useState } from 'react';
import './InvestmentForm.css';

const InvestmentForm = ({ onAddInvestment }) => {
    const [formData, setFormData] = useState({
        stockName: '',
        buyPrice: '',
        noOfShares: '',
        purchaseDate: '',
        sector: '',
        assetClass: ''
    });

    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'stockName' && value) {
            fetchStockSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const fetchStockSuggestions = async (name) => {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=ZDOOKYNGYUU8AMCY`);
            const data = await response.json();
            setSuggestions(data.bestMatches.map(match => match['2. name']));
        } catch (error) {
            console.error('Error fetching stock suggestions:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddInvestment(formData);
        setFormData({
            stockName: '',
            buyPrice: '',
            noOfShares: '',
            purchaseDate: '',
            sector: '',
            assetClass: ''
        });
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        setFormData((prevData) => ({
            ...prevData,
            stockName: suggestion
        }));
        setSuggestions([]);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="stockName">Stock Name</label>
                        <input
                            type="text"
                            id="stockName"
                            name="stockName"
                            value={formData.stockName}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="buyPrice">Buy Price</label>
                        <input
                            type="number"
                            step="0.01"
                            id="buyPrice"
                            name="buyPrice"
                            value={formData.buyPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="noOfShares">Number of Shares</label>
                        <input
                            type="number"
                            id="noOfShares"
                            name="noOfShares"
                            value={formData.noOfShares}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="purchaseDate">Date of Purchase</label>
                        <input
                            type="date"
                            id="purchaseDate"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="sector">Sector</label>
                        <select
                            id="sector"
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Sector</option>
                            <option value="IT">IT</option>
                            <option value="Pharmaceuticals and Healthcare">Pharmaceuticals and Healthcare</option>
                            <option value="Banking and Financial Services">Banking and Financial Services</option>
                            <option value="Energy">Energy</option>
                            <option value="Automobile">Automobile</option>
                            <option value="Industrial">Industrial</option>
                            <option value="FMCG">FMCG</option>
                            <option value="Retail">Retail</option>
                            <option value="Telecommunication">Telecommunication</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="assetClass">Asset Class</label>
                        <select
                            id="assetClass"
                            name="assetClass"
                            value={formData.assetClass}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Asset Class</option>
                            <option value="Equity">Equity</option>
                            <option value="Debt">Debt</option>
                            <option value="Mutual Fund">Mutual Fund</option>
                            <option value="ETF">ETF</option>
                            <option value="Commodities">Commodities</option>
                            <option value="REIT">REIT</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Add Investment</button>
            </form>
        </div>
    );
};

export default InvestmentForm;
