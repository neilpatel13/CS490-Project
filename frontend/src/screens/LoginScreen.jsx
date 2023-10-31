import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

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
            console.error(err?.data?.message || err.error);
        }
    };

    return (

        <FormContainer>

            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address/username</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
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
                        onChange={ (e) => setPassword(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign in
                </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                    Need An Account? <Link to={'/register'}> Sign Up</Link>
                    </Col>
                </Row>
        </FormContainer>

    );
};
export default LoginScreen;