import React from 'react'
import { Header } from './Header'
import { SideBar } from './SideBar'
import { Feed } from './Feed'
import { Widget } from './Widget'
import "./Css/Quora.css"

export const QuoraApp = () => {
  return (
    <div className='quora'>
        <Header/>
        <div className="quora-content">
          <div className="quora-contents">
            <SideBar/>
            <Feed/>
            <Widget className='widget-div-main'/>
          </div>
        </div>

    </div>
  )
}
