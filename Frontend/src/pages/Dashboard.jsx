 import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUsername(user.username);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#4B0082', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '30px' }}>EXCEL ANALYTICS</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['Dashboard', 'Upload Files', 'File History', 'Visualizations', 'Smart Insight', 'Downloads', 'Account Settings'].map(item => (
            <li key={item} style={{ marginBottom: '15px', background: item === 'Dashboard' ? '#6A0DAD' : 'transparent', padding: '10px', borderRadius: '8px' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: '#f4f0fa', padding: '30px' }}>
        {/* Header */}
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#4B0082' }}>Welcome {username}!</h2>
          <button onClick={handleLogout} style={{ backgroundColor: '#4c2fd6', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px' }}>Log Out</button>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#dcd3ec', flex: 1, padding: '20px', borderRadius: '10px' }}>Total Files Uploaded</div>
          <div style={{ background: '#d6f5e9', flex: 1, padding: '20px', borderRadius: '10px' }}>Successful Uploads</div>
          <div style={{ background: '#f9d6d5', flex: 1, padding: '20px', borderRadius: '10px' }}>Failed Uploads</div>
        </div>

        {/* Recent Uploads Table */}
        <h3 style={{ color: '#4B0082', marginBottom: '10px' }}>Recent Uploads</h3>
        <table style={{ width: '100%', background: '#e8dff4', borderRadius: '10px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#d1b3ec', color: '#4B0082', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>File Name</th>
              <th style={{ padding: '10px' }}>Date</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px' }} colSpan="3">No uploads yet.</td>
            </tr>
          </tbody>
        </table>

        {/* Upload Status */}
        <h3 style={{ color: '#4B0082', marginTop: '30px' }}>Upload Status</h3>
        <p>No chart data available.</p>
      </div>
    </div>
  );
}
 
