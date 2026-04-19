import { NavLink } from 'react-router-dom';
import { FiHome, FiList, FiPlusSquare, FiPieChart, FiSearch } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
        { name: 'Find Jobs', icon: <FiSearch />, path: '/jobs' },
        { name: 'Applications', icon: <FiList />, path: '/applications' },
        { name: 'Add New', icon: <FiPlusSquare />, path: '/applications/new' },
        { name: 'Analytics', icon: <FiPieChart />, path: '/analytics' },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <div className="logo-icon">SJ</div>
                <h2>SmartJob</h2>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
