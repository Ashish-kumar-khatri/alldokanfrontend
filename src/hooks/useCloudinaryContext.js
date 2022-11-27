import React from "react";
import {cloudinaryContext} from '../context/cloudinaryContext';

export const useCloudinaryContext = () => React.useContext(cloudinaryContext);