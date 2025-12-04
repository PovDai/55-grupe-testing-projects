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
import { StockTracker } from './pages/admin/stocks/StockMarket'
import { AdvicePage } from './pages/admin/advice/AdvicePage'
import { Weather } from './pages/admin/weather/Weather'
import { Calculator } from './components/Calculator'
import { Checkers } from './components/checkers/Checkers'
import { Countries } from './components/countries/Countries'
import { Nasa } from './components/nasa/Nasa'
import { Hangman } from './components/hangman/Hangman'
import { ReactionGame } from './components/reaction/Reaction'

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
           <Route path="/admin/stocks/" element={<StockTracker />} />
           <Route path='/admin/advice' element={<AdvicePage />} />
           <Route path='/admin/weather' element={<Weather />} />
           <Route path='/admin/calculator' element={<Calculator />} />
           <Route path='/admin/checkers' element={<Checkers />} />
           <Route path='/admin/hangman' element={<Hangman />}/>
           <Route path='/admin/countries' element={<Countries />} />
           <Route path='/admin/apod' element={<Nasa />} />
           <Route path='/admin/reaction' element={<ReactionGame />}/>

              
              </Route>

              <Route element={<PublicLayout />}>
                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
    </UserContextWrapper>
  );
}


