import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import { ApiProvider } from './context/ApiContext';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import AdminPanel from './pages/Admin/AdminPanel';
import AdminPrivateRoute from './pages/Admin/AdminPrivateRoute';
import AdminLogin from './pages/Admin/AdminLogin';

const AppRouter = () => (
  <Router>
    <ApiProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/*" element={<PrivateRoute><Home /></PrivateRoute>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminPrivateRoute><AdminPanel /></AdminPrivateRoute>} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </ApiProvider>
  </Router>
);

export default AppRouter;
