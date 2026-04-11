import { useApplications } from '../hooks/useApplications';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';
import './Analytics.css';

const Analytics = () => {
    const { applications } = useApplications();

    // Prepare data for Pie Chart
    const statusCounts = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

    const COLORS = {
        'Applied': '#eab308',
        'Interviewing': '#3b82f6',
        'Offer': '#10b981',
        'Rejected': '#ef4444'
    };

    // Prepare data for Bar Chart (Monthly Applications)
    const monthlyCounts = applications.reduce((acc, app) => {
        if (!app.appliedDate) return acc;
        // ensure valid date parsing
        try {
            const month = format(parseISO(app.appliedDate), 'MMM yyyy');
            acc[month] = (acc[month] || 0) + 1;
        } catch (e) { }
        return acc;
    }, {});

    const barData = Object.entries(monthlyCounts).map(([month, count]) => ({
        name: month,
        Applications: count
    })).slice(-6); // last 6 months

    return (
        <div className="analytics-page fade-in">
            <div className="page-header">
                <h1>Analytics</h1>
                <p className="text-secondary">Data-driven insights for your job pipeline.</p>
            </div>

            <div className="charts-grid">
                <div className="chart-card glass-panel">
                    <h3>Application Pipeline</h3>
                    {pieData.length > 0 ? (
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#94a3b8'} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="custom-legend">
                                {pieData.map(entry => (
                                    <div key={entry.name} className="legend-item">
                                        <span className="legend-color" style={{ backgroundColor: COLORS[entry.name] }}></span>
                                        <span className="legend-label">{entry.name} ({entry.value})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="empty-chart">No data available for pipeline chart.</p>
                    )}
                </div>

                <div className="chart-card glass-panel">
                    <h3>Application Activity</h3>
                    {barData.length > 0 ? (
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                                    <Tooltip
                                        cursor={{ fill: '#1e293b', opacity: 0.4 }}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="Applications" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="empty-chart">No data available for activity chart.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
