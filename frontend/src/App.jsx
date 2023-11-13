//import Header from "./components/Header";
//import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    {/* <Header /> */}
      <ToastContainer />
      <Outlet />
    {/* <Container>

    </Container> */}
    </>
  );
};
export default App;