import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import { ApiProvider } from './context/ApiContext';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';

const AppRouter = () => (
  <ApiProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/*" element={<PrivateRoute><Home /></PrivateRoute>} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  </ApiProvider>
);

export default AppRouter;
