import React from 'react';

import {AuthContext} from '../context/authContext';

const useAuthContext = () => React.useContext(AuthContext);

export default useAuthContext;