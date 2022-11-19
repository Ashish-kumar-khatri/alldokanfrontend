import React from 'react'
import { Link } from 'react-router-dom';

import {showNotification} from '@mantine/notifications';

import {useAuthContext, useCreateNotification} from '../../hooks/';

function Nav() {

    const {user,logout} = useAuthContext();
    const createNotification = useCreateNotification();

    const logoutHandler = (e) => {
        console.log('logging out')
        logout()
            .then(res => {
                console.log('logged out success')
                createNotification({
                    type : "success",
                    title : "logout",
                    message : "logged out successfully",
                    icon : "heroicons-outline:logout",
                    timer  : 5000,
                })
            })
            .catch(err => {
                showNotification({
                    title : "logout",
                    description : "logged out failed"
                })
            })
    }

    return (
        <nav>
            {
                user ?
                <>
                   logged in as {user?.name}
                    <Link to = "#" onClick = {logoutHandler}>
                        logout
                    </Link>
                </> : 
                <Link to = "/login">
                    login
                </Link>
            }
        </nav>
    )
}

export default Nav