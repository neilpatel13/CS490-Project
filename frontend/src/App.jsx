// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordPage from './components/ResetPasswordPage';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ForgotPassword from './screens/ForgotPassword.jsx';
import EmailVerification from './components/EmailVerification';
import TasksAppts from './screens/TasksAppts.jsx';


// Other imports...

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path='/tasks' element={<TasksAppts />} />
        </Route>
        {/* Add other routes here */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
