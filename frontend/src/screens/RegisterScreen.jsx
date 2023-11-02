import { useState, useEffect } from 'react';
import{Link, useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [register, { isLoading }] = useRegisterMutation();
  
    const { userInfo } = useSelector((state) => state.auth);
  
    useEffect(() => {
      if (userInfo) {
        navigate('/');
      }
    }, [navigate, userInfo]);
    
    const submitHandler = async (e) => {
      e.preventDefault();
    
      // Check length
      if (password.length < 12) {
          toast.error('Password must be at least 12 characters long');
          return;
      }
  
      // Check complexity
      let checksPassed = 0;
      if (/[A-Z]/.test(password)) checksPassed++; // Uppercase letter
      if (/[a-z]/.test(password)) checksPassed++; // Lowercase letter
      if (/\d/.test(password)) checksPassed++; // Numeric digit
      if (/\W/.test(password)) checksPassed++; // Special character
  
      if (checksPassed < 2) {
          toast.error('Password must contain at least two of the following: an uppercase letter, a lowercase letter, a numeric digit, or a special character');
          return;
      }
  
      if (password !== confirmPassword) {
          toast.error('Passwords do not match');
      } else {
          try {
              const res = await register({ name, email, password }).unwrap();
              dispatch(setCredentials({ ...res }));
              navigate('/');
          } catch (err) {
              toast.error(err?.data?.message || err.error);
          }
      }
      };
    
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign Up
                </Button>

                {isLoading && <Loader/>}

            </Form>
            
            <Row className='py-3'>
                <Col>
                    Already Have An Account? Login <Link to={'/login'}>here</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
export default RegisterScreen;