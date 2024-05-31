import React, { useState } from 'react';
import Register from './components/Forms/Register';
import Login from './components/Forms/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('register');

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <Register />;
      case 'login':
        return <Login />;
      default:
        return <Register />;
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={() => setCurrentPage('register')}>a website</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setCurrentPage('register')}>Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setCurrentPage('login')}>Login</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="mt-3">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
