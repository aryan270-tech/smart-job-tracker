import { FiFilter } from 'react-icons/fi';
import './Controls.css';

const Filters = ({ filters, setFilters }) => {
    const handleStatusChange = (e) => {
        setFilters(prev => ({ ...prev, status: e.target.value }));
    };

    const handleSortChange = (e) => {
        setFilters(prev => ({ ...prev, sort: e.target.value }));
    };

    return (
        <div className="filters-container">
            <div className="filter-group">
                <FiFilter className="filter-icon" />
                <select value={filters.status} onChange={handleStatusChange} className="glass-select">
                    <option value="All">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <div className="filter-group">
                <select value={filters.sort} onChange={handleSortChange} className="glass-select">
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="salary-desc">Highest Salary</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
