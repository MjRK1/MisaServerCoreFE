import React from 'react';
// @ts-ignore
import { useAuth } from 'hooks/AuthProvider';
const FilesApp = React.lazy(() => import("misa_files/FilesApp"));


export const ModulePage = () => {
  // const { moduleName } = useParams();
  const { user, accessToken, refreshToken } = useAuth();


  const renderModule = () => {
    if (!user) {
      return null;
    }
    return (
      <FilesApp
        user={user}
        accessToken={accessToken}
        refreshToken={refreshToken}
      />
    );
  };

  return (
    <div className="module-page">
      {renderModule()}
    </div>
  );
};

