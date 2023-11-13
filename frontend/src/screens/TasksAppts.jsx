import {Box, Grid} from '@mui/material/';
import * as React from 'react';
import SideBar from '../components/SideBar';

const TasksAppts = () => {
    return(
<div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
    <div style={{width: 1199, height: 60, left: 220, top: 94, position: 'absolute', background: 'rgba(98, 132, 255, 0.15)', borderRadius: 10}} />
    <div style={{width: 1240, height: 70, left: 200, top: 0, position: 'absolute', background: 'white', boxShadow: '2px 5px 50px rgba(32.23, 43.66, 85, 0.08)'}} />
    <div style={{width: 646, height: 768, left: 220, top: 223, position: 'absolute', background: 'white', boxShadow: '2px 5px 50px rgba(35.83, 36.82, 40.37, 0.10)', borderRadius: 10}} />
    <div style={{width: 538, height: 768, left: 882, top: 223, position: 'absolute', background: 'white', boxShadow: '2px 5px 50px rgba(35.83, 36.82, 40.37, 0.10)', borderRadius: 10}} />
    <div style={{width: 6, height: 767, left: 1427, top: 224, position: 'absolute', background: 'rgba(97.75, 132.34, 255, 0.20)', borderRadius: 10}} />
    <div style={{width: 6, height: 225, left: 1427, top: 224, position: 'absolute', background: '#6284FF', borderRadius: 10}} />
    <div style={{width: 40, height: 40, left: 1306, top: 15, position: 'absolute', background: 'rgba(98, 132, 255, 0.15)', borderRadius: 9999}} />
    <div style={{left: 1356, top: 26, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>John Doe</div>
    <div style={{width: 1065, height: 40, left: 215, top: 15, position: 'absolute', background: '#F5F7F9', borderRadius: 10}} />
    <div style={{width: 18, height: 18, left: 230, top: 26, position: 'absolute'}}>
        <div style={{width: 13.50, height: 13.50, left: 1.50, top: 1.50, position: 'absolute', border: '1.20px #1F1F1F solid'}}></div>
        <div style={{width: 2.38, height: 2.46, left: 14.12, top: 14.04, position: 'absolute', border: '1.20px #1F1F1F solid'}}></div>
        <div style={{width: 18, height: 18, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
    </div>
    <div style={{left: 220, top: 170, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Tasks</div>
    <div style={{left: 882, top: 170, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Appointments</div>
    <div style={{width: 606, height: 300, left: 240, top: 267, position: 'absolute', background: '#F5F7F9', borderRadius: 8}} />
    <div style={{left: 256, top: 283, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Top Priority</div>
    <div style={{width: 574, height: 164, left: 256, top: 321, position: 'absolute', background: 'white', borderRadius: 8}} />
    <div style={{width: 574, height: 48, left: 256, top: 497, position: 'absolute', background: 'white', borderRadius: 8}} />
    <div style={{left: 270, top: 384, position: 'absolute', color: '#1F1F1F', fontSize: 12, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Number of Pomodoro Timers (30 mins each)</div>
    <div style={{left: 270, top: 412, position: 'absolute', color: '#545454', fontSize: 12, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Notes</div>
    <div style={{width: 16, height: 16, left: 764, top: 337, position: 'absolute', background: '#292D32'}}></div>
    <div style={{width: 16, height: 16, left: 764, top: 513, position: 'absolute', background: '#292D32'}}></div>
    <div style={{width: 22, height: 22, left: 270, top: 334, position: 'absolute'}}>
        <div style={{width: 18.33, height: 18.33, left: 1.83, top: 1.83, position: 'absolute', border: '1.50px #292D32 solid'}}></div>
        <div style={{width: 7.79, height: 5.19, left: 7.10, top: 8.41, position: 'absolute', border: '1.50px #292D32 solid'}}></div>
        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
    </div>
    <div style={{left: 299, top: 335, position: 'absolute', color: '#6284FF', fontSize: 16, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Complete Math Homework</div>
    <div style={{left: 299, top: 511, position: 'absolute', color: '#6284FF', fontSize: 16, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Assign Leader for Task 1</div>
    <div style={{left: 766, top: 381, position: 'absolute', color: '#FE754D', fontSize: 16, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>2</div>
    <div style={{width: 542, height: 0, left: 272, top: 371, position: 'absolute', border: '1px #E2EAF1 solid'}}></div>
    <div style={{width: 20, height: 20, left: 796, top: 335, position: 'absolute'}}>
        <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 5.88, height: 2.93, left: 7.06, top: 8.95, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 20, height: 20, left: 20, top: 20, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 20, height: 20, left: 796, top: 511, position: 'absolute'}}>
        <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 5.88, height: 2.93, left: 7.06, top: 8.95, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 20, height: 20, left: 20, top: 20, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 16, height: 16, left: 796, top: 384, position: 'absolute'}}>
        <div style={{width: 10.66, height: 11.07, left: 2.66, top: 1.44, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
        <div style={{width: 3.63, height: 3.43, left: 7.93, top: 3.37, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
        <div style={{width: 12, height: 0, left: 2, top: 14.67, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
        <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
    </div>
    <div style={{width: 16, height: 16, left: 796, top: 412, position: 'absolute'}}>
        <div style={{width: 10.66, height: 11.07, left: 2.66, top: 1.44, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
        <div style={{width: 3.63, height: 3.43, left: 7.93, top: 3.37, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
        <div style={{width: 12, height: 0, left: 2, top: 14.67, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
        <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
    </div>
    <div style={{width: 606, height: 232, left: 240, top: 587, position: 'absolute', background: '#F5F7F9', borderRadius: 8}} />
    <div style={{width: 606, height: 124, left: 240, top: 839, position: 'absolute', background: '#F5F7F9', borderRadius: 8}} />
    <div style={{left: 256, top: 603, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Important</div>
    <div style={{left: 256, top: 855, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Other</div>
    <div style={{width: 574, height: 96, left: 256, top: 641, position: 'absolute', background: 'white', borderRadius: 8}} />
    <div style={{width: 574, height: 48, left: 256, top: 749, position: 'absolute', background: 'white', borderRadius: 12}} />
    <div style={{left: 270, top: 704, position: 'absolute', color: '#1F1F1F', fontSize: 12, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Number of Pomodoro Timers (30 mins each)</div>
    <div style={{width: 16, height: 16, left: 764, top: 657, position: 'absolute', background: '#292D32'}}></div>
    <div style={{width: 16, height: 16, left: 764, top: 765, position: 'absolute', background: '#292D32'}}></div>
    <div style={{width: 22, height: 22, left: 270, top: 654, position: 'absolute'}}>
        <div style={{width: 18.33, height: 18.33, left: 1.83, top: 1.83, position: 'absolute', border: '1.50px #292D32 solid'}}></div>
        <div style={{width: 7.79, height: 5.19, left: 7.10, top: 8.41, position: 'absolute', border: '1.50px #292D32 solid'}}></div>
        <div style={{width: 22, height: 22, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
    </div>
    <div style={{left: 299, top: 655, position: 'absolute', color: '#6284FF', fontSize: 16, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Complete Math Homework</div>
    <div style={{left: 299, top: 763, position: 'absolute', color: '#6284FF', fontSize: 16, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Assign Leader for Task 1</div>
    <div style={{left: 750, top: 701, position: 'absolute', color: '#FE754D', fontSize: 16, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>2</div>
    <div style={{width: 542, height: 0, left: 272, top: 691, position: 'absolute', border: '1px #E2EAF1 solid'}}></div>
    <div style={{width: 20, height: 20, left: 796, top: 655, position: 'absolute'}}>
        <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 5.88, height: 2.93, left: 7.06, top: 8.95, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 20, height: 20, left: 20, top: 20, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 20, height: 20, left: 796, top: 763, position: 'absolute'}}>
        <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 5.88, height: 2.93, left: 7.06, top: 8.95, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 20, height: 20, left: 20, top: 20, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 19.50, height: 13, left: 270, top: 766, position: 'absolute'}}>
        <div style={{width: 13, height: 8.13, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
        <div style={{width: 13, height: 8.13, left: 6.50, top: 4.88, position: 'absolute', background: 'black'}}></div>
    </div>
    <div style={{width: 20, height: 20, left: 270, top: 511, position: 'absolute'}}>
        <div style={{width: 7.92, height: 11.25, left: 6.04, top: 4.37, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 10.69, height: 15.53, left: 8.27, top: 3.43, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 10.68, height: 15.53, left: 1.05, top: 1.04, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 3.88, height: 3.59, left: 1.45, top: 13.42, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 3.88, height: 3.58, left: 14.67, top: 2.99, position: 'absolute', background: '#292D32'}}></div>
    </div>
    <div style={{width: 20, height: 20, left: 798, top: 702, position: 'absolute', background: '#6284FF', borderRadius: 6, border: '0.50px #E2EAF1 solid'}} />
    <div style={{width: 10, height: 8, left: 803, top: 708, position: 'absolute', background: 'white'}}></div>
    <div style={{width: 20, height: 20, left: 724, top: 702, position: 'absolute'}}>
        <div style={{width: 6.67, height: 0, left: 6.67, top: 10, position: 'absolute', border: '1.20px #9FA3A8 solid'}}></div>
        <div style={{width: 0, height: 6.67, left: 10, top: 6.67, position: 'absolute', border: '1.20px #9FA3A8 solid'}}></div>
        <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.20px #9FA3A8 solid'}}></div>
        <div style={{width: 20, height: 20, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
    </div>
    <div style={{width: 20, height: 20, left: 766, top: 702, position: 'absolute'}}>
        <div style={{width: 6.67, height: 0, left: 6.67, top: 10, position: 'absolute', border: '1.20px #9FA3A8 solid'}}></div>
        <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.20px #9FA3A8 solid'}}></div>
        <div style={{width: 20, height: 20, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
    </div>
    <div style={{width: 574, height: 48, left: 256, top: 893, position: 'absolute', background: 'white', borderRadius: 8}} />
    <div style={{width: 16, height: 16, left: 764, top: 909, position: 'absolute', background: '#292D32'}}></div>
    <div style={{left: 299, top: 907, position: 'absolute', color: '#6284FF', fontSize: 16, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Complete Math Homework</div>
    <div style={{width: 20, height: 20, left: 796, top: 907, position: 'absolute'}}>
        <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 5.88, height: 2.93, left: 7.06, top: 8.95, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 20, height: 20, left: 20, top: 20, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 20, height: 20, left: 270, top: 907, position: 'absolute'}}>
        <div style={{width: 7.92, height: 11.25, left: 6.04, top: 4.37, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 10.69, height: 15.53, left: 8.27, top: 3.43, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 10.68, height: 15.53, left: 1.05, top: 1.04, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 3.88, height: 3.59, left: 1.45, top: 13.42, position: 'absolute', background: '#292D32'}}></div>
        <div style={{width: 3.88, height: 3.58, left: 14.67, top: 2.99, position: 'absolute', background: '#292D32'}}></div>
    </div>
    <div style={{left: 902, top: 279, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>5 AM</div>
    <div style={{left: 902, top: 324, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>6 AM</div>
    <div style={{left: 902, top: 414, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>8 AM</div>
    <div style={{left: 902, top: 459, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>9 AM</div>
    <div style={{left: 902, top: 504, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>10 AM</div>
    <div style={{left: 902, top: 549, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>11 AM</div>
    <div style={{left: 902, top: 594, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>12 PM</div>
    <div style={{left: 902, top: 639, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>1 PM</div>
    <div style={{left: 902, top: 684, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>2 PM</div>
    <div style={{left: 902, top: 729, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>3 PM</div>
    <div style={{left: 902, top: 774, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>4 PM</div>
    <div style={{left: 902, top: 819, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>5 PM</div>
    <div style={{left: 902, top: 909, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>7 PM</div>
    <div style={{left: 902, top: 864, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>6 PM</div>
    <div style={{left: 902, top: 954, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word'}}>8 PM</div>
    <div style={{width: 50, height: 26, left: 894, top: 365, position: 'absolute', background: 'white', borderRadius: 6, border: '1px #6284FF solid'}} />
    <div style={{left: 902, top: 369, position: 'absolute', color: '#6284FF', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>7 AM</div>
    <div style={{width: 446, height: 44, left: 954, top: 376, position: 'absolute', background: 'white', border: '1px #E2EAF1 solid'}} />
    <div style={{width: 446, height: 44, left: 954, top: 512, position: 'absolute', background: 'white', border: '1px #E2EAF1 solid'}} />
    <div style={{width: 446, height: 44, left: 954, top: 645, position: 'absolute', background: 'white', border: '1px #E2EAF1 solid'}} />
    <div style={{width: 446, height: 44, left: 954, top: 783, position: 'absolute', background: 'white', border: '1px #E2EAF1 solid'}} />
    <div style={{width: 446, height: 45, left: 954, top: 331, position: 'absolute', background: 'rgba(97.75, 132.34, 255, 0.08)', border: '1px #6284FF solid'}} />
    <div style={{width: 446, height: 45, left: 954, top: 420, position: 'absolute', background: 'white', border: '1px #6284FF solid'}} />
    <div style={{width: 446, height: 45, left: 954, top: 556, position: 'absolute', background: 'white', border: '1px #6284FF solid'}} />
    <div style={{width: 446, height: 45, left: 954, top: 689, position: 'absolute', background: 'white', border: '1px #6284FF solid'}} />
    <div style={{width: 446, height: 45, left: 954, top: 827, position: 'absolute', background: 'white', border: '1px #6284FF solid'}} />
    <div style={{left: 967, top: 392, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Meeting with Counselor</div>
    <div style={{left: 967, top: 528, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Meeting with Teammates</div>
    <div style={{left: 967, top: 661, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Meeting with Counselor</div>
    <div style={{left: 967, top: 799, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Meeting with Counselor</div>
    <div style={{left: 1062, top: 345, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Assign Leader for Task 1</div>
    <div style={{left: 1062, top: 434, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Assign Leader for Task 1</div>
    <div style={{left: 1062, top: 570, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Finish Math Quiz</div>
    <div style={{left: 1062, top: 703, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Finish Math Quiz</div>
    <div style={{left: 1062, top: 841, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Finish Math Quiz</div>
    <div style={{left: 967, top: 345, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Focus Time</div>
    <div style={{left: 967, top: 434, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Focus Time</div>
    <div style={{left: 967, top: 570, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Focus Time</div>
    <div style={{left: 967, top: 703, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Focus Time</div>
    <div style={{left: 967, top: 841, position: 'absolute', color: '#1F1F1F', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Focus Time</div>
    <div style={{width: 6, height: 6, left: 1052, top: 352, position: 'absolute', background: '#6284FF', borderRadius: 9999}} />
    <div style={{width: 6, height: 6, left: 1052, top: 440, position: 'absolute', background: '#6284FF', borderRadius: 9999}} />
    <div style={{width: 6, height: 6, left: 1052, top: 576, position: 'absolute', background: '#6284FF', borderRadius: 9999}} />
    <div style={{width: 6, height: 6, left: 1052, top: 709, position: 'absolute', background: '#6284FF', borderRadius: 9999}} />
    <div style={{width: 6, height: 6, left: 1052, top: 847, position: 'absolute', background: '#6284FF', borderRadius: 9999}} />
    <div style={{width: 18, height: 18, left: 1374, top: 345, position: 'absolute'}}>
        <div style={{width: 15, height: 15, left: 1.50, top: 1.50, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 2.64, height: 5.29, left: 8.05, top: 6.35, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 18, height: 18, left: 18, top: 18, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 18, height: 18, left: 1374, top: 434, position: 'absolute'}}>
        <div style={{width: 15, height: 15, left: 1.50, top: 1.50, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 2.64, height: 5.29, left: 8.05, top: 6.35, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 18, height: 18, left: 18, top: 18, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 18, height: 18, left: 1374, top: 570, position: 'absolute'}}>
        <div style={{width: 15, height: 15, left: 1.50, top: 1.50, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 2.64, height: 5.29, left: 8.05, top: 6.35, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 18, height: 18, left: 18, top: 18, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 18, height: 18, left: 1374, top: 703, position: 'absolute'}}>
        <div style={{width: 15, height: 15, left: 1.50, top: 1.50, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 2.64, height: 5.29, left: 8.05, top: 6.35, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 18, height: 18, left: 18, top: 18, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{width: 18, height: 18, left: 1374, top: 841, position: 'absolute'}}>
        <div style={{width: 15, height: 15, left: 1.50, top: 1.50, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 2.64, height: 5.29, left: 8.05, top: 6.35, position: 'absolute', border: '1.20px #292D32 solid'}}></div>
        <div style={{width: 18, height: 18, left: 18, top: 18, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
    </div>
    <div style={{left: 1268, top: 345, position: 'absolute'}}>
        <div style={{left: 20, top: 0, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>0/2</div>
        <div style={{width: 16, height: 16, left: 0, top: 1, position: 'absolute'}}>
            <div style={{width: 8.68, height: 13.33, left: 3.66, top: 1.33, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
            <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
        </div>
    </div>
    <div style={{left: 1318, top: 570, position: 'absolute'}}>
        <div style={{left: 20, top: 0, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>0/2</div>
        <div style={{width: 16, height: 16, left: 0, top: 1, position: 'absolute'}}>
            <div style={{width: 8.68, height: 13.33, left: 3.66, top: 1.33, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
            <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
        </div>
    </div>
    <div style={{left: 1318, top: 703, position: 'absolute'}}>
        <div style={{left: 20, top: 0, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>0/2</div>
        <div style={{width: 16, height: 16, left: 0, top: 1, position: 'absolute'}}>
            <div style={{width: 8.68, height: 13.33, left: 3.66, top: 1.33, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
            <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
        </div>
    </div>
    <div style={{left: 1318, top: 841, position: 'absolute'}}>
        <div style={{left: 20, top: 0, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>0/2</div>
        <div style={{width: 16, height: 16, left: 0, top: 1, position: 'absolute'}}>
            <div style={{width: 8.68, height: 13.33, left: 3.66, top: 1.33, position: 'absolute', border: '1.20px #6284FF solid'}}></div>
            <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
        </div>
    </div>
    <div style={{width: 50, height: 26, left: 1319, top: 340, position: 'absolute'}}>
        <div style={{width: 50, height: 26, left: 0, top: 0, position: 'absolute', background: 'rgba(97.75, 132.34, 255, 0.10)', borderRadius: 8}} />
        <div style={{left: 11, top: 5, position: 'absolute', color: '#6284FF', fontSize: 12, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>19:07</div>
    </div>
    <div style={{width: 200, height: 1024, left: 0, top: 0, position: 'absolute', background: '#252628', boxShadow: '2px 5px 50px rgba(32.23, 43.66, 85, 0.08)'}} />
    <div style={{width: 148, height: 148, left: 26, top: 168, position: 'absolute'}}>
        <div style={{width: 148, height: 0.07, left: -0, top: 113.19, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
        <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 60.54, height: 83.72, left: 11.31, top: 16.27, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 60.54, height: 83.72, left: 75.33, top: 16.27, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 9.34, height: 0.07, left: 123.83, top: 116.01, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 9.89, height: 0.07, left: 89.37, top: 115.21, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 18.48, height: 0.07, left: 117.39, top: 118.76, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 5.69, height: 0.07, left: 15.53, top: 118.26, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.97, height: 0.07, left: 23.86, top: 118.26, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 16.15, height: 0.07, left: 56.12, top: 117.01, position: 'absolute', background: 'rgba(235, 235, 235, 0.51)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 35.52, height: 79.22, left: 102.62, top: 26.44, position: 'absolute', background: 'rgba(230, 230, 230, 0.38)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 11.79, height: 11.36, left: 112.67, top: 101.83, position: 'absolute', background: 'rgba(230, 230, 230, 0.38)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 12.90, height: 5.49, left: 112.12, top: 99.99, position: 'absolute', background: 'rgba(245, 245, 245, 0.17)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 11.20, height: 21.11, left: 43.86, top: 90.12, position: 'absolute', background: 'rgba(240, 240, 240, 0.44)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 55.23, height: 1.96, left: 46.01, top: 111.23, position: 'absolute', background: 'rgba(240, 240, 240, 0.44)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 48.33, height: 21.11, left: 55.06, top: 90.12, position: 'absolute', background: 'rgba(250, 250, 250, 0.47)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 39.52, height: 6.50, left: 59.46, top: 92.69, position: 'absolute', background: 'rgba(240, 240, 240, 0.44)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 39.52, height: 6.50, left: 59.46, top: 101.03, position: 'absolute', background: 'rgba(240, 240, 240, 0.44)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 11.06, height: 1.39, left: 73.69, top: 91.88, position: 'absolute', background: 'rgba(250, 250, 250, 0.47)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 11.06, height: 1.39, left: 73.69, top: 100.23, position: 'absolute', background: 'rgba(250, 250, 250, 0.47)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 49.82, height: 1.89, left: 55.06, top: 88.23, position: 'absolute', background: 'rgba(240, 240, 240, 0.44)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 12.76, height: 1.89, left: 42.29, top: 88.23, position: 'absolute', background: 'rgba(230, 230, 230, 0.38)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 15.77, height: 34.49, left: 19.84, top: 74.83, position: 'absolute', background: 'rgba(240, 240, 240, 0.44)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 19.83, height: 43.97, left: 11.16, top: 62.62, position: 'absolute', background: 'rgba(230, 230, 230, 0.38)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 10.46, height: 10.08, left: 18.90, top: 103.11, position: 'absolute', background: 'rgba(230, 230, 230, 0.38)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 11.44, height: 4.87, left: 18.41, top: 101.48, position: 'absolute', background: 'rgba(245, 245, 245, 0.17)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 63.06, height: 35.66, left: 17.82, top: 23.64, position: 'absolute', background: 'rgba(230, 230, 230, 0.38)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 64.70, height: 35.66, left: 18.15, top: 23.64, position: 'absolute', background: 'rgba(245, 245, 245, 0.17)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 61.55, height: 32.51, left: 19.72, top: 25.21, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
            </div>
        </div>
        <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 114.78, height: 6.70, left: 16.61, top: 119.85, position: 'absolute', background: 'rgba(245, 245, 245, 0.17)'}}></div>
        </div>
        <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 11.43, height: 2.77, left: 111.86, top: 89.70, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 2.91, height: 0.30, left: 107.55, top: 92.18, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 94.74, height: 58.61, left: 32.59, top: 32.83, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 91.20, height: 50.81, left: 33.42, top: 39.54, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.77, height: 8.73, left: 42.52, top: 28.46, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.77, height: 8.73, left: 60.08, top: 28.46, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.77, height: 8.73, left: 77.65, top: 28.46, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.77, height: 8.73, left: 95.22, top: 28.46, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.77, height: 8.73, left: 112.79, top: 28.46, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 84.41, height: 46.08, left: 36.77, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 80.41, height: 0.30, left: 37.57, top: 78.78, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 80.41, height: 0.30, left: 38.37, top: 69.62, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 80.41, height: 0.30, left: 39.16, top: 60.46, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 80.41, height: 0.30, left: 39.96, top: 51.31, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.29, height: 46.08, left: 106.87, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.29, height: 46.08, left: 96.86, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.29, height: 46.08, left: 86.84, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.29, height: 46.08, left: 76.83, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.29, height: 46.08, left: 66.81, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.29, height: 46.08, left: 56.80, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.29, height: 46.08, left: 46.78, top: 42.15, position: 'absolute', background: 'rgba(224, 224, 224, 0.48)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.49, height: 7.32, left: 80.53, top: 52.37, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.49, height: 7.32, left: 80.53, top: 52.37, position: 'absolute'}}>
                    <div style={{width: 8.49, height: 7.32, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 8.49, height: 7.32, left: -0, top: 0, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 7.07, height: 7.32, left: 123.77, top: 52.37, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 7.50, height: 7.62, left: 123.61, top: 52.22, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.49, height: 7.32, left: 99.70, top: 61.53, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.49, height: 7.32, left: 99.70, top: 61.53, position: 'absolute'}}>
                    <div style={{width: 8.49, height: 7.32, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 8.49, height: 7.32, left: -0, top: 0, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 18.62, height: 7.33, left: 101.30, top: 43.22, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 19.72, height: 14, left: 45.99, top: 44.46, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 5.43, height: 3.73, left: 101.44, top: 63.49, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 6.67, height: 6.65, left: 89.06, top: 80.18, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 6.67, height: 6.65, left: 60.60, top: 61.83, position: 'absolute', background: '#407BFF'}}></div>
            </div>
        </div>
        <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 35.21, height: 4.44, left: 36.63, top: 72, position: 'absolute'}}>
                    <div style={{width: 35.21, height: 4.44, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 35.21, height: 4.44, left: 0, top: -0, position: 'absolute', background: 'black'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 2.19, height: 2.39, left: 27.49, top: 69.38, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 2.21, height: 2.98, left: 28.14, top: 69.88, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 44.52, height: 7.58, left: 29.03, top: 68.12, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 10.82, height: 13.09, left: 39.96, top: 57.01, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 7.11, height: 15.30, left: 25.78, top: 55.26, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 0.40, height: 0.55, left: 40.70, top: 48.43, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 0.74, height: 1.59, left: 40.18, top: 48.93, position: 'absolute', background: '#FF5652'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 0.92, height: 0.37, left: 40.46, top: 47.40, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.70, height: 6.35, left: 34.36, top: 48.93, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 5.38, height: 3.59, left: 33.42, top: 52.27, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 1.05, height: 0.45, left: 23.65, top: 119.89, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 0.75, height: 0.78, left: 23.65, top: 119.36, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 1.23, height: 0.47, left: 38.68, top: 120.74, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 0.71, height: 0.88, left: 38.68, top: 120.27, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 1.97, height: 4.51, left: 36.59, top: 116.59, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 3.36, height: 4.89, left: 21.49, top: 115.25, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 5.69, height: 3.29, left: 20.54, top: 119.29, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 6.42, height: 2.22, left: 35.90, top: 120.88, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 6.76, height: 7.84, left: 27.61, top: 53.18, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 6.76, height: 7.84, left: 27.61, top: 53.18, position: 'absolute'}}>
                    <div style={{width: 6.76, height: 7.84, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 6.76, height: 7.84, left: -0, top: 0, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 2.22, height: 4.48, left: 30.81, top: 56.54, position: 'absolute'}}>
                    <div style={{width: 2.22, height: 4.48, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 2.22, height: 4.48, left: -0, top: -0, position: 'absolute', background: 'black'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 12.49, height: 18.50, left: 29.38, top: 53.19, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 12.49, height: 18.50, left: 29.38, top: 53.19, position: 'absolute'}}>
                    <div style={{width: 12.49, height: 18.50, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 12.49, height: 18.50, left: 0, top: 0, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 1.74, height: 4.24, left: 40.01, top: 59.37, position: 'absolute'}}>
                    <div style={{width: 1.74, height: 4.24, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 1.74, height: 4.24, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 6.61, height: 8.45, left: 38.99, top: 54.80, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 6.61, height: 8.45, left: 38.99, top: 54.80, position: 'absolute'}}>
                    <div style={{width: 6.61, height: 8.45, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 6.61, height: 8.45, left: -0, top: -0, position: 'absolute', background: 'rgba(255, 255, 255, 0.52)'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 1.96, height: 2.33, left: 36.60, top: 116.59, position: 'absolute'}}>
                    <div style={{width: 1.96, height: 2.33, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 1.96, height: 2.33, left: -0, top: 0, position: 'absolute', background: 'black'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 2.62, height: 2.72, left: 22.23, top: 115.25, position: 'absolute'}}>
                    <div style={{width: 2.62, height: 2.72, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 2.62, height: 2.72, left: -0, top: 0, position: 'absolute', background: 'black'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 5.80, height: 7.63, left: 35.32, top: 44.46, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 8.14, height: 8.55, left: 34.27, top: 42.69, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 1.22, height: 2.20, left: 38.21, top: 47.52, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 14.43, height: 47.61, left: 21.60, top: 70.16, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.53, height: 2.16, left: 21.35, top: 115.72, position: 'absolute', background: '#407BFF'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 2.19, height: 14.16, left: 33.18, top: 77.09, position: 'absolute'}}>
                    <div style={{width: 2.19, height: 14.16, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                    <div style={{width: 2.19, height: 14.16, left: -0, top: 0, position: 'absolute', background: 'black'}}></div>
                </div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 7.71, height: 47.79, left: 32.91, top: 70.68, position: 'absolute', background: '#263238'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 3.16, height: 2.10, left: 49.70, top: 68.75, position: 'absolute', background: '#FF8B7B'}}></div>
            </div>
            <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}>
                <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute', background: 'black'}}></div>
                <div style={{width: 4.31, height: 1.37, left: 35.53, top: 117.16, position: 'absolute', background: '#407BFF'}}></div>
            </div>
        </div>
        <div style={{width: 148, height: 148, left: 0, top: 0, position: 'absolute'}}></div>
    </div>
    <div style={{width: 144, left: 28, top: 327, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>It’s time to plan your day!</div>
    <div style={{width: 144, left: 28, top: 44, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 30, fontFamily: 'Fredoka One', fontWeight: '400', wordWrap: 'break-word'}}>Crush It</div>
    <div style={{width: 158, height: 54, left: 21, top: 407, position: 'absolute'}}>
        <div style={{width: 158, height: 54, left: 0, top: 0, position: 'absolute', borderRadius: 14, border: '1px white solid'}} />
        <div style={{left: 42, top: 16, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 18, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>Plan Day</div>
    </div>
    <div style={{width: 160, height: 0, left: 20, top: 121, position: 'absolute', border: '1px #3E3F42 solid'}}></div>
    <div style={{width: 24, height: 24, left: 1314, top: 23, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 24, height: 24, position: 'relative'}}>
            <div style={{width: 10, height: 10, left: 7, top: 2, position: 'absolute', border: '1.50px #6284FF solid'}}></div>
            <div style={{width: 17.18, height: 7, left: 3.41, top: 15, position: 'absolute', border: '1.50px #6284FF solid'}}></div>
            <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
        </div>
    </div>
    <div style={{width: 45, height: 45, left: 700, top: 101, position: 'absolute'}}>
        <div style={{width: 45, height: 45, left: 0, top: 0, position: 'absolute', boxShadow: '0px 4px 80px rgba(98, 132, 255, 0.20)', borderRadius: 10, border: '1px #6284FF solid'}} />
        <div style={{width: 22, height: 22, left: 33.50, top: 34, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0'}}>
            <div style={{width: 18.33, height: 18.33, left: -1.83, top: -1.83, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', background: '#6284FF', border: '1.50px #6284FF solid'}}></div>
            <div style={{width: 3.23, height: 6.47, left: -8.93, top: -7.76, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', border: '1.50px white solid'}}></div>
            <div style={{width: 22, height: 22, left: -22, top: -22, position: 'absolute', opacity: 0}}></div>
        </div>
    </div>
    <div style={{width: 45, height: 45, left: 493, top: 101, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0'}}>
        <div style={{width: 45, height: 45, left: 0, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', boxShadow: '0px 4px 80px rgba(98, 132, 255, 0.20)', borderRadius: 10, border: '1px #6284FF solid'}} />
        <div style={{width: 22, height: 22, left: -33.50, top: 34, position: 'absolute'}}>
            <div style={{width: 18.33, height: 18.33, left: 1.83, top: -1.83, position: 'absolute', background: '#6284FF', border: '1.50px #6284FF solid'}}></div>
            <div style={{width: 3.23, height: 6.47, left: 8.93, top: -7.76, position: 'absolute', border: '1.50px white solid'}}></div>
            <div style={{width: 22, height: 22, left: 22, top: -22, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', opacity: 0}}></div>
        </div>
    </div>
    <div style={{width: 196, height: 45, left: 765, top: 101, position: 'absolute'}}>
        <div style={{width: 98, height: 45, left: 49, top: 0, position: 'absolute'}}>
            <div style={{left: 19, top: 8, position: 'absolute', textAlign: 'center', color: '#1F1F1F', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>21</div>
            <div style={{width: 20, height: 20, left: 67, top: 33, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0'}}>
                <div style={{width: 16.67, height: 16.67, left: 1.67, top: -1.67, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 2.93, height: 5.88, left: 7.06, top: -8.12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 20, height: 20, left: 20, top: -20, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', opacity: 0}}></div>
            </div>
            <div style={{width: 98, height: 45, left: 0, top: 0, position: 'absolute', borderRadius: 10, border: '1px #6284FF solid'}} />
        </div>
        <div style={{width: 45, height: 45, left: 151, top: 0, position: 'absolute'}}>
            <div style={{width: 45, height: 45, left: 0, top: 0, position: 'absolute', boxShadow: '0px 4px 80px rgba(98, 132, 255, 0.20)', borderRadius: 10, border: '1px #6284FF solid'}} />
            <div style={{width: 22, height: 22, left: 33.50, top: 34, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0'}}>
                <div style={{width: 18.33, height: 18.33, left: -1.83, top: -1.83, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', background: '#6284FF', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 3.23, height: 6.47, left: -8.93, top: -7.76, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', border: '1.50px white solid'}}></div>
                <div style={{width: 22, height: 22, left: -22, top: -22, position: 'absolute', opacity: 0}}></div>
            </div>
        </div>
        <div style={{width: 45, height: 45, left: 45, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0'}}>
            <div style={{width: 45, height: 45, left: 0, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', boxShadow: '0px 4px 80px rgba(98, 132, 255, 0.20)', borderRadius: 10, border: '1px #6284FF solid'}} />
            <div style={{width: 22, height: 22, left: -33.50, top: 34, position: 'absolute'}}>
                <div style={{width: 18.33, height: 18.33, left: 1.83, top: -1.83, position: 'absolute', background: '#6284FF', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 3.23, height: 6.47, left: 8.93, top: -7.76, position: 'absolute', border: '1.50px white solid'}}></div>
                <div style={{width: 22, height: 22, left: 22, top: -22, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', opacity: 0}}></div>
            </div>
        </div>
    </div>
    <div style={{width: 211, height: 45, left: 981, top: 101, position: 'absolute'}}>
        <div style={{width: 113, height: 45, left: 49, top: 0, position: 'absolute'}}>
            <div style={{left: 13, top: 8, position: 'absolute', textAlign: 'center', color: '#1F1F1F', fontSize: 22, fontFamily: 'DM Sans', fontWeight: '700', wordWrap: 'break-word'}}>2023</div>
            <div style={{width: 20, height: 20, left: 86, top: 33, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0'}}>
                <div style={{width: 16.67, height: 16.67, left: 1.67, top: -1.67, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 2.93, height: 5.88, left: 7.06, top: -8.12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 20, height: 20, left: 20, top: -20, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', opacity: 0}}></div>
            </div>
            <div style={{width: 113, height: 45, left: 0, top: 0, position: 'absolute', borderRadius: 10, border: '1px #6284FF solid'}} />
        </div>
        <div style={{width: 45, height: 45, left: 166, top: 0, position: 'absolute'}}>
            <div style={{width: 45, height: 45, left: 0, top: 0, position: 'absolute', boxShadow: '0px 4px 80px rgba(98, 132, 255, 0.20)', borderRadius: 10, border: '1px #6284FF solid'}} />
            <div style={{width: 22, height: 22, left: 33.50, top: 34, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0'}}>
                <div style={{width: 18.33, height: 18.33, left: -1.83, top: -1.83, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', background: '#6284FF', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 3.23, height: 6.47, left: -8.93, top: -7.76, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', border: '1.50px white solid'}}></div>
                <div style={{width: 22, height: 22, left: -22, top: -22, position: 'absolute', opacity: 0}}></div>
            </div>
        </div>
        <div style={{width: 45, height: 45, left: 45, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0'}}>
            <div style={{width: 45, height: 45, left: 0, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', boxShadow: '0px 4px 80px rgba(98, 132, 255, 0.20)', borderRadius: 10, border: '1px #6284FF solid'}} />
            <div style={{width: 22, height: 22, left: -33.50, top: 34, position: 'absolute'}}>
                <div style={{width: 18.33, height: 18.33, left: 1.83, top: -1.83, position: 'absolute', background: '#6284FF', border: '1.50px #6284FF solid'}}></div>
                <div style={{width: 3.23, height: 6.47, left: 8.93, top: -7.76, position: 'absolute', border: '1.50px white solid'}}></div>
                <div style={{width: 22, height: 22, left: 22, top: -22, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', opacity: 0}}></div>
            </div>
        </div>
    </div>
    <div style={{width: 199, height: 239, left: 497, top: 101, position: 'absolute'}}>
        <div style={{width: 199, height: 239, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 10, border: '1px #6284FF solid'}} />
        <div style={{width: 4, height: 177, left: 188, top: 50, position: 'absolute'}}>
            <div style={{width: 4, height: 177, left: 0, top: 0, position: 'absolute', background: 'rgba(97.75, 132.34, 255, 0.20)', borderRadius: 10}} />
            <div style={{width: 4, height: 52, left: 0, top: 0, position: 'absolute', background: '#6284FF', borderRadius: 10}} />
        </div>

        <div style={{width: 20, height: 20, left: 166, top: 13, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0'}}>
            <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1.50px #6284FF solid'}}></div>
            <div style={{width: 2.93, height: 5.88, left: 7.06, top: 8.12, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1.50px #6284FF solid'}}></div>
            <div style={{width: 20, height: 20, left: 20, top: 20, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', opacity: 0}}></div>
        </div>
    </div>
    <div style={{width: 101, height: 38, left: 50, top: 928, position: 'absolute'}}>
        <div style={{width: 101, height: 38, left: 0, top: 0, position: 'absolute', boxShadow: '0px 4px 80px rgba(98, 132, 255, 0.20)', borderRadius: 10, border: '1px white solid'}} />
        <div style={{left: 43, top: 11, position: 'absolute', color: 'white', fontSize: 12, fontFamily: 'DM Sans', fontWeight: '500', wordWrap: 'break-word'}}>Log Out</div>
        <div style={{width: 24, height: 24, left: 11, top: 7, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{width: 24, height: 24, position: 'relative'}}>
                <div style={{width: 2.56, height: 5.12, left: 17.44, top: 9.50, position: 'absolute', border: '1.50px white solid'}}></div>
                <div style={{width: 10.17, height: 0, left: 9.76, top: 12.06, position: 'absolute', border: '1.50px white solid'}}></div>
                <div style={{width: 8, height: 16, left: 3.76, top: 4, position: 'absolute', border: '1.50px white solid'}}></div>
                <div style={{width: 24, height: 24, left: 24, top: 24, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', opacity: 0}}></div>
            </div>
        </div>
    </div>
    <div style={{width: 39, height: 39, left: 313, top: 170, position: 'absolute'}}>
        <div style={{width: 39, height: 39, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(180deg, #5D8EFF 0%, #3E6FE1 100%)', borderRadius: 9999}} />
        <div style={{width: 26, height: 26, left: 6.50, top: 6.50, position: 'absolute'}}>
            <div style={{width: 13, height: 0, left: 6.50, top: 13, position: 'absolute', border: '3px white solid'}}></div>
            <div style={{width: 0, height: 13, left: 13, top: 6.50, position: 'absolute', border: '3px white solid'}}></div>
            <div style={{width: 26, height: 26, left: 0, top: 0, position: 'absolute', opacity: 0}}></div>
        </div>
    </div>
</div>


    )
}
export default TasksAppts