import { Avatar, Button, Input } from '@mui/material'
import React, { useState } from 'react'
import './Css/Feed.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../ReduxFeature/UserSlice'
import Modal from 'react-responsive-modal';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';


export const QuoraBox1 = () => {
  const Close = (<CloseIcon />)
  const user= useSelector(selectUser);
  const [isModelopen, setIsModalopen] = useState(false);
  const [question, setQuestion] = useState('');
  const [inputUrl, setInputUrl] = useState('')

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
  return (
    <div className='quoraBox'>
        <div className="quoraBoxInfo">
            <Avatar src={user?.photo} />
        </div>

        <div className="inputBox">
            <input onClick={() => setIsModalopen(true)} type='text' placeholder='What do you want to ask or Share'/>
        </div>
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
            <Avatar src={user?.photo} />
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
  )
}
