import { useState, useEffect } from 'react'
import authenticateLogin from '../api/authenticateLogin';
import createUser from '../api/createUser';
import handleChange from '../utils/handleChange';

function App() {
  const [user, setUser] = useState(null);
  const [registration, setRegistration] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    email: '',
    birthDate: '',
  });
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await authenticateLogin(loginData);
      if (!user) {
        const error = new Error('Error logging in');
        error.status = 400;
        setError(error);
      };

      setUser(user);
    } catch(err) {
      setError(err);
    };
  };

  async function handleRegistration(e) {
    e.preventDefault();

    try {
      const success = await createUser(newUserData);
      if (!success) {
        const error = new Error('Error Registering User');
        error.status = 400;
        setError(error);
      };

      setRegistration(false);
    } catch(err) {
      setError(err);
    };
  };

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
        <button onClick={() => setError(null)}>Back to App</button>
      </div>
    )
  };

  if (registration) {
    return (
      <div>
        <form onSubmit={handleRegistration}>
          <h1>Register New User</h1>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" value={newUserData.username} onChange={(e) => handleChange(e, setNewUserData)} />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={newUserData.password} onChange={(e) => handleChange(e, setNewUserData)} />
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" value={newUserData.email} onChange={(e) => handleChange(e, setNewUserData)} />
          <label htmlFor="birthDate">Date of Birth: </label>
          <input type="date" name="birthDate" id="birthDate" value={newUserData.birthDate} onChange={(e) => handleChange(e, setNewUserData)} />
          <button type="submit">Register User</button>
        </form>
      </div>
    )
  };

  if (!user) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" value={loginData.username} onChange={(e) => handleChange(e, setLoginData)} />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={loginData.password} onChange={(e) => handleChange(e, setLoginData)}/>
          <button type="submit">Log In</button>
        </form>
        <button onClick={() => setRegistration(true)}>Create New User</button>
      </div>
    )
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <button>Log Out</button>
    </div>
  )
}

export default App
