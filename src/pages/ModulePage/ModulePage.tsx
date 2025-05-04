import React from 'react';
import { useAuth } from 'hooks/AuthProvider';
import { useParams } from 'react-router-dom';
// @ts-ignore
const FilesApp = React.lazy(() => import("misa_files/FilesApp"));


export const ModulePage = () => {
  const { moduleName } = useParams();
  const { user, accessToken, refreshToken } = useAuth();

  const MODULES_ENUM = {
    MisaFiles: (
      <FilesApp
        user={user}
        accessToken={accessToken}
        refreshToken={refreshToken}
      />
    ),
  };


  const renderModule = () => {
    if (!user) {
      return null;
    }
    return (
      MODULES_ENUM[moduleName as string]
    );
  };

  return (
    <div className="module-page">
      {renderModule()}
    </div>
  );
};

