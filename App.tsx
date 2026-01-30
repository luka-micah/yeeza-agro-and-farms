
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Calendar, 
  User as UserIcon, 
  Package, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Bell,
  TrendingUp,
  CreditCard,
  MapPin,
  ChevronRight
} from 'lucide-react';

import LandingPage from './features/LandingPage';
import AuthPage from './features/Auth';
import FarmerDashboard from './features/FarmerDashboard';
import ColdRoomDashboard from './features/ColdRoomDashboard';
import { UserRole, User } from './types';

// Robust SVG Logo Component mirroring the provided business logo
export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg', showText?: boolean, inverse?: boolean }> = ({ size = 'md', showText = true, inverse = false }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-20 h-20'
  };
  
  return (
    <div className="flex items-center space-x-3">
      <div className={`${dimensions[size]} shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Sun */}
          <circle cx="50" cy="35" r="25" fill="#FBC02D" />
          {/* Grass */}
          <path d="M10 85C30 78 70 78 90 85V95H10V85Z" fill="#388E3C" />
          <path d="M40 82L45 70L50 82M60 82L65 72L70 82M25 82L30 75L35 82" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" />
          {/* Cow Silhouette */}
          <path d="M75 45C72 40 65 38 60 40C55 42 45 38 35 38C25 38 22 45 22 55C22 65 25 68 30 70C35 72 38 80 35 85H42L45 75L48 85H55L52 75C58 72 65 65 65 55C65 50 70 52 75 52C80 52 85 48 75 45Z" fill="#3E2723" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col -space-y-1">
          <span className={`${size === 'lg' ? 'text-3xl' : 'text-xl'} font-black ${inverse ? 'text-white' : 'text-brand-500'} tracking-tighter`}>
            YEEZA
          </span>
          <span className={`${size === 'lg' ? 'text-xl' : 'text-base'} font-bold ${inverse ? 'text-primary-100' : 'text-primary-600'} tracking-widest`}>
            FARM
          </span>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('yeeza_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('yeeza_user');
    setUser(null);
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs">Authenticating...</p>
      </div>
    </div>
  );

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage mode="login" onAuth={setUser} />} />
          <Route path="/register/:role" element={user ? <Navigate to="/dashboard" /> : <AuthPage mode="register" onAuth={setUser} />} />
          
          <Route 
            path="/dashboard/*" 
            element={
              user ? (
                <DashboardLayout user={user} onLogout={handleLogout}>
                  <Routes>
                    <Route index element={<DashboardSelector user={user} />} />
                    <Route path="farmer/*" element={<FarmerDashboard user={user} />} />
                    <Route path="cold-room/*" element={<ColdRoomDashboard user={user} />} />
                    <Route path="*" element={<Navigate to="" />} />
                  </Routes>
                </DashboardLayout>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

const DashboardSelector: React.FC<{ user: User }> = ({ user }) => {
  if (user.role === UserRole.FARMER) return <Navigate to="farmer" />;
  if (user.role === UserRole.COLD_ROOM_OWNER) return <Navigate to="cold-room" />;
  return <div>Welcome, Admin</div>;
};

const DashboardLayout: React.FC<{ user: User, onLogout: () => void, children: React.ReactNode }> = ({ user, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const farmerNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/farmer' },
    { name: 'My Livestock', icon: Package, path: '/dashboard/farmer/livestock' },
    { name: 'Reservations', icon: Calendar, path: '/dashboard/farmer/bookings' },
    { name: 'Find Storage', icon: Store, path: '/dashboard/farmer/cold-rooms' },
    { name: 'My Profile', icon: UserIcon, path: '/dashboard/farmer/profile' },
  ];

  const coldRoomNav = [
    { name: 'Facility Overview', icon: LayoutDashboard, path: '/dashboard/cold-room' },
    { name: 'Manage Space', icon: Store, path: '/dashboard/cold-room/facility' },
    { name: 'Bookings', icon: Calendar, path: '/dashboard/cold-room/bookings' },
    { name: 'Revenue', icon: TrendingUp, path: '/dashboard/cold-room/finance' },
    { name: 'Settings', icon: UserIcon, path: '/dashboard/cold-room/profile' },
  ];

  const navItems = user.role === UserRole.FARMER ? farmerNav : coldRoomNav;

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm z-20">
        <div className="p-6">
          <Link to="/">
            <BrandLogo size="md" />
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard/farmer' && item.path !== '/dashboard/cold-room' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-gray-50">
          <div className="mb-4 p-4 bg-primary-50 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-primary-600 uppercase">Tier</p>
              <p className="text-xs font-bold text-gray-700">Premium Farmer</p>
            </div>
            <ChevronRight className="w-4 h-4 text-primary-400" />
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center">
            <button className="lg:hidden p-2 rounded-xl text-gray-500 mr-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="lg:hidden"><BrandLogo size="sm" showText={false} /></div>
            <h1 className="ml-4 font-bold text-gray-800 hidden sm:block">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-100 w-48 transition-all" />
            </div>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center pl-4 border-l border-gray-100">
              <div className="text-right mr-3 hidden sm:block">
                <p className="text-xs font-black text-gray-900 uppercase">{user.firstName} {user.lastName}</p>
                <p className="text-[10px] text-primary-600 font-bold">{user.role.replace(/_/g, ' ')}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-500 text-white flex items-center justify-center font-bold shadow-sm">
                {user.firstName?.[0]}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white animate-slideInLeft">
            <div className="p-6 flex items-center justify-between border-b border-gray-50">
              <BrandLogo size="md" />
              <button className="p-2 rounded-xl text-gray-400" onClick={() => setIsSidebarOpen(false)}><X className="h-6 w-6" /></button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center px-4 py-4 text-sm font-bold rounded-2xl ${location.pathname === item.path ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500'}`}>
                  <item.icon className="mr-4 h-6 w-6" /> {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
