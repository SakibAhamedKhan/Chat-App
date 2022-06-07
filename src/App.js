import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Chatboard from './Components/Chatboard';
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <div className="bg-base-100">
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/chatboard' element={
          <RequireAuth>
            <Chatboard></Chatboard>
          </RequireAuth>
        }></Route>

      </Routes>
    </div>
  );
}

export default App;
