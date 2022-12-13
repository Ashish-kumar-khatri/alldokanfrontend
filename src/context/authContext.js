import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  );

  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );
  
  let value = {
    token: token,
    user: user,
    setToken : setToken,
    setUser : setUser
  };
  
  useEffect(() => {
    value.user = user;
    value.token = token;
  },[user,token])

  return(
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
};
