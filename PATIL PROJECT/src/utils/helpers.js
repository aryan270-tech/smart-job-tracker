export const initialMockData = [
    {
        id: "1",
        company: "Google",
        role: "Frontend Engineer",
        location: "Remote",
        salary: 150000,
        platform: "LinkedIn",
        status: "Interviewing",
        appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        interviewDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
        notes: "First round with recruiter.",
        bookmarked: true,
        logo: "/frontend_engineer_icon.png"
    },
    {
        id: "2",
        company: "Meta",
        role: "React Developer",
        location: "Menlo Park, CA",
        salary: 160000,
        platform: "Company Site",
        status: "Offer",
        appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
        interviewDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        notes: "Waiting for official letter.",
        bookmarked: true,
        logo: "/frontend_engineer_icon.png"
    },
    {
        id: "3",
        company: "Stripe",
        role: "UI Engineer",
        location: "New York, NY",
        salary: 145000,
        platform: "Referral",
        status: "Applied",
        appliedDate: new Date().toISOString(),
        interviewDate: null,
        notes: "Referred by John.",
        bookmarked: false,
        logo: "/ui_engineer_icon.png"
    },
    {
        id: "4",
        company: "Netflix",
        role: "Senior Frontend Engineer",
        location: "Los Gatos, CA",
        salary: 200000,
        platform: "Indeed",
        status: "Rejected",
        appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        interviewDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
        notes: "Didn't pass system design.",
        bookmarked: false,
        logo: "/frontend_engineer_icon.png"
    }
];

export const getStatusColor = (status) => {
    switch (status) {
        case 'Applied': return 'var(--accent-yellow)';
        case 'Interviewing': return 'var(--accent-blue)';
        case 'Offer': return 'var(--accent-green)';
        case 'Rejected': return 'var(--accent-red)';
        default: return 'var(--text-secondary)';
    }
};
