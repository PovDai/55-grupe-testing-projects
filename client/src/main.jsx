import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './bootstrap.min.css';
import './App.css';
import './checkers.css';
import './countries.css';
import './hangman.css';
import { App } from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
