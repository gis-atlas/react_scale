import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
