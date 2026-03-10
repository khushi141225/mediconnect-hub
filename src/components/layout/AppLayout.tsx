import { Outlet } from 'react-router-dom';
import NavRail from './NavRail';
import ServantPanel from './ServantPanel';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <NavRail />
      <ServantPanel />
      {/* Served space: between nav rail and servant panel */}
      <main className="ml-16 mr-80 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
