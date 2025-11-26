import { Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';


function App() {

  const location=useLocation();

  return (
    <>
      <Routes>
          <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  
      
  )
}

export default App
