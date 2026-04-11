import { createContext, useState, useEffect } from 'react';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState(() => {
        const stored = localStorage.getItem('applications');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    // Save whenever state changes
    useEffect(() => {
        localStorage.setItem('applications', JSON.stringify(applications));
    }, [applications]);

    // ✅ Add
    const addApplication = (app) => {
        const newApp = {
            ...app,
            id: Date.now().toString()
        };

        setApplications(prev => [...prev, newApp]);
    };

    // ✅ Update
    const updateApplication = (id, updatedApp) => {
        setApplications(prev =>
            prev.map(app =>
                app.id === id ? { ...app, ...updatedApp } : app
            )
        );
    };

    // ✅ DELETE (🔥 ADDED)
    const deleteApplication = (id) => {
        setApplications(prev => prev.filter(app => app.id !== id));
    };

    // ✅ TOGGLE BOOKMARK (🔥 ADDED)
    const toggleBookmark = (id) => {
        setApplications(prev =>
            prev.map(app =>
                app.id === id
                    ? { ...app, bookmarked: !app.bookmarked }
                    : app
            )
        );
    };

    return (
        <ApplicationContext.Provider
            value={{
                applications,
                addApplication,
                updateApplication,
                deleteApplication,   // ✅ added
                toggleBookmark       // ✅ added
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};