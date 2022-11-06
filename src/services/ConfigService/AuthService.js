import { userSelector } from 'react-redux';

const AuthService = () => {
  const user = localStorage.getItem('token');
  return user;
};

export default AuthService;
