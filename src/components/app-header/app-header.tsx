import { useSelector } from '@/services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader = (): React.JSX.Element => {
  const userName = useSelector((state) => state.user.user?.name);

  return <AppHeaderUI userName={userName} />;
};
