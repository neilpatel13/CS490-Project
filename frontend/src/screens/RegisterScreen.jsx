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
        navigate('/register');
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
        <div style={{background: '#fff', width: '1440px', height: '1024px'}} >
            <div id='Black Box' className='blackBox'></div>
            <div id='Crush It' style={{right:'369px',bottom:'791px',left:'253px',top:'160px',position:'absolute',color: '#fff', fontFamily:'Fredoka', fontSize:'60px', fontStyle:'normal', fontWeight: '500', lineHeight: 'normal'}}>
                Crush It
            </div>
            <img className='signUpLogo'  src={logo} alt='Someone Working!'/>
            <Container className='signUpRectangle'>
                <Form.Group controlId='Sign Up'>
                    <FormLabel style={{top:'40px', left: '40px', right: '497px', bottom: '825px', position: 'absolute',color: '#000', fontFamily:'DM Sans', fontSize:'30px', fontStyle:'normal', fontWeight:700, lineHeight: 'normal'}}>Sign Up</FormLabel>
                </Form.Group>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <img style={{position:'absolute', left: '40px', top:'129px', right: '588px'}} src={emailIcon}/>
                        <Form.Label className='fontStyle' style={{position: 'absolute', left:'64px', top: '129px' }} >
                            Name
                        </Form.Label>
                        <Form.Control 
                            className='customRectangle'
                            style={{top: '154px'}}
                            type='name'
                            placeholder='Enter Name'
                            value={name}onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <img style={{position:'absolute', left: '40px',top: '250px'}} src={emailIcon}/>
                        <Form.Label className='fontStyle' style={{top: '250px', position: 'absolute', left: '64px'}} > 
                            Email/username
                        </Form.Label>
                        <Form.Control
                            style={{top: '275px'}}
                            className='customRectangle'
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group  controlId='password' >
                        <img style={{position:'absolute', left: '40px', top: '371px'}} src={lock}/>
                        <Form.Label className='fontStyle'style={{left: '64px',top: '371px',position: 'absolute'}} >
                            Password
                        </Form.Label>
                        <Form.Control
                            style={{top: '396px'}}
                            className='customRectangle'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <img style={{position:'absolute', left: '40px', top:'492px'}} src={lock}/>
                        <Form.Label className='fontStyle'style={{position:'absolute', top: '492px', left:'64px'}} >
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            style={{top: '521px'}}
                            className='customRectangle'
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='customButton'>
                        Sign Up
                    </Button>

                    {isLoading }

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