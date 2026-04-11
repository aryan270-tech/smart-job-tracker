import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useApplications } from '../hooks/useApplications';
import './AddApplication.css';

const schema = yup.object({
    company: yup.string().required('Company name is required'),
    role: yup.string().required('Role is required'),
    location: yup.string().required('Location is required'),
    salary: yup.number().transform((value) => (Number.isNaN(value) ? null : value)).nullable(),
    platform: yup.string().required('Platform is required'),
    status: yup.string().required('Status is required'),
    appliedDate: yup.string().required('Applied Date is required'),
    interviewDate: yup.string().nullable().test(
        'is-after-applied',
        'Interview date cannot be before applied date',
        function (value) {
            const { appliedDate } = this.parent;
            if (!value || !appliedDate) return true;
            return new Date(value).getTime() >= new Date(appliedDate).getTime();
        }
    ),
    notes: yup.string()
}).required();

const AddApplication = ({ editMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { applications, addApplication, updateApplication } = useApplications();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            status: 'Applied',
            appliedDate: new Date().toISOString().split('T')[0]
        }
    });

    useEffect(() => {
        if (editMode && id) {
            const existingApp = applications.find(app => app.id === id);
            if (existingApp) {
                Object.keys(existingApp).forEach(key => {
                    if (key === 'appliedDate' || key === 'interviewDate') {
                        if (existingApp[key]) {
                            setValue(key, new Date(existingApp[key]).toISOString().split('T')[0]);
                        }
                    } else {
                        setValue(key, existingApp[key]);
                    }
                });
            } else {
                toast.error("Application not found.");
                navigate('/applications');
            }
        }
    }, [editMode, id, applications, setValue, navigate]);
    const onSubmit = (data) => {
    const payload = {
        ...data,
        appliedDate: data.appliedDate ? new Date(data.appliedDate).toISOString() : null,
        interviewDate: data.interviewDate ? new Date(data.interviewDate).toISOString() : null,
        bookmarked: false
    };

    if (editMode) {
        updateApplication(id, payload);
    } else {
        addApplication(payload);
    }

    navigate('/applications'); // ✅ simple
};
    return (
        <div className="form-page fade-in">
            <div className="page-header">
                <h1>{editMode ? 'Edit Application' : 'Add New Application'}</h1>
                <p className="text-secondary">{editMode ? 'Update the details of your job application.' : 'Log a new application to your pipeline.'}</p>
            </div>

            <div className="form-container glass-panel">
                <form onSubmit={handleSubmit(onSubmit)} className="app-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Company Name *</label>
                            <input type="text" {...register("company")} className={errors.company ? 'error-input' : ''} placeholder="e.g. Google" />
                            <span className="error-text">{errors.company?.message}</span>
                        </div>

                        <div className="form-group">
                            <label>Role *</label>
                            <input type="text" {...register("role")} className={errors.role ? 'error-input' : ''} placeholder="e.g. Frontend Engineer" />
                            <span className="error-text">{errors.role?.message}</span>
                        </div>

                        <div className="form-group">
                            <label>Location *</label>
                            <input type="text" {...register("location")} className={errors.location ? 'error-input' : ''} placeholder="e.g. Remote, NY" />
                            <span className="error-text">{errors.location?.message}</span>
                        </div>

                        <div className="form-group">
                            <label>Salary (Yearly)</label>
                            <input type="number" {...register("salary")} placeholder="e.g. 150000" />
                        </div>

                        <div className="form-group">
                            <label>Platform *</label>
                            <input type="text" {...register("platform")} className={errors.platform ? 'error-input' : ''} placeholder="e.g. LinkedIn" />
                            <span className="error-text">{errors.platform?.message}</span>
                        </div>

                        <div className="form-group">
                            <label>Status *</label>
                            <select {...register("status")} className={errors.status ? 'error-input' : ''}>
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Applied Date *</label>
                            <input type="date" {...register("appliedDate")} className={errors.appliedDate ? 'error-input' : ''} />
                            <span className="error-text">{errors.appliedDate?.message}</span>
                        </div>

                        <div className="form-group">
                            <label>Interview Date</label>
                            <input type="date" {...register("interviewDate")} className={errors.interviewDate ? 'error-input' : ''} />
                            <span className="error-text">{errors.interviewDate?.message}</span>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Notes</label>
                        <textarea {...register("notes")} rows="4" placeholder="Any additional notes..."></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/applications')}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{editMode ? 'Save Changes' : 'Add Application'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddApplication;
