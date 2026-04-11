import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiBookmark, FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { format } from 'date-fns';
import { getStatusColor } from '../utils/helpers';
import { useApplications } from '../hooks/useApplications';
import './JobCard.css';

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const { deleteApplication, toggleBookmark } = useApplications();

    const formattedDate = job.appliedDate
        ? format(new Date(job.appliedDate), 'MMM dd, yyyy')
        : 'N/A';

    const statusColor = getStatusColor(job.status);

    const domain = job.company.toLowerCase().replace(/\s+/g, '') + '.com';

    return (
        <div className="job-card glass-panel">
            <div className="job-card-header">
                <div className="company-info">
                    <img
                        src={job.logo || `https://logo.clearbit.com/${domain}`}
                        alt={job.company}
                        className="company-logo"
                        onError={(e) => {
                            e.target.src =
                                'https://via.placeholder.com/40?text=' +
                                job.company.charAt(0);
                        }}
                    />
                    <div>
                        <h3 className="job-role">{job.role}</h3>
                        <span className="company-name">{job.company}</span>
                    </div>
                </div>

                {/* ✅ Bookmark */}
                <button
                    className={`icon-btn bookmark-btn ${job.bookmarked ? 'bookmarked' : ''}`}
                    onClick={() => toggleBookmark(job.id)}
                    title="Bookmark"
                >
                    <FiBookmark className={job.bookmarked ? 'fill-current' : ''} />
                </button>
            </div>

            <div className="job-card-body">
                <div className="job-detail">
                    <FiMapPin /> <span>{job.location}</span>
                </div>
                <div className="job-detail">
                    <FiDollarSign /> <span>${job.salary?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="job-detail">
                    <FiCalendar /> <span>Applied: {formattedDate}</span>
                </div>
            </div>

            <div className="job-card-footer">
                <span
                    className="status-badge"
                    style={{
                        backgroundColor: `${statusColor}20`,
                        color: statusColor,
                        border: `1px solid ${statusColor}40`
                    }}
                >
                    {job.status}
                </span>

                <div className="action-buttons">
                    {/* Edit */}
                    <button
                        className="icon-btn edit-btn"
                        onClick={() => navigate(`/applications/${job.id}`)}
                    >
                        <FiEdit2 />
                    </button>

                    {/* Delete */}
                    <button
                        className="icon-btn delete-btn"
                        onClick={() => deleteApplication(job.id)}
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;