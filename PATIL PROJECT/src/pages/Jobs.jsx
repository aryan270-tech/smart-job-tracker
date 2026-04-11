import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBriefcase, FiMapPin, FiClock } from 'react-icons/fi';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            // Check local storage first
            const cachedJobs = localStorage.getItem('mockJobs');
            if (cachedJobs) {
                setJobs(JSON.parse(cachedJobs));
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://dummyjson.com/products');
                // Map product data to mock job listings
                const mockJobs = response.data.products.map(product => {
                    const companyName = product.brand || 'Tech Corp';
                    const domain = companyName.toLowerCase().replace(/\s+/g, '') + '.com';
                    
                    return {
                        id: product.id,
                        title: product.title,
                        company: companyName,
                        description: product.description,
                        location: 'Remote',
                        type: 'Full-time',
                        domain: domain,
                        category: product.category,
                    };
                });
                
                // Save to local storage for future visits
                localStorage.setItem('mockJobs', JSON.stringify(mockJobs));
                setJobs(mockJobs);
            } catch (err) {
                setError('Failed to fetch job listings.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const LogoImage = ({ domain, company }) => {
        const [imgError, setImgError] = useState(false);
        const logoUrl = `https://logo.clearbit.com/${domain}`;
        
        return imgError ? (
            <div className="job-logo-fallback">{company.charAt(0)}</div>
        ) : (
            <img 
                src={logoUrl} 
                alt={`${company} logo`} 
                className="job-logo"
                onError={() => setImgError(true)}
            />
        );
    };

    return (
        <div className="jobs-page fade-in">
            <div className="page-header">
                <h1>Find Jobs</h1>
                <p className="text-secondary">Discover open opportunities mock data powered by DummyJSON.</p>
            </div>

            {loading ? (
                <div className="loader">Loading jobs...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map(job => (
                        <div key={job.id} className="job-card glass-panel">
                            <div className="job-card-header">
                                <LogoImage domain={job.domain} company={job.company} />
                                <div>
                                    <h3 className="job-title">{job.title}</h3>
                                    <p className="job-company">{job.company}</p>
                                </div>
                            </div>
                            <div className="job-details">
                                <span className="job-badge"><FiMapPin /> {job.location}</span>
                                <span className="job-badge"><FiBriefcase /> {job.category}</span>
                                <span className="job-badge"><FiClock /> {job.type}</span>
                            </div>
                            <p className="job-description">{job.description}</p>
                            <div className="job-card-footer">
                                <button className="btn btn-primary" onClick={() => alert(`Applying for ${job.title}...`)}>Apply Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;
