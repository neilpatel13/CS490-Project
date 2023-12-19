// main.jsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
// import LoginScreen from './screens/LoginScreen.jsx';
// import RegisterScreen from './screens/RegisterScreen.jsx';
// import ProfileScreen from './screens/ProfileScreen.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';
// import HomeScreen from './screens/HomeScreen.jsx';
// import ForgotPassword from './screens/ForgotPassword.jsx';
// import TasksAppts from './screens/TasksAppts.jsx';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route index ={true} path='/' element={<HomeScreen />} />
//       <Route path='/login' element={<LoginScreen />} />
//       <Route path='/tasks' element={<TasksAppts />} />
//       <Route path='/forgot' element={<ForgotPassword/>} />
//       <Route path='/register' element={<RegisterScreen />} />
//       <Route path='' element={<PrivateRoute />}>
//       <Route path='/profile' element={<ProfileScreen />} />
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DndProvider>
  </Provider>
);
