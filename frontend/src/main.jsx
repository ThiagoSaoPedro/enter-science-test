import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

//creates the 'root' element, which will later be replaced by the content
createRoot(document.getElementById('root')).render(
      //calls the 'App' function
  //StrictMode - Shows warnings when outdated APIs are being used.
  <StrictMode> 
    <App/>
  </StrictMode>,
)
