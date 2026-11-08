import { useDispatch } from '@/services/store';
import { logoutUser } from '@/services/userSlice';
import { ProfileMenuUI } from '@ui';
import { useLocation } from 'react-router-dom';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    void dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
