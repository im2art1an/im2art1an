import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MartianPortfolio from './martian-portfolio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MartianPortfolio />
  </StrictMode>
)