import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import useDebounce from '../hooks/useDebounce';
import './Controls.css'; // Shared CSS for filters and search

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    return (
        <div className="search-bar glass-panel">
            <FiSearch className="search-icon" />
            <input
                type="text"
                placeholder="Search by company or role..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
