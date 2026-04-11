import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ApplicationProvider } from './context/ApplicationContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import Analytics from './pages/Analytics';
import Jobs from './pages/Jobs';

function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/new" element={<AddApplication />} />
            <Route path="applications/:id" element={<AddApplication editMode />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="jobs" element={<Jobs />} />
          </Route>
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </ApplicationProvider>
  );
}

export default App;