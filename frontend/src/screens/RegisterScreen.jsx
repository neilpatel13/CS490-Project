import { useState, useEffect } from 'react';
import{Link, useNavigate} from 'react-router-dom';
import { Form, Button, FormLabel, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import '../style/styles.css'
import emailIcon from '../assets/iconEmail.svg'
import lock from '../assets/lock.svg'
import logo from '../assets/mainLogo.svg'
import Loader from '../components/Loader';

const RegisterScreen = () => {
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
              const res = await register({ email, password }).unwrap();
              dispatch(setCredentials({ ...res }));
              navigate('/');
          } catch (err) {
              toast.error(err?.data?.message || err.error);
          }
      }
      };
    
    return (
        <div style={{background: '#fff', width: '100vw', height: '95vh', position: 'relative'}} >
            <div id='Black Box' className='blackBox'></div>
            <div id='crushIt' style={{left:'24vw',top:'12vh',position:'absolute',color: '#fff', fontFamily:'Fredoka', fontSize:'7vh', fontStyle:'normal', fontWeight: '500', lineHeight: 'normal'}}>
                Crush It
            </div>
            <img className='signUpLogo'  src={logo} alt='Someone Working!'/>
            <Container className='signUpRectangle'>
                <Form.Group controlId='Sign Up'>
                    <FormLabel style={{top:'5vh', left: '2.7vw', position: 'absolute',color: '#000', fontFamily:'DM Sans', fontSize:'3.5vh', fontStyle:'normal', fontWeight:700, lineHeight: 'normal'}}>Sign Up</FormLabel>
                </Form.Group>
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='email'>
                        <img style={{height:'2vh', position:'absolute', left: '40px', top: '15%'}} src={emailIcon}/>
                        <Form.Label className='fontStyle' style={{top: '15%', position: 'absolute', left: '64px'}} > 
                            Email/username
                        </Form.Label>
                        <Form.Control
                            style={{top: '19%'}}
                            className='customRectangle'
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group  controlId='password' >
                        <img style={{height:'2vh', position:'absolute', left: '40px', top: '30%'}} src={lock}/>
                        <Form.Label className='fontStyle'style={{left: '64px',top: '30%', position: 'absolute'}} >
                            Password
                        </Form.Label>
                        <Form.Control
                            style={{top: '34%'}}
                            className='customRectangle'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <img style={{height:'2vh', position:'absolute', left: '40px', top:'45%'}} src={lock}/>
                        <Form.Label className='fontStyle'style={{position:'absolute', top: '45%', left:'64px'}} >
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            style={{top: '49%'}}
                            className='customRectangle'
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Button type='submit' style={{top: '63%', borderRadius: '16px', fontFamily: 'DM sans', background:'linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)', boxShadow: '0px 4px 80px 0px rgba(98, 132, 255, 0.20)'}} variant='primary' className='customButton'>
                        Sign Up
                    </Button>

                    {isLoading && <Loader />}

                </Form>
                
                <div className='customRectangle2'>
                    <div className='fontStyle2'>
                        Already have an account? <Link to={'/login'}>Sign in here!</Link>
                    </div>
                </div>
            </Container>
            
        </div>

    );
};
export default RegisterScreen;