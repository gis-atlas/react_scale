import { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/reducer';

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  });
  return <>{children}</>;
};

export default AuthWrapper;
