import React from 'react';
import { GlobalContext } from '../context/globalContext';

export const useGlobalContext = () => React.useContext(GlobalContext);