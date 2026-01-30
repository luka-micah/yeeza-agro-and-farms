
import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  ShieldCheck,
  Users,
  Activity,
  Settings,
  Moon,
  Sun,
  CheckCircle2,
  Info,
  Clock,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

import LandingPage from './features/LandingPage';
import AuthPage from './features/Auth';
import FarmerDashboard from './features/FarmerDashboard';
import ColdRoomDashboard from './features/ColdRoomDashboard';
import AdminDashboard from './features/AdminDashboard';
import { UserRole, User } from './types';

// Tooltip Component
export const Tooltip: React.FC<{ text: string, children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative group flex items-center">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-brand-800 text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] shadow-xl border border-white/10 pointer-events-none">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-brand-800"></div>
    </div>
  </div>
);

// Robust SVG Logo Component
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
          <circle cx="50" cy="35" r="25" fill="#FBC02D" />
          <path d="M10 85C30 78 70 78 90 85V95H10V85Z" fill="#388E3C" />
          <path d="M40 82L45 70L50 82M60 82L65 72L70 82M25 82L30 75L35 82" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" />
          <path d="M75 45C72 40 65 38 60 40C55 42 45 38 35 38C25 38 22 45 22 55C22 65 25 68 30 70C35 72 38 80 35 85H42L45 75L48 85H55L52 75C58 72 65 65 65 55C65 50 70 52 75 52C80 52 85 48 75 45Z" fill="#3E2723" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col -space-y-1">
          <span className={`${size === 'lg' ? 'text-3xl' : 'text-xl'} font-black ${inverse ? 'text-white' : 'text-brand-500 dark:text-white'} tracking-tighter`}>
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('yeeza_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('yeeza_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('yeeza_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogout = () => {
    localStorage.removeItem('yeeza_user');
    setUser(null);
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-900">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs">Yeeza is Loading...</p>
      </div>
    </div>
  );

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-brand-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage mode="login" onAuth={setUser} />} />
          <Route path="/register/:role" element={user ? <Navigate to="/dashboard" /> : <AuthPage mode="register" onAuth={setUser} />} />
          
          <Route 
            path="/dashboard/*" 
            element={
              user ? (
                <DashboardLayout user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme}>
                  <Routes>
                    <Route index element={<DashboardSelector user={user} />} />
                    <Route path="farmer/*" element={<FarmerDashboard user={user} />} />
                    <Route path="cold-room/*" element={<ColdRoomDashboard user={user} />} />
                    <Route path="admin/*" element={<AdminDashboard user={user} />} />
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
  if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) return <Navigate to="admin" />;
  return <div>Welcome to the platform</div>;
};

