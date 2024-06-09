import React, { useEffect, useContext } from 'react';
import '../../styles/header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ username: "", id: 0, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []); // Add an empty dependency array to run only once

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <header className="header">
      <div className="logo">
        TrashGame
      </div>
      <nav className="navigation">
        <ul>
          <Link to='/'><li><a href="/">Games</a></li></Link>
          <li><a href="/">Reviews</a></li>
          <li><a href="/">Forum</a></li>
          <li><a href="/">Wishlist</a></li>
        </ul>
      </nav>
      <div className="account">
        {!authState.status ? (
          <>
            <Link to='/login'>
              <button className="account-button">
                Log In
              </button>
            </Link>
            <Link to='/register'>
              <button className="account-button">
                Register
              </button>
            </Link>
          </>
        ) : (
          <>
            <span>{authState.username}</span>
            <button className="account-button" onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
