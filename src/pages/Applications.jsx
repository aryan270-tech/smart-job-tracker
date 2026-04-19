import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplications } from '../hooks/useApplications';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import './Applications.css';

const TABS = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected', 'Bookmarked'];

const Applications = () => {
    const { applications } = useApplications();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ status: 'All', sort: 'date-desc' });

    const filteredApplications = useMemo(() => {
        return applications
            .filter(app => {
                // Tab filtering
                if (activeTab === 'Bookmarked') return app.bookmarked;
                if (activeTab !== 'All' && app.status !== activeTab) return false;

                // Dropdown status filtering
                if (filters.status !== 'All' && app.status !== filters.status) return false;

                // Search filtering
                if (searchQuery) {
                    const lowerQuery = searchQuery.toLowerCase();
                    return app.company.toLowerCase().includes(lowerQuery) ||
                        app.role.toLowerCase().includes(lowerQuery);
                }

                return true;
            })
            .sort((a, b) => {
                if (filters.sort === 'date-desc') {
                    return new Date(b.appliedDate) - new Date(a.appliedDate);
                } else if (filters.sort === 'date-asc') {
                    return new Date(a.appliedDate) - new Date(b.appliedDate);
                } else if (filters.sort === 'salary-desc') {
                    return (b.salary || 0) - (a.salary || 0);
                }
                return 0;
            });
    }, [applications, activeTab, searchQuery, filters]);

    return (
        <div className="applications-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Applications Toolkit</h1>
                    <p className="text-secondary" style={{ color: 'var(--text-secondary)' }}>Track, manage, and optimize your job hunt pipeline.</p>
                </div>
            </div>

            <div className="controls-section">
                <SearchBar onSearch={setSearchQuery} />
                <Filters filters={filters} setFilters={setFilters} />
            </div>

            <div className="tabs-container">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div className="tab-indicator" layoutId="tabIndicator" />
                        )}
                    </button>
                ))}
            </div>

            <div className="jobs-grid">
                <AnimatePresence>
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map(app => (
                            <motion.div
                                key={app.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <JobCard job={app} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="empty-icon">📭</div>
                            <h3>No applications found</h3>
                            <p>Try adjusting your search or filters, or add a new application.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Applications;
