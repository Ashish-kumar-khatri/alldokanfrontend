import React from 'react'
import {Skeleton} from '@mantine/core';

function ProfileSkeleton() {
  return (
    <div className = "profile-container bordered">
        <h3>
        <Skeleton 
            height = {20} 
            width = {100}
        />
        </h3>
        <div
        style = {{
            gap : ".5em"
        }} 
        className="profile-details  wrapper">

            <Skeleton 
            height = {200} 
            width = "75%"
            style = {{
                maxWidth : "250px"
            }}
            />
            <Skeleton 
            height = {30} 
            width = {100}
            />
            <Skeleton 
            height = {20}
            width = {180}
            />
            <Skeleton 
            height = {20}
            width = {200}
            />
            <Skeleton 
            height = {20}
            width = {250}
            />
        </div>
    </div>
  )
}

export default ProfileSkeleton