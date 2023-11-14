//import Header from "./components/Header";
//import { Container } from 'react-bootstrap';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import the ResetPasswordPage component
import ResetPasswordPage from './components/ResetPasswordPage';

const App = () => {
  return (
    <>
    {/* <Header /> */}
      <ToastContainer />
      <Outlet />
      <Routes>
        {/* Add the new route for reset password */}
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        {/* Outlet for nested routes */}
        <Route path="*" element={<Outlet />} />
      </Routes>
    {/* <Container>

    </Container> */}
    </>
  );
};
export default App;