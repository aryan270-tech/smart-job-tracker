import { useApplications } from '../hooks/useApplications';
import JobCard from '../components/JobCard';
import { FiBriefcase, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './Dashboard.css';

const StatCard = ({ title, value, icon, colorClass }) => (
    <div className={`stat-card glass-panel ${colorClass}`}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
            <h3>{value}</h3>
            <p>{title}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { applications } = useApplications();

    const total = applications.length;
    const interviewing = applications.filter(a => a.status === 'Interviewing').length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const rejections = applications.filter(a => a.status === 'Rejected').length;

    const recentApps = [...applications].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)).slice(0, 3);

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p className="text-secondary">Here is a quick overview of your job hunt progress.</p>
            </div>

            <div className="stats-grid">
                <StatCard title="Total Applications" value={total} icon={<FiBriefcase />} colorClass="stat-blue" />
                <StatCard title="Interviews" value={interviewing} icon={<FiCalendar />} colorClass="stat-yellow" />
                <StatCard title="Offers" value={offers} icon={<FiCheckCircle />} colorClass="stat-green" />
                <StatCard title="Rejections" value={rejections} icon={<FiXCircle />} colorClass="stat-red" />
            </div>

            <div className="recent-section">
                <div className="section-header">
                    <h2>Recent Applications</h2>
                </div>
                <div className="jobs-grid">
                    {recentApps.length > 0 ? (
                        recentApps.map(app => <JobCard key={app.id} job={app} />)
                    ) : (
                        <p className="text-secondary">No applications added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
