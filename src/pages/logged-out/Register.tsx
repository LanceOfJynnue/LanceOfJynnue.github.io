import '../../style.css'
import { useState } from 'react';
import { supabase } from '../../supabaseClient';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleInsert = async (event: React.FormEvent) => {
    event.preventDefault();

    // The data object to insert
    const newUser = { username: formData.username, email: formData.email, first_name: formData.first_name, last_name: formData.last_name, password: formData.password };

    const { error } = await supabase
      .from('user_table')
      .insert([newUser]);

    if (error) {
      setError(error.message);
    } else {
      alert('User data inserted successfully!');
      sessionStorage.setItem('authenticatePassword', formData.password);
      sessionStorage.setItem('authenticateUsername', formData.username);
      window.location.href = '/authLogin';
    }
  };

  return (
      <div className="Register">
        <h1>Register</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className='log-reg_form'>
          <form onSubmit={handleInsert}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input type="text" className="form-control" id="first_name" placeholder="Enter Your First Name" value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="last_name" placeholder="Enter Your Last Name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
  );
};

export default Register