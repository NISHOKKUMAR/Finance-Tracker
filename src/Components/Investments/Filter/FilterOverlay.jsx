import React, { useState } from 'react';
import './FilterOverlay.css';

const FilterOverlay = ({ onClose, onApplyFilter }) => {
    const [filters, setFilters] = useState({
        name: '',
        sector: '',
        assetClass: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyFilter(filters);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="filter-overlay">
            <div className="filter-content">
                <div className="filter-header">
                    <h3>Filter Investments</h3>
                    <button className="close-button" onClick={handleClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="filter-group">
                        <label htmlFor="name">Stock Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={filters.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="sector">Sector</label>
                        <select
                            id="sector"
                            name="sector"
                            value={filters.sector}
                            onChange={handleChange}
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
                    <div className="filter-group">
                        <label htmlFor="assetClass">Asset Class</label>
                        <select
                            id="assetClass"
                            name="assetClass"
                            value={filters.assetClass}
                            onChange={handleChange}
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
                    <div className="filter-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Apply Filter</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default FilterOverlay;

