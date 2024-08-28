import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css'; // Import the CSS module

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [tempProfilePicture, setTempProfilePicture] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
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
        setEmail(response.data.email || 'ไม่มีข้อมูล');
        setBirthdate(response.data.birthdate ? response.data.birthdate.split('T')[0] : 'ไม่มีข้อมูล');
        setProfilePicture(response.data.profilePicture || '');
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = ''; // For modern browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges]);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('birthdate', birthdate);
      if (tempProfilePicture) {
        formData.append('profilePicture', tempProfilePicture);
      }

      await axios.put('http://localhost:5000/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Fetch updated profile data to reflect changes
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfilePicture(response.data.profilePicture || '');
      setTempProfilePicture(null); // Clear temp profile picture
      setHasChanges(false); // Reset the changes flag
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempProfilePicture(file); // Save file for upload
      setHasChanges(true);
    }
  };

  const handleDiscardChanges = () => {
    setTempProfilePicture(null); // Clear temp profile picture
    setHasChanges(false); // Reset the changes flag
  };

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      {user ? (
        <div className={styles.profileContainer}>
          <div className={styles.profilePictureContainer}>
            <img 
              src={tempProfilePicture ? URL.createObjectURL(tempProfilePicture) : profilePicture || 'https://via.placeholder.com/150?text=No+Image'} 
              alt="Profile" 
              className={styles.profilePicture}
            />
          </div>
          <div className={styles.profileDetails}>
            <label>
              Email:
              <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.input}
              />
            </label>
            <label>
              Birthdate:
              <input 
                type="date" 
                value={birthdate} 
                onChange={(e) => setBirthdate(e.target.value)} 
                className={styles.input}
              />
            </label>
            <label>
              Upload image:
              <input 
                type="file" 
                onChange={handleFileChange} 
                className={styles.fileInput}
              />
            </label>
            <div className={styles.buttonContainer}>
              <button onClick={handleUpdateProfile} className={styles.saveButton}>Save Profile</button>
              <button onClick={handleDiscardChanges} className={styles.discardButton}>Discard Changes</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}

export default ProfilePage;
