import  {BrowserRouter , Routes, Route } from 'react-router-dom'
import RegisteredFamilyMembers from './pages/viewRegisteredFamilyMembers'
import FilteredAppointments from './pages/viewFilteredAppointments'

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
          <Route
            path="/FilteredAppointments"
            element={<FilteredAppointments/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
