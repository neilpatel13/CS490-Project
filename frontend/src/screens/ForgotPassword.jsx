import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormLabel, Container } from 'react-bootstrap';
import axios from 'axios';
import '../style/styles.css'
import emailIcon from '../assets/iconEmail.svg'
import logo from '../assets/mainLogo.svg'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/forgot-password', { email }); // Adjust the URL based on your API endpoint
            // Show success message or navigate to another page
            navigate('/password-reset-requested'); // Redirect or handle UI change
        } catch (error) {
            // Handle error (show error message)
            console.error('Error during password reset request', error);
        }
    };
   
    return (

        <div style={{background: '#fff', width: '100vw', height: '95vh', position: 'relative'}} >
            <div id='Black Box' className='blackBox'></div>
                <div id='crushIt' style={{left:'24vw',top:'12vh', position:'absolute',color: '#fff', fontFamily:'Fredoka', fontSize:'7vh', fontStyle:'normal', fontWeight: '500', lineHeight: 'normal'}}>
                    Crush It
                </div>
            <img className='signUpLogo'  src={logo} alt='Someone Working!'/>
            <Container className='signUpRectangle'>
            <Form.Group controlId='Forgot Password'>
                    <FormLabel style={{top:'5vh', left: '2.7vw',  position: 'absolute',color: '#000', fontFamily:'DM Sans', fontSize:'3.5vh', fontStyle:'normal', fontWeight:700, lineHeight: 'normal'}}>Forgot Password</FormLabel>
                </Form.Group>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                <img style={{height:'2vh', position:'absolute', left: '40px', top:'15%', right: '588px'}} src={emailIcon}/>
                    <Form.Label className='fontStyle' style={{position: 'absolute', left:'64px', top: '15%' }}>
                        Email Address
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

                <Button type='submit' variant='primary' className='customButton' style={{top: '47%'}}>
                    Submit
                </Button>


                </Form>
            </Container>
        </div>
    );
};
export default ForgotPassword;