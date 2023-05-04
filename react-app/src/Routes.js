import React from 'react'
import { RequireAuth } from 'react-auth-kit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import List from './components/list/List'
import User from './components/user/User'
import UserSmallCard from './components/user/UserSmallCard'
import UserSettings from './components/user/UserSettings'

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
                <Route path='/test' element={<UserSettings/>}/>
                <Route path={'/login' } element={<Login/>}/>               
                <Route path={'/user'} element={
                  <RequireAuth loginPath={'/'}>
                    <User/>
                  </RequireAuth>
                }/>
                <Route path={'/user/settings'} element={
                  <RequireAuth loginPath={'/'}>
                    <UserSettings/>
                  </RequireAuth>
                }/>
                <Route path={'/list/:listid'} element={
                  <RequireAuth loginPath={'/'}>
                    <List/>
                  </RequireAuth>
                }/>
                <Route path={'/secure'} element={
                  <RequireAuth loginPath={'/'}>
                    <User/>
                  </RequireAuth>
                }/>
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent
