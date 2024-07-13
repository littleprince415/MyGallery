import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          {/* Add other profile information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
