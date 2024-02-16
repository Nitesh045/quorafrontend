import React, { useEffect, useState } from 'react'
import { QuoraBox1 } from './QuoraBox1'
import { Post } from './Post'
import axios from 'axios';
import "./Css/Quora.css";
import './Css/Feed.css';

export const Feed = () => {
  const [posts,setposts]=useState([])
  useEffect(()=>{
   axios.get('https://quoranemobackend.onrender.com/question').then((res)=>{
       setposts(res.data.reverse());
     console.log(res.data);
   }).catch((e)=>{
    console.log(e)
   });
   
  },[])
  return (
    <div className='feed-main'>
      <div className='quora-search'><QuoraBox1/></div>
      {
        posts.map((post ,index)=>(<Post key={index} post={post}/>))
      }
      
    </div>

  )
}
