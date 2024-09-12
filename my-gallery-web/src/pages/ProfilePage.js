import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css'; // Import the CSS module
import { FaCamera } from 'react-icons/fa'; // Import FaCamera icon

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
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
        setUsername(response.data.username || 'ไม่มีข้อมูล');
        setEmail(response.data.email || 'ไม่มีข้อมูล');
        setBirthdate(response.data.birthdate ? response.data.birthdate.split('T')[0] : 'ไม่มีข้อมูล');
        setBio(response.data.bio || 'ไม่มีข้อมูล');
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
    formData.append('bio', bio);
    formData.append('username', username);
    if (tempProfilePicture) {
      formData.append('profilePicture', tempProfilePicture);
    }

    const response = await axios.put('http://localhost:5000/api/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Server response:', response.data); // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์
    setUser(response.data);
    setProfilePicture(response.data.profilePicture || '');
    setTempProfilePicture(null);
    setHasChanges(false);
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

  const handleProfilePictureClick = () => {
    document.getElementById('profilePictureInput').click();
  };

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      {user ? (
        <div className={styles.profileContainer}>
          <div className={styles.profilePictureContainer}>
            <div className={styles.overlay}>
              <FaCamera className={styles.cameraIcon} />
              <span className={styles.overlayText}>Choose Photo</span>
            </div>
            <img 
              src={tempProfilePicture ? URL.createObjectURL(tempProfilePicture) : profilePicture || 'https://via.placeholder.com/150?text=No+Image'} 
              alt="Profile" 
              className={styles.profilePicture}
              onClick={handleProfilePictureClick}
            />
            <input 
              type="file" 
              id="profilePictureInput" 
              className={styles.hiddenFileInput}
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.detailsRow}>
              <label className={styles.label}>
                Username:
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => { setUsername(e.target.value); setHasChanges(true); }} // Handle changes to username
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                Email:
                <input 
                  type="text" 
                  value={email} 
                  onChange={(e) => { setEmail(e.target.value); setHasChanges(true); }} 
                  className={styles.input}
                />
              </label>
            </div>
            <label>
              Birthdate
              <input 
                type="date" 
                value={birthdate} 
                onChange={(e) => { setBirthdate(e.target.value); setHasChanges(true); }} 
                className={styles.input}
              />
            </label>
            <label>
              Bio:
              <input 
                type="text" 
                value={bio} 
                onChange={(e) => { setBio(e.target.value); setHasChanges(true); }} 
                placeholder="Enter your bio" 
                className={styles.input}
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
