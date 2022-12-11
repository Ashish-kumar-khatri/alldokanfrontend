import React from 'react'
import OtherLayout from '../../layout/OtherLayout'
import Profile from './Profile/'
import Other from './Other';
import './style.css';

function ProfilePage() {
  return (
    <OtherLayout>
        <div className = "profilepage-container">
          <Profile />
          <Other />
        </div>
    </OtherLayout>
  )
}

export default ProfilePage