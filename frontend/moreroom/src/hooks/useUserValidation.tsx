import React from 'react';
import { useLocation } from 'react-router-dom';
import { sessionValidate } from '../apis/authApi';

export const useUserValidation = async () => {
  const loc = useLocation();

  const regex = /^(\/(login|signup))(\/.*)?$/;

  if (!regex.test(loc.pathname)) {
    await sessionValidate();
  }
};
