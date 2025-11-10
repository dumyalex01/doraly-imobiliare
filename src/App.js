import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login/Login'
import AdminPage from './AdminPage/AdminPage';
import HomePage from './HomePage/HomePage';
import AnuntDetails from './HomePage/AnuntDetails';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Login />} />
         <Route
          path="/HomeAdmin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/Home" element = {<HomePage/>} />
        <Route path="/anunt/:id" element={<AnuntDetails/>} />

      </Routes>

    </Router>
  );
}

export default App;
