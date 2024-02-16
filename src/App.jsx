import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QuoraApp } from './components/QuoraApp'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from './ReduxFeature/UserSlice'
import { Login } from './components/Auth/Login'
import { auth } from './Firebase'
import { onAuthStateChanged } from 'firebase/auth'


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          userName: authUser.displayName,
          photo: authUser.photoURL,
          email: authUser.email,
          uid: authUser.uid
        }))
        console.log("appp.js", authUser)
      }
    })
  },[dispatch])

  return (
    <>
      {user ? (<QuoraApp />) : (<Login />)}

    </>
  )
}

export default App
