import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, FormLabel, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../style/styles.css'
import emailIcon from '../assets/iconEmail.svg'
import lock from '../assets/lock.svg'
import logo from '../assets/mainLogo.svg'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation(); 

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) { 
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    
    return (

        <div style={{background: '#fff', width: '100vw', height: '100vh', position: 'relative'}} >
            <div id='Black Box' className='blackBox'></div>
                <div id='crushIt' style={{left:'24vw',top:'12vh', position:'absolute',color: '#fff', fontFamily:'Fredoka', fontSize:'7vh', fontStyle:'normal', fontWeight: '500', lineHeight: 'normal'}}>
                    Crush It
                </div>
            <img className='signUpLogo'  src={logo} alt='Someone Working!'/>
            <Container className='signUpRectangle'>
            <Form.Group controlId='Sign In'>
                    <FormLabel style={{top:'5vh', left: '2.7vw',  position: 'absolute',color: '#000', fontFamily:'DM Sans', fontSize:'3.5vh', fontStyle:'normal', fontWeight:700, lineHeight: 'normal'}}>Sign in</FormLabel>
                </Form.Group>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                <img style={{height:'2vh', position:'absolute', left: '40px', top:'15%', right: '588px'}} src={emailIcon}/>
                    <Form.Label className='fontStyle' style={{position: 'absolute', left:'64px', top: '15%' }}>
                        Email Address/username
                    </Form.Label>
                    <Form.Control
                        className='customRectangle'
                        style={{top: '19%'}}
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                <img style={{height:'2vh', position:'absolute', left: '40px', top: '30%'}} src={lock}/>
                    <Form.Label className='fontStyle' style={{left: '64px',top: '30%',position: 'absolute'}} >
                        Password
                    </Form.Label>
                    <Form.Control
                        style={{top: '34%'}}
                        className='customRectangle'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='customButton' style={{top: '47%'}}>
                    Sign In
                </Button>

                {isLoading && <Loader />}

                </Form>

                <div className='customRectangle2'>
                    <div className='fontStyle2'>
                    Need An Account? <Link to={'/register'}> Sign Up</Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};
export default LoginScreen;