import { useState } from 'react';

const Register = ({ setIsAuthenticated, setNeedRegister }) => {
  const [errorStatus, setErrorStatus] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    if (formData.password === formData.cpassword) {
      fetch(`https://reqres.in/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
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
    } else {
      alert('Error : password does not match');
    }
  };

  return (
    <div className="authen-form shadow">
      {errorStatus && <div className="status-box error">{errorStatus}</div>}
      <h2>Please fill the form</h2>
      <form
        onSubmit={(e) => {
          handleRegister(e);
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
        <label for="cpassword">Confirm Password</label>
        <input
          id="cpassword"
          placeholder="confirm password"
          type="password"
          name="cpassword"
        ></input>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn-primary submit shadow">
            Register
          </button>
          <button type="reset" className="btn-primary reject shadow">
            Clear
          </button>
        </div>
      </form>
      <button
        onClick={() => setNeedRegister(false)}
        className="btn-primary normal shadow"
      >
        Back to login
      </button>
    </div>
  );
};

export default Register;
