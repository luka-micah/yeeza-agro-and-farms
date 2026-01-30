
import React, { useState, useMemo } from 'react';
// Added Navigate to the imports from react-router-dom to fix the error on line 395
import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Users, 
  Store, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  MapPin,
  Calendar,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  BarChart3,
  ExternalLink,
  Lock,
  Package,
  ShieldAlert,
  Database,
  Globe,
  Settings as SettingsIcon,
  ToggleLeft,
  Mail,
  Phone,
  Camera,
  Edit2,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { User, UserRole, UserStatus, MetricCardProps } from '../types';
import { Tooltip } from '../App';

// --- Components ---

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white dark:bg-brand-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl">{icon}</div>
      {trend && (
        <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${trend.isPositive ? 'bg-green-50 dark:bg-green-500/10 text-green-600' : 'bg-red-50 dark:bg-red-500/10 text-red-600'}`}>
          <TrendingUp className={`w-3 h-3 mr-1 ${!trend.isPositive && 'rotate-180'}`} />
          {trend.value}%
        </div>
      )}
    </div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
    <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
  </div>
);

// --- Profile View ---

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative h-64 w-full rounded-[3rem] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          alt="Plateau View"
        />
        <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm" />
        <div className="absolute bottom-8 left-8 flex items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-brand-800 border-4 border-white/20 shadow-2xl flex items-center justify-center text-4xl font-black text-white">
              {user.firstName?.[0] || 'A'}
            </div>
            <div className="absolute -bottom-2 -right-2 p-3 bg-primary-600 text-white rounded-2xl shadow-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mb-4 text-white">
            <h2 className="text-3xl font-black tracking-tighter">{user.firstName} {user.lastName}</h2>
            <p className="text-xs text-primary-200 font-black uppercase tracking-widest mt-1">
              {user.role.replace(/_/g, ' ')} • System Administrator
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Administrative Information</h3>
            <div className="space-y-6">
              <ProfileItem icon={<Mail />} label="Secure Email" value={user.email} />
              <ProfileItem icon={<ShieldAlert />} label="Access Level" value={user.role === UserRole.SUPER_ADMIN ? 'Full Platform Control' : 'Standard Oversight'} />
              <ProfileItem icon={<Database />} label="Data Node" value="Yeeza-Jos-Main-01" />
            </div>
          </div>

          <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Security & Privacy</h3>
            <div className="space-y-4">
              <PreferenceToggle label="Advanced Logging" description="Track all user interactions for security auditing." defaultChecked />
              <PreferenceToggle label="IP Access Lock" description="Restrict dashboard access to recognized IP addresses." />
              <PreferenceToggle label="Email Security Alerts" description="Notify on any role change or system update." defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-brand-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Credential Management</h3>
            <div className="space-y-4">
              <button className="w-full py-4 px-6 bg-gray-50 dark:bg-white/5 rounded-2xl text-xs font-black text-gray-600 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition-all text-left flex justify-between items-center group">
                Rotate Master Key <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full py-4 px-6 bg-gray-50 dark:bg-white/5 rounded-2xl text-xs font-black text-gray-600 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition-all text-left flex justify-between items-center group">
                2FA Setup <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded ml-auto">Active</span>
              </button>
            </div>
          </div>

          <div className="bg-brand-900 p-10 rounded-[3rem] text-white shadow-xl">
             <h4 className="text-sm font-black uppercase tracking-widest text-primary-400 mb-4">System Identity</h4>
             <p className="text-xs font-bold leading-relaxed opacity-60 mb-6">You are operating as a verified administrator of the Yeeza Agro and Farms network. All actions are logged under Plateau State digital compliance guidelines.</p>
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest">Identity Verified</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400">
      {/* Fix: cast to React.ReactElement<any> to avoid TS error with className in cloneElement */}
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const PreferenceToggle: React.FC<{ label: string, description: string, defaultChecked?: boolean }> = ({ label, description, defaultChecked }) => (
  <div className="flex items-center justify-between p-6 bg-gray-50/50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5">
    <div>
      <p className="text-sm font-black text-gray-900 dark:text-white mb-1">{label}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-brand-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
    </label>
  </div>
);

// --- Sub-Views ---

const AdminOverview: React.FC = () => {
  const growthData = [
    { name: 'Jan', users: 120, revenue: 450000 },
    { name: 'Feb', users: 180, revenue: 780000 },
    { name: 'Mar', users: 210, revenue: 1100000 },
    { name: 'Apr', users: 340, revenue: 1540000 },
    { name: 'May', users: 480, revenue: 2320000 },
    { name: 'Jun', users: 550, revenue: 2900000 },
  ];

  const metrics = [
    { title: 'Total Farmers', value: '842', icon: <Users className="w-5 h-5 text-primary-600" />, trend: { value: 14, isPositive: true } },
    { title: 'Verified Cold Rooms', value: '18', icon: <Store className="w-5 h-5 text-secondary-600" />, trend: { value: 2, isPositive: true } },
    { title: 'Active Bookings', value: '156', icon: <Calendar className="w-5 h-5 text-accent-600" /> },
    { title: 'System Revenue', value: '₦4.8M', icon: <TrendingUp className="w-5 h-5 text-green-600" />, trend: { value: 28, isPositive: true } },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => <MetricCard key={idx} {...m} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-brand-800 p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">Platform Growth</h3>
            <select className="bg-gray-50 dark:bg-white/5 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none dark:text-white">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis hide />
                <ChartTooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', background: '#0f172a', color: '#fff'}}
                  formatter={(value) => `₦${Number(value).toLocaleString()}`}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2E7D32" strokeWidth={5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-brand-800 p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-3 text-accent-500" /> Critical Alerts
            </h3>
            <div className="space-y-4">
              <AlertItem title="Facility Offline" desc="Bukuru Cold Hub sensor inactive for 2h." type="error" />
              <AlertItem title="Pending Verification" desc="5 new Cold Room applications waiting." type="warning" />
              <AlertItem title="Logistics Delay" desc="Musa's pickup rescheduled due to rain." type="info" />
            </div>
          </div>
          
          <div className="bg-brand-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">System Pulse</p>
            <p className="text-3xl font-black mb-4 tracking-tighter text-white">99.8% Online</p>
            <div className="flex gap-1.5">
              {[1, 1, 1, 1, 1, 1, 1, 1, 0, 1].map((status, i) => (
                <div key={i} className={`h-8 w-1.5 rounded-full ${status ? 'bg-primary-400' : 'bg-red-400'}`} />
              ))}
            </div>
            <Activity className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<UserRole | 'ALL'>('ALL');

  const mockUsers = [
    { id: '1', name: 'John Musa', role: UserRole.FARMER, email: 'john@farm.com', status: UserStatus.ACTIVE, location: 'Jos North' },
    { id: '2', name: 'Bukuru Cold Hub', role: UserRole.COLD_ROOM_OWNER, email: 'owner@coldhub.com', status: UserStatus.ACTIVE, location: 'Jos South' },
    { id: '3', name: 'Sarah Bitrus', role: UserRole.FARMER, email: 'sarah@harvest.ng', status: UserStatus.PENDING, location: 'Barkin Ladi' },
    { id: '4', name: 'Zaria Road Storage', role: UserRole.COLD_ROOM_OWNER, email: 'zaria@storage.com', status: UserStatus.SUSPENDED, location: 'Jos North' },
  ];

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(u => 
      (filter === 'ALL' || u.role === filter) &&
      (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, filter]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">System Directory</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Manage platform permissions for {filteredUsers.length} members.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name..." 
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-brand-800 border-none rounded-2xl text-sm font-bold outline-none ring-1 ring-gray-100 dark:ring-white/5 focus:ring-4 focus:ring-primary-50 transition-all dark:text-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-white dark:bg-brand-800 border-none ring-1 ring-gray-100 dark:ring-white/5 rounded-2xl px-5 py-3 text-sm font-bold outline-none dark:text-white shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="ALL">All Roles</option>
            <option value={UserRole.FARMER}>Farmers</option>
            <option value={UserRole.COLD_ROOM_OWNER}>Facility Owners</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-brand-800 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Member</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center">
                    <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 flex items-center justify-center font-black mr-4">{user.name[0]}</div>
                    <div>
                      <p className="text-sm font-black text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                    user.role === UserRole.FARMER ? 'text-primary-600 bg-primary-50 dark:bg-primary-500/10' : 'text-secondary-600 bg-secondary-50 dark:bg-secondary-500/10'
                  }`}>
                    {user.role.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-2">
                  <MapPin className="w-3 h-3" /> {user.location}
                </td>
                <td className="px-8 py-6">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    user.status === UserStatus.ACTIVE ? 'bg-green-100 text-green-700' :
                    user.status === UserStatus.PENDING ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <Tooltip text="View Full Activity Ledger"><button className="p-2.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-white/5 rounded-xl transition-all"><ExternalLink className="w-4 h-4" /></button></Tooltip>
                    <Tooltip text="Restrict Access"><button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-white/5 rounded-xl transition-all"><Lock className="w-4 h-4" /></button></Tooltip>
                    <button className="p-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VerificationQueue: React.FC = () => {
  const pendingApps = [
    { id: '1', name: 'Plateau Cold Chain Ltd', owner: 'Musa Ibrahim', type: 'Industrial', capacity: '5,000m³', date: '2024-10-22' },
    { id: '2', name: 'Bukuru Cooling Point', owner: 'Grace Bitrus', type: 'Medium', capacity: '1,200m³', date: '2024-10-24' },
    { id: '3', name: 'Barkin Ladi Rural Hub', owner: 'Luka Pam', type: 'Solar-Small', capacity: '400m³', date: '2024-10-25' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Onboarding Requests</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Review and verify new cold storage partnerships.</p>
        </div>
        <div className="px-4 py-2 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-white/5 rounded-2xl text-orange-700 dark:text-orange-500 text-xs font-black uppercase tracking-widest">
          {pendingApps.length} Requests Pending
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pendingApps.map(app => (
          <div key={app.id} className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex justify-between items-start mb-10">
              <div className="w-16 h-16 bg-secondary-50 dark:bg-secondary-500/10 rounded-3xl flex items-center justify-center text-secondary-600 transition-transform group-hover:scale-110">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{app.date}</span>
            </div>
            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">{app.name}</h4>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">Owner: {app.owner}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Type</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{app.type}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Volume</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{app.capacity}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-700 flex items-center justify-center gap-2 transition-all">
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
              <button className="flex-1 py-4 border border-red-100 dark:border-white/5 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition-all">
                <XCircle className="w-4 h-4" /> Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemSettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-primary-600" /> Global System Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Critical system parameters and role definitions restricted to Super Admins.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3"><Globe className="w-5 h-5 text-secondary-600" /> API & Integration Endpoints</h3>
          <div className="space-y-6">
            <SettingRow label="Platform Maintenance Mode" icon={<ToggleLeft className="text-gray-300" />} />
            <SettingRow label="Paystack Webhook Verification" active />
            <SettingRow label="Weather API Synchronization" active />
            <SettingRow label="SMS Gateway (Plateau Network)" active />
          </div>
        </div>
        <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3"><Database className="w-5 h-5 text-primary-600" /> Data Retention Policies</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">Log Level Retention</span>
              <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">90 Days</span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">Booking History Archive</span>
              <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">7 Years</span>
            </div>
          </div>
          <button className="w-full mt-10 py-4 border-2 border-dashed border-red-100 dark:border-white/5 text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-widest">Purge System Cache</button>
        </div>
      </div>

      <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3"><SettingsIcon className="w-5 h-5 text-accent-500" /> Commission & Fee Structures</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-primary-50 dark:bg-primary-500/10 rounded-[2rem]">
            <p className="text-[10px] font-black text-primary-600 uppercase mb-2">Farmer Fee</p>
            <p className="text-3xl font-black text-primary-900 dark:text-white">2.5%</p>
          </div>
          <div className="p-6 bg-secondary-50 dark:bg-secondary-500/10 rounded-[2rem]">
            <p className="text-[10px] font-black text-secondary-600 uppercase mb-2">Facility Take</p>
            <p className="text-3xl font-black text-secondary-900 dark:text-white">5.0%</p>
          </div>
          <div className="p-6 bg-orange-50 dark:bg-orange-500/10 rounded-[2rem]">
            <p className="text-[10px] font-black text-orange-600 uppercase mb-2">Referral Reward</p>
            <p className="text-3xl font-black text-orange-900 dark:text-white">₦5,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingRow: React.FC<{ label: string, icon?: React.ReactNode, active?: boolean }> = ({ label, icon, active }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-white/5">
    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{label}</span>
    {active ? (
      <span className="text-[10px] font-black text-green-600 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-lg uppercase">Enabled</span>
    ) : (
      icon || <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-lg uppercase tracking-widest">Inactive</span>
    )}
  </div>
);

// --- Helpers ---

const AlertItem: React.FC<{ title: string, desc: string, type: 'error' | 'warning' | 'info' }> = ({ title, desc, type }) => {
  const colors = {
    error: 'text-red-600 bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-white/5',
    warning: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-white/5',
    info: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-white/5'
  };
  return (
    <div className={`p-5 rounded-2xl border ${colors[type]} transition-transform hover:scale-[1.02] cursor-default`}>
      <p className="text-xs font-black uppercase tracking-tight">{title}</p>
      <p className="text-xs opacity-70 mt-1 font-medium leading-relaxed">{desc}</p>
    </div>
  );
};

// --- Dashboard Wrapper ---

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="animate-fadeIn">
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="verifications" element={<VerificationQueue />} />
        <Route path="analytics" element={<div className="p-20 bg-white dark:bg-brand-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/5 text-center text-gray-400 font-black uppercase tracking-[0.2em]">Extended Analytics Module</div>} />
        <Route path="system" element={user.role === UserRole.SUPER_ADMIN ? <SystemSettings /> : <Navigate to="/dashboard/admin" />} />
        <Route path="profile" element={<UserProfile user={user} />} />
        <Route path="settings" element={<div className="p-20 bg-white dark:bg-brand-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/5 text-center text-gray-400 font-black uppercase tracking-[0.2em]">Global System Parameters</div>} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
