import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordPage from './components/ResetPasswordPage';

// Other imports...

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        {/* Add other routes here */}
        {/* <Route path="/" element={<YourHomePage />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