const NotificationDropdown: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const notifications = [
    { id: 1, type: 'success', title: 'Payment Confirmed', desc: '₦45,000 received from Bukuru Cold Hub.', time: '2m ago' },
    { id: 2, type: 'info', title: 'New Storage Request', desc: 'A farmer wants to store 50 cattle units.', time: '1h ago' },
    { id: 3, type: 'warning', title: 'Health Alert', desc: 'Goat Batch #B2 needs routine vaccination.', time: '4h ago' },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-brand-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden z-[100] animate-zoomIn">
      <div className="p-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <h3 className="font-black text-gray-900 dark:text-white text-sm">Notifications</h3>
        <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Clear All</button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(n => (
          <div key={n.id} className="p-4 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                n.type === 'success' ? 'bg-green-50 text-green-600' : 
                n.type === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {n.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : n.type === 'warning' ? <Activity className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{n.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{n.desc}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <Clock className="w-3 h-3" /> {n.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary-600 transition-colors">See all alerts</button>
    </div>
  );
};

const OnboardingModal: React.FC<{ isOpen: boolean, onClose: () => void, user: User }> = ({ isOpen, onClose, user }) => {
  const [step, setStep] = useState(1);
  if (!isOpen) return null;

  const steps = [
    { title: "Welcome to Yeeza Farm", desc: "Glad to have you, " + user.firstName + "! Let's get your farm connected to Plateau's infrastructure.", icon: <Sparkles className="w-10 h-10 text-primary-600" /> },
    { title: "List Your Inventory", desc: "Add your livestock to the digital ledger. Track weight, health, and valuation in real-time.", icon: <Package className="w-10 h-10 text-secondary-600" /> },
    { title: "Book Cold Storage", desc: "Find vetted cold rooms in Jos and Bukuru. Reserve space instantly and reduce waste.", icon: <Store className="w-10 h-10 text-accent-500" /> }
  ];

  const currentStep = steps[step-1];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-brand-800 rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden p-10 text-center animate-zoomIn relative">
        <div className="absolute top-8 right-8">
          <button onClick={onClose} className="p-2 text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-primary-50 dark:bg-primary-500/10 rounded-[2.5rem]">
          {currentStep.icon}
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">{currentStep.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium mb-12">
          {currentStep.desc}
        </p>
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 rounded-full transition-all ${s === step ? 'w-8 bg-primary-500' : 'w-2 bg-gray-100 dark:bg-white/10'}`} />
            ))}
          </div>
          <button 
            onClick={() => step < 3 ? setStep(step + 1) : onClose()} 
            className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 dark:shadow-none"
          >
            {step === 3 ? "Let's Start" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout: React.FC<{ user: User, onLogout: () => void, theme: string, toggleTheme: () => void, children: React.ReactNode }> = ({ user, onLogout, theme, toggleTheme, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onboarded = localStorage.getItem(`onboarded_${user.id}`);
    if (!onboarded) {
      setTimeout(() => setShowOnboarding(true), 1000);
    }
  }, [user.id]);

  const handleCloseOnboarding = () => {
    localStorage.setItem(`onboarded_${user.id}`, 'true');
    setShowOnboarding(false);
  };

  const navItems = {
    [UserRole.FARMER]: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/farmer' },
      { name: 'My Livestock', icon: Package, path: '/dashboard/farmer/livestock' },
      { name: 'Reservations', icon: Calendar, path: '/dashboard/farmer/bookings' },
      { name: 'Find Storage', icon: Store, path: '/dashboard/farmer/cold-rooms' },
      { name: 'My Profile', icon: UserIcon, path: '/dashboard/farmer/profile' },
    ],
    [UserRole.COLD_ROOM_OWNER]: [
      { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/cold-room' },
      { name: 'Facility', icon: Store, path: '/dashboard/cold-room/facility' },
      { name: 'Bookings', icon: Calendar, path: '/dashboard/cold-room/bookings' },
      { name: 'Market Finder', icon: Search, path: '/dashboard/cold-room/market' },
      { name: 'My Profile', icon: UserIcon, path: '/dashboard/cold-room/profile' },
    ],
    [UserRole.ADMIN]: [
      { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/admin' },
      { name: 'Users', icon: Users, path: '/dashboard/admin/users' },
      { name: 'Verification', icon: ShieldCheck, path: '/dashboard/admin/verifications' },
      { name: 'My Profile', icon: UserIcon, path: '/dashboard/admin/profile' },
    ],
    [UserRole.SUPER_ADMIN]: [
      { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/admin' },
      { name: 'Users', icon: Users, path: '/dashboard/admin/users' },
      { name: 'Verification', icon: ShieldCheck, path: '/dashboard/admin/verifications' },
      { name: 'Analytics', icon: Activity, path: '/dashboard/admin/analytics' },
      { name: 'System Settings', icon: ShieldAlert, path: '/dashboard/admin/system' },
      { name: 'My Profile', icon: UserIcon, path: '/dashboard/admin/profile' },
    ]
  }[user.role as keyof typeof UserRole] || [];

  const profilePath = user.role === UserRole.FARMER ? '/dashboard/farmer/profile' : user.role === UserRole.COLD_ROOM_OWNER ? '/dashboard/cold-room/profile' : '/dashboard/admin/profile';

  return (
    <div className="flex h-screen overflow-hidden">
      <OnboardingModal isOpen={showOnboarding} onClose={handleCloseOnboarding} user={user} />
      
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-brand-800 border-r border-gray-100 dark:border-white/5 shadow-sm z-20 transition-colors">
        <div className="p-6"><Link to="/"><BrandLogo size="md" /></Link></div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                isActive ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}>
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} /> {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-gray-50 dark:border-white/5 space-y-4">
          <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl">
             <div className="flex items-center justify-between mb-2">
               <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Progress</p>
               <p className="text-[10px] font-black text-primary-600">80%</p>
             </div>
             <div className="h-1.5 w-full bg-primary-200 dark:bg-primary-900 rounded-full overflow-hidden">
               <div className="h-full bg-primary-600 w-[80%]"></div>
             </div>
          </div>
          <button onClick={onLogout} className="flex items-center w-full px-4 py-3 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white dark:bg-brand-800 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 z-10 transition-colors">
          <div className="flex items-center">
            <button className="lg:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 mr-2" onClick={() => setIsSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
            <div className="lg:hidden shrink-0"><BrandLogo size="sm" showText={false} /></div>
            <h1 className="ml-4 font-black text-gray-900 dark:text-white hidden sm:block tracking-tight text-lg">System Oversight</h1>
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-2xl">
              <button onClick={() => theme === 'dark' && toggleTheme()} className={`p-2 rounded-xl transition-all ${theme === 'light' ? 'bg-white dark:bg-brand-800 text-primary-600 shadow-sm' : 'text-gray-400'}`}><Sun className="w-4 h-4" /></button>
              <button onClick={() => theme === 'light' && toggleTheme()} className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'bg-white dark:bg-brand-800 text-primary-600 shadow-sm' : 'text-gray-400'}`}><Moon className="w-4 h-4" /></button>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-2.5 rounded-2xl transition-all ${isNotifOpen ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-white dark:border-brand-800"></span>
              </button>
              <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            <div className="flex items-center pl-5 border-l border-gray-100 dark:border-white/10">
              <div className="text-right mr-4 hidden sm:block">
                <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">{user.firstName} {user.lastName}</p>
                <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest">{user.role.replace(/_/g, ' ')}</p>
              </div>
              <Link to={profilePath} className="w-12 h-12 rounded-[1.25rem] bg-secondary-500 text-white flex items-center justify-center font-black shadow-lg shadow-secondary-200 dark:shadow-none transition-transform hover:scale-105 cursor-pointer">
                {user.firstName?.[0] || 'A'}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 bg-[#F9FAFB] dark:bg-brand-900 transition-colors">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default App;
