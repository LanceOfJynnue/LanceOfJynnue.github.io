import '../../style.css'
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const Profile: React.FC = () => {
const [error, setError] = useState<string | null>(null);
const [first_name, setFirstName] = useState<string>('');
const [last_name, setLastName] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [username, setUsername] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [created_at, setCreatedAt] = useState<string>('');

  useEffect(() => {
    const profileSelect = async () => {
      const user_id_str = sessionStorage.getItem('currentUserId');
      if (!user_id_str) {
        setError('Missing user_id in session storage.');
        return;
      }
      const user_id: number = parseInt(user_id_str, 10)
      const { data, error: queryError } = await supabase
        .from('user_table')
        .select('*')
        .eq('user_id', user_id)
        .single();
      
      if (queryError) {
        setError('Selection failed: ' + queryError.message);
      } else if (data) {
        setError(null);
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setEmail(data.email || '');
        setUsername(data.username || '');
        setPassword(data.password || '');
        setCreatedAt(data.created_at || '');
        // Use the retrieved data as needed
        console.log('User Profile:', { user_id: data.user_id, first_name: data.first_name, last_name: data.last_name, email: data.email, username: data.username, password: data.password, created_at: data.created_at });
      }
    };
    profileSelect();
  }, []);
  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div className="profile-details">
        <p className="profile-item">First Name: <span className="profile-item-detail">{first_name}</span></p>
        <p className="profile-item">Last Name: <span className="profile-item-detail">{last_name}</span></p>
        <p className="profile-item">Email: <span className="profile-item-detail">{email}</span></p>
        <p className="profile-item">Username: <span className="profile-item-detail">{username}</span></p>
        <p className="profile-item">Password: <span className="profile-item-detail">{password}</span></p>
        <p className="profile-item">Created At: <span className="profile-item-detail">{created_at}</span></p>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Profile