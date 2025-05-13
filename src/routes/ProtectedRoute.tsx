import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, doesSessionExist } = useSessionContext() as { loading: boolean; doesSessionExist: () => boolean };
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !doesSessionExist()) {
      navigate('/auth');
    }
  }, [loading, doesSessionExist, navigate]);

  if (loading) return null;
  return <>{children}</>;
};