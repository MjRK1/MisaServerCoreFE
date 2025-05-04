const CURRENT_HOSTNAME = typeof window === 'undefined' ? 'localhost' : window?.location?.hostname || '';
export const CURRENT_PROTOCOL = window?.location?.protocol || 'http:';


export function getIsLocalhost() {
  return CURRENT_HOSTNAME === '127.0.0.1' || CURRENT_HOSTNAME === 'localhost';
}

export const isTestBuild = () => process.env.NODE_ENV === 'test';

function getHostname() {
  const isLocalhost = getIsLocalhost();

  if (isLocalhost || isTestBuild()) {
    return {
      protocol: 'http:',
      hostname: 'localhost:5001',
    };
  }

  return {
    protocol: CURRENT_PROTOCOL,
    hostname: `api.${CURRENT_HOSTNAME}/core`,
  };
}
export const { protocol, hostname } = getHostname();
