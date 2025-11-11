import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router'
import { HomePage } from './pages/public/Home'
import { RegisterPage } from './pages/public/Register'
import { LoginPage } from './pages/public/Login'
import { LogoutPage } from './pages/public/Logout'
import { PublicLayout } from './templates/PublicLayout'
import { AdminLayout } from './templates/AdminLayout'
import { NotFoundPage } from './pages/public/NotFound'
import { UserContextWrapper } from './context/user/UserContextWrapper'
import { AdminDasboardPage } from './pages/admin/Dashboard'

 export function App() {
 

 return (
    <UserContextWrapper>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path='/' index element={<HomePage />} />
               
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/logout' element={<LogoutPage />} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route path='/admin' element={<AdminDasboardPage />} />

              
              </Route>

              <Route element={<PublicLayout />}>
                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
    </UserContextWrapper>
  );
}


