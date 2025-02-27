import './App.css';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import { DartsList } from './DartsList';
import { DartsSingle } from './DartsSingle';
import { DartsCreate } from './DartsCreate';
import { DartsMod } from './DartsMod';
import { DartsDel } from './DartsDel';

export const App = () => {
  return (
    <div className='App'>
      <Router>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className="nav-link" to="/">Darts</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className="nav-link" to="/create-darts">Új dartsozó</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<DartsList/>}/>
          <Route path="/darts/:dartsId" element={<DartsSingle/>}/>
          <Route path="/create-darts" element={<DartsCreate/>}/>
          <Route path="/mod-darts/:dartsId" element={<DartsMod/>}/>
          <Route path="/del-darts/:dartsId" element={<DartsDel/>}/>
        </Routes>
      </Router>
    </div>
  );
}