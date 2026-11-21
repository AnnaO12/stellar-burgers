import { useSelector } from '@/services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactElement } from 'react';

type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export function ProtectedRoute({
  children,
  onlyUnAuth = false,
}: TProtectedRouteProps): ReactElement {
  const user = useSelector((state) => state.user.user);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    return <Navigate to={from} replace />;
  }
  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search + location.hash }}
        replace
      />
    );
  }
  return children;
}
