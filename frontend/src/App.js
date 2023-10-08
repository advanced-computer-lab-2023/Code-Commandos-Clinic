import  {BrowserRouter , Routes, Route } from 'react-router-dom'
import RegisteredFamilyMembers from './pages/viewRegisteredFamilyMembers'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='pages'>
        <Routes>
          <Route
            path="/RegisteredFamilyMembers"
            element={<RegisteredFamilyMembers/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
