import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const[currentPassword, setCurrntPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for Pomodoro Timer settings
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);



  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();

    //password complexity: Minumum 8 character, At least one upper, At least one lower, At least one digit
    // Requires symbols such as !@#$%^&*
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error('Password does not meet complexity requirements');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
  
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='currentPassword'>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Current Password'
            value={currentPassword}
            onChange={(e) => setCurrntPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Pomodoro Timer settings */}
        <Form.Group className="my-2" controlId="pomodoroTime">
          <Form.Label>Pomodoro Timer (minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Pomodoro Timer"
            value={pomodoroTime}
            onChange={(e) => setPomodoroTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="shortBreakTime">
          <Form.Label>Short Break (minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Short Break"
            value={shortBreakTime}
            onChange={(e) => setShortBreakTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="longBreakTime">
          <Form.Label>Long Break (minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Long Break"
            value={longBreakTime}
            onChange={(e) => setLongBreakTime(e.target.value)}
          />
        </Form.Group>
















        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
    
  );
};

export default ProfileScreen;