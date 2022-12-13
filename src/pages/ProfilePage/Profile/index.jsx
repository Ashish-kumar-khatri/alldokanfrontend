import React,{
  useEffect,
  useState
} from 'react'

import {Avatar, Button, Rating, Group, Stack,Text } from '@mantine/core';
import EditProfile from './EditProfile'
import { Icon } from '@iconify/react';

import './style.css';
import { useAuthContext, useGlobalContext, useQuery } from '../../../hooks';

function Profile() {
  const {user} = useAuthContext();
  const [showForm,setShowForm] = useState(false);
  const [profile,setProfile] = useState(null);
  const {getProfile} = useGlobalContext();

  useEffect(() => {
    console.log('getting profile')
    getProfile()
      .then(res => {
        setProfile(res?.data);
      })
      .catch(err => {
        console.log('error = ',err);
      })
  },[])

  return (
      <>
        {
        !showForm ?
          <div className="profile-container bordered">
            <h3>My Profile</h3>
            <div
              className = "profile-details"
            >
                <Avatar 
                  size = {200}
                  src = {profile?.avatar}
                  className = "avatar"
                  radius = {10}
                />
                <span className="verified badge safe">
                  <Icon icon = "material-symbols:check-circle-rounded" />
                  {profile?.account_type}
                </span>
                <div className='details-container'>
                    <span className="username bold">
                      {profile?.person_name}
                    </span>
                   {
                    profile?.phone_number?.map(phone => (
                      <span 
                        key = {phone}
                        className="phone light"
                      >
                        {phone}
                      </span>
                    ))
                   }
                    <span className="email light">
                      {profile?.email}
                    </span>
                </div>
            </div>
            <div className="others">
                <Button
                  variant = "outline"
                  onClick = {() => setShowForm(prev => !prev)}
                >
                  Update profile
                </Button>
                <span className="rating">
                  <Group>
                    <Rating 
                      fractions={2} 
                      defaultValue={0} 
                      className = "unclickable"
                      readOnly
                    />
                  </Group>
                </span>
              </div>
        </div>:
        <EditProfile 
          setShowForm={setShowForm}
          profile = {profile}
        />
      }
      </>
  )
}

export default Profile
