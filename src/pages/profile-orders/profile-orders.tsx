import { fetchHistory } from '@/services/historySlice';
import { useSelector, useDispatch } from '@/services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

export const ProfileOrders = (): React.JSX.Element => {
  const orders = useSelector((state) => state.history.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    void dispatch(fetchHistory());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
