import { useEffect, useState } from 'react';
import Register from './Register';

const Authenticate = ({ setIsAuthenticated }) => {
  const [needRegister, setNeedRegister] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    const authLocal = localStorage.getItem('auth');
    if (authLocal) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    fetch(`https://reqres.in/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.token) {
          localStorage.setItem('auth', result.token);
          setIsAuthenticated(true);
        } else {
          setErrorStatus(result.error);
          setTimeout(() => {
            setErrorStatus(null);
          }, 5000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (needRegister) {
    return <Register {...{ setIsAuthenticated, setNeedRegister }} />;
  }

  return (
    <div className="authen-form shadow">
      {errorStatus && <div className="status-box error">{errorStatus}</div>}
      <h2>Please login or register</h2>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <label for="email">Email</label>
        <input id="email" placeholder="email" type="email" name="email"></input>
        <label for="password">Password</label>
        <input
          id="password"
          placeholder="password"
          type="password"
          name="password"
        ></input>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn-primary submit shadow">
            Login
          </button>
          <button type="reset" className="btn-primary reject shadow">
            Clear
          </button>
        </div>
      </form>
      <button
        className="btn-primary normal shadow"
        onClick={() => {
          setNeedRegister(true);
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Authenticate;
