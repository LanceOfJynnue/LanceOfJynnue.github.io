import '../../style.css'
import { useState } from 'react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }
  const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      sessionStorage.setItem('authenticatePassword', formData.password);
      sessionStorage.setItem('authenticateUsername', formData.username);
      window.location.href = '/authLogin';
    };

  return (
      <div className="Login">
        <h1>Login</h1>
        <div className='log-reg_form'>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username or Email</label>
              <input type="text" className="form-control" id="username" placeholder="Enter Username or Email" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
  );
};

export default Login;