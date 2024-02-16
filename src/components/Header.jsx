import React, { useState } from 'react'
import "./Css/Header.css";
import './Css/Feed.css';
import { Box, Tabs, AppBar, Tab, Toolbar, Typography, Avatar, Button, Input } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import FeaturedPlayList from '@mui/icons-material/FeaturedPlayList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../ReduxFeature/UserSlice';

export const Header = () => {
  const [isHoveringH, setIsHoveringH] = useState(false);
  const [isHoveringF, setIsHoveringF] = useState(false);
  const [isHoveringFo, setIsHoveringFo] = useState(false);
  const [isHoveringN, setIsHoveringN] = useState(false);

  const [isModelopen, setIsModalopen] = useState(false);
  // adding question here
  const [question, setQuestion] = useState('');

const dispatch = useDispatch();

// set user profile......................here
const user=useSelector(selectUser);

  // for option url...............here
  const [inputUrl, setInputUrl] = useState('')


  // for url option end ....................here
  const Close = (<CloseIcon />)
  const handleMouseOverHome = () => {
    setIsHoveringH(true);
  };

  const handleMouseOutHome = () => {
    setIsHoveringH(false);
  };
  const handleMouseOverFeature = () => {
    setIsHoveringF(true);
  };

  const handleMouseOutFeature = () => {
    setIsHoveringF(false);
  };
  const handleMouseOverFollow = () => {
    setIsHoveringFo(true);
  };

  const handleMouseOutFollow = () => {
    setIsHoveringFo(false);
  };
  const handleMouseOverNoti = () => {
    setIsHoveringN(true);
  };

  const handleMouseOutNoti = () => {
    setIsHoveringN(false);
  };

  // set logout..........................hre
  const handleLogout = () => {
    if (window.confirm('Are you sure to logout?')) {
      signOut(auth).then(()=>{
        dispatch(logout())
        console.log('logout')
      }).catch((e)=>console.log('login in logout'))
    }

  }
  // handle submit button question

  const handleSubmitBtn = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user:user,
      }
      await axios.post('https://quoranemobackend.onrender.com/question', body, config).then((res) => {
        console.log(res.data);
        alert('question added suceesfully')
        window.location.href = '/';
      }).catch((e) => {
        console.log(e);
        alert('Error in adding question')
      })
    }
  };
  // static return
  return (
    <div className='quorahedear'>
      <div className="header-content">
        <div className="header-logo">
          <img src='https://up.yimg.com/ib/th?id=OIP._S2IBeqibi4VqVnjfcx3dQHaE8&%3Bpid=Api&rs=1&c=1&qlt=95&w=150&h=100' alt='logo-imge' />
        </div>
        <div onMouseOver={handleMouseOverHome}
          onMouseOut={handleMouseOutHome} className="icon-h" style={{ color: "red" }}>
          <HomeIcon style={{ fontSize: "30px" }} />
          {isHoveringH && <p className='icon-p'>Home</p>}
        </div>
        <div onMouseOver={handleMouseOverFeature}
          onMouseOut={handleMouseOutFeature} className="icon">
          <FeaturedPlayListIcon style={{ fontSize: "30px", color: "gray" }} />
          {isHoveringF && <p className='icon-p'>Write</p>}
        </div>
        <div className="icon " onMouseOver={handleMouseOverFollow}
          onMouseOut={handleMouseOutFollow}>
          <GroupsIcon style={{ fontSize: "30px", color: "gray" }} />
          {isHoveringFo && <p className='icon-p'>Following</p>}
        </div>
        <div onMouseOver={handleMouseOverNoti}
          onMouseOut={handleMouseOutNoti} className="icon">
          <CircleNotificationsIcon style={{ fontSize: "30px", color: "gray" }} />
          {isHoveringN && <p className='icon-p'>Notification</p>}
        </div>
        <div className=" input-header " style={{ marginTop: "10px" }}>
          <SearchIcon style={{ fontSize: "30px", opacity: "0.8", color: "gray" }} />
          <input type='text' placeholder='Search ' />
        </div>
        <div className="avtar-img " >
          <span onClick={handleLogout}> <Avatar src={user?.photo} style={{ marginTop: "10px" }} /></span>

        </div>
        <div className="addQuestion" style={{ marginTop: "10px" }}> <Button style={{ background: "red", color: "white", fontSize: "bold", marginRight: "20px" }} onClick={() => setIsModalopen(true)}>AddQuestion</Button></div>
        <Modal open={isModelopen} closeIcon={Close} onClose={() => setIsModalopen(false)}
          closeOnEsc

          closeOnOverlayClick={false} styles={{
            overlay: {
              height: "600px",
              width: "500px"
            },

          }} classNames='modalClass'>
          <div className="motal-title">
            <h3>Add+</h3>
          </div>
          <div className="modal-info">
            <Avatar />
            <div className="modal-scope">
              <PublicIcon />
              <p>public</p>
              <ExpandMoreIcon />
            </div>
          </div>
          <div className="modal-input">
            <Input type='text' placeholder='add your question' value={question} onChange={(e) => setQuestion(e.target.value)} />
            <div className="input-img">
              {/* for otion url ...........................here */}
              <Input type='text' placeholder='optional include a link' value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
              <div className="img-url">
                {inputUrl !== '' &&
                  <img src={inputUrl} alt='option url' />
                }
              </div>
              {/* for optional input end ...............................here */}
            </div>

          </div>
          <div className="modal-buttons">
            <Button className='add' type='submit' onClick={handleSubmitBtn}>Add Questiin</Button>
            <Button className='cancel' onClick={() => setIsModalopen(false)}> Cancel</Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
