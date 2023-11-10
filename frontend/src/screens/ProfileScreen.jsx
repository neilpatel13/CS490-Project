import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
//import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/mainLogo.svg'
import lo from '../assets/logout.svg'
import usr from '../assets/profile.svg'
import lock from '../assets/lock.svg'
import cl from '../assets/lock.svg'

const ProfileScreen = () => {
  //const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const[currentPassword, setCurrntPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for Pomodoro Timer settings
  const [pomodoroTime, setPomodoroTime] = useState();
  const [shortBreakTime, setShortBreakTime] = useState();
  const [longBreakTime, setLongBreakTime] = useState();



  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
      setName(userInfo.name);
      //setEmail(userInfo.email);
      setPomodoroTime(userInfo.pomodoro);
      setShortBreakTime(userInfo.short);
      setLongBreakTime(userInfo.long);
  }, [userInfo.email, userInfo.name, userInfo.pomodoro, userInfo.short, userInfo.long]);

  //const history = useHistory();

/**
 * const handleCancelClick = () => {
    history.push('/');
  };
 */
  


  const submitHandler = async (e) => {
    e.preventDefault();
    // Check if the password fields are not empty and contain a new password
    const isPasswordChanged = password !== '' && confirmPassword !== '';
  
    if (isPasswordChanged) {
      
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
        return;
      }
    }
  
    try {
      const userData = {
        _id: userInfo._id,
        name,
        pomodoro: pomodoroTime,
        short: shortBreakTime,
        long: longBreakTime,
      };
  
      // Only include password fields if they are intended to be updated
      if (isPasswordChanged) {
        userData.password = password;
      }
  
      const res = await updateProfile(userData).unwrap();
      dispatch(setCredentials(res));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div id='backgound' style={{background: '#fff', width: '100vw', height: '100vh', position: 'relative'}} >
      <div id='topBar' className='topBar'> 
          <p id='profile' style={{ left:'1%', top:'22%', position:'absolute'}} >Profile</p>
      </div>

      <div style={{color: "#000",fontFamily: "DM Sans", fontSize: "2.2vh", fontStyle: "normal", fontWeight: "700", lineHeight: "normal", position:'absolute', left:'14.8%', top:'11%'}}>
        User Info
      </div>

      <Container id='userInfo' className='container1' style={{top:'16%'}}>
      <Row >
        <Col md="12 ">
          <Form>
            <Row>
              <Col >
                <Form.Group controlId="firstName" >
                  <Form.Label> <img src={usr} alt="usr" /> First Name</Form.Label>
                  <Form.Control type="text" placeholder=""  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="lastName">
                  <Form.Label> <img src={usr} alt="usr" /> Last Name</Form.Label>
                  <Form.Control type="text" placeholder=""  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>


    <div id='password' style={{color: "#000",fontFamily: "DM Sans", fontSize: "2.2vh", fontStyle: "normal", fontWeight: "700", lineHeight: "normal", position:'absolute', left:'14.8%', top:'32%'}}>
        Change Password
    </div>
    <Container id='changePassword' className='container1' style={{top:'38%'}}>
      <Row >
        <Col md="12" >
          <Form>
            <Row>
              <Col >
                <Form.Group controlId="currentPassword" >
                  <Form.Label> <img src={lock} alt="lock" /> Current Password</Form.Label>
                  <Form.Control type="password" placeholder=""  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="New Password">
                  <Form.Label> <img src={lock} alt="lock" /> New Password</Form.Label>
                  <Form.Control type="password" placeholder=""  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="Confirm Password">
                  <Form.Label> <img src={lock} alt="lock" /> Confirm New Password</Form.Label>
                  <Form.Control type="password" placeholder=""  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>

    <div id='password' style={{color: "#000",fontFamily: "DM Sans", fontSize: "2.2vh", fontStyle: "normal", fontWeight: "700", lineHeight: "normal", position:'absolute', left:'14.8%', top:'57%'}}>
    Pomodoro Timer (Minutes)
    </div>
    <Container id='Pomodoro Timer' className='container1' style={{top:'63%'}}>
      <Row >
        <Col md="12" >
          <Form>
            <Row>
              <Col >
                <Form.Group controlId="Pomodoro" >
                  <Form.Label> <img src={cl} alt="Clock" /> Pomodoro</Form.Label>
                  <Form.Control type="password" placeholder=""  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="New Password">
                  <Form.Label> <img src={cl} alt="Clock" /> Short Break </Form.Label>
                  <Form.Control type="password" placeholder=""  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId="Confirm Password">
                  <Form.Label> <img src={cl} alt="Clock" /> Long Break</Form.Label>
                  <Form.Control type="password" placeholder=""  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>

    <Button type='submit' variant='primary' className='customButton' style={{top: '70%'}}>
        Save
    </Button>


    <div id='sideBar' className='blackSideBar'>
        <div id='text' style={{top:'3%', position: 'relative'}}>Cursh It</div>
        <div id='line' style={{left:'15%',background: '#3E3F42', height:'1px', width:'70%',top:'6%', position: 'relative'}}> </div>
        <img style={{top:'10%', position:'relative', flexShrink: 0}} src={logo} alt='Someone Working!'/>
        <div id='moreText' className='fontStyle3'> It’s time to plan your day!</div>
        <Button type='submit' variant='primary' className='planDayButton' style={{fontFamily:'DM Sans', fontSize:'16px'}}>
          Plan Day
        </Button>

        <Button type='submit' variant='primary' className='logoutButton' style={{fontFamily:'DM Sans', fontSize:'12px'}}>
          <img src={lo} alt='logout'/>Log out
        </Button>
      </div>


      {/* 
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
          </Form.Group> */}

          {/* <Form.Group className="my-2" controlId="pomodoroTime">
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


          <Link to="/"> 
          <Button type="button" variant="secondary" className="mt-3">
            Cancel
          </Button>
          </Link>
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>

          {isLoading && <Loader />}
        </Form>
      </FormContainer> */}

    </div>
    
  );
};

export default ProfileScreen;