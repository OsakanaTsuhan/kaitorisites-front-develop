// components/RouteResetHandler.tsx
'use client';

import { useRouteReset } from '@/lib/useRouteReset';

const RouteResetHandler = () => {
  useRouteReset();
  return null; // This component doesn't render anything
};

export default RouteResetHandler;
