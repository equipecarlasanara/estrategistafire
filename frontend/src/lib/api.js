export const getApiUrl = () => {
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return 'https://estrategista-api.andressamallinsk.workers.dev/api';
    }
  }
  // Trim trailing slash if present
  const base = envUrl || '';
  return `${base.endsWith('/') ? base.slice(0, -1) : base}/api`;
};
