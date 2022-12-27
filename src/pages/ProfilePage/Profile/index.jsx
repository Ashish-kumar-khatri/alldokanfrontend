import React,{
  useEffect,
  useState
} from 'react'

import {Avatar, Button, Rating, Group, Stack,Text, Skeleton } from '@mantine/core';
import EditProfile from './EditProfile'
import { Icon } from '@iconify/react';

import './style.css';
import { useAuthContext, useGlobalContext, useQuery } from '../../../hooks';
import ProfileSkeleton from './ProfileSkeleton';

function Profile() {
  const {user,setUser} = useAuthContext();
  const [showForm,setShowForm] = useState(false);
  const [profile,setProfile] = useState(null);
  const [loading,setLoading] = useState(true);
  const [refetchProfile,setRefetchProfile] = useState(false);

  const {getProfile} = useGlobalContext();

  useEffect(() => {
      console.log('getting profile')
      getProfile()
        .then(res => {
          setProfile(res?.data);
          setLoading(false);
          console.log('profile = ',res?.data)
          localStorage.setItem('user',JSON.stringify(res?.data));
          setUser(res?.data);
        })
        .catch(err => {
          console.log('error = ',err);
        })
  },[refetchProfile])

  return (
      <>
        {
        !showForm ?
              <>
                {
                  loading ? 
                    <ProfileSkeleton />:
                    <div className="profile-container bordered">
                    <h3>My Profile</h3>
                    <div className = "profile-details">
                        <Avatar 
                          size = {200}
                          src = {profile?.avatar}
                          className = "avatar"
                          radius = {10}
                        />
                        {
                          user?.seller_account_status
                        }
                        <span className="verified badge safe">
                          <Icon icon = "material-symbols:check-circle-rounded" />
                          {profile?.account_type}
                        </span>
                        {/* {
                          user?.seller_account_status == "UNDER_REVIEW" &&
                          <span className="verified badge safe">
                            <Icon icon = "material-symbols:check-circle-rounded" />
                            
                          </span>
                        } */}
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
                    </div>
                }
              </>:
        <EditProfile 
          setShowForm={setShowForm}
          profile = {profile}
          setRefetchProfile = {setRefetchProfile}
        />
      }
      </>
  )
}

export default Profile
