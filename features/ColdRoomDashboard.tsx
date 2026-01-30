
import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  BarChart as BarChartIcon, 
  Thermometer, 
  Percent, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Package,
  Calendar,
  Settings,
  ChevronRight,
  MapPin,
  CreditCard,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Search,
  Star,
  X,
  Mail,
  Phone,
  Camera,
  Edit2,
  Building,
  Map as MapIcon,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User, MetricCardProps, Booking, ColdRoom } from '../types';

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
          alt="Jos Landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 flex items-end gap-6">
          <div className="relative group/avatar">
            <div className="w-32 h-32 rounded-[2.5rem] bg-primary-600 border-4 border-white dark:border-brand-900 shadow-2xl flex items-center justify-center text-4xl font-black text-white overflow-hidden">
              {user.firstName?.[0] || 'C'}
            </div>
            <button className="absolute bottom-0 right-0 p-3 bg-secondary-600 text-white rounded-2xl shadow-xl hover:bg-secondary-700 transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-4 text-white">
            <h2 className="text-3xl font-black tracking-tighter">{user.firstName} {user.lastName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified Partner
              </span>
              <span className="text-xs text-white/70 font-bold tracking-tight">Facility Owner • Jos South</span>
            </div>
          </div>
        </div>
        <button className="absolute top-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
          <Edit2 className="w-4 h-4" /> Edit Account
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Business Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <ProfileItem icon={<Building />} label="Facility Brand" value="Bukuru Cold Hub" />
                <ProfileItem icon={<Mail />} label="Business Email" value={user.email} />
                <ProfileItem icon={<Phone />} label="Phone Line" value={user.phone || '0805 111 2222'} />
              </div>
              <div className="space-y-6">
                <ProfileItem icon={<MapIcon />} label="Address" value="Old Airport Junction, Bukuru" />
                <ProfileItem icon={<ShieldCheck />} label="Compliance" value="NAFDAC Verified • 2024" />
                <ProfileItem icon={<Calendar />} label="Contract Term" value="Annual Membership" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">System Configuration</h3>
            <div className="space-y-4">
              <PreferenceToggle label="Automated Payouts" description="Transfer monthly earnings directly to business account." defaultChecked />
              <PreferenceToggle label="Booking Auto-Approval" description="Accept smallholder requests automatically if space permits." />
              <PreferenceToggle label="Real-time Telemetry" description="Broadcast temperature data to the Yeeza network." defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-secondary-600 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-4">Partner Earnings</p>
               <p className="text-4xl font-black mb-2 tracking-tighter">₦845,000</p>
               <p className="text-xs font-bold text-secondary-100 mb-8 leading-relaxed">Revenue from 156 active storage cycles this month.</p>
               <button className="w-full py-5 bg-white text-secondary-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-secondary-50 transition-all shadow-xl">View Statement</button>
             </div>
             <TrendingUp className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
          </div>

          <div className="bg-white dark:bg-brand-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Security Access</h3>
            <div className="space-y-4">
              <button className="w-full py-4 px-6 border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left flex justify-between items-center group">
                Reset Credentials <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full py-4 px-6 border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left flex justify-between items-center group">
                Audit Trail <ChevronRight className="w-4 h-4" />
              </button>
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
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-brand-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600" />
    </label>
  </div>
);

// --- Sub-Views ---

const ColdRoomOverview: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  const COLORS = ['#1976D2', '#E2E8F0'];
  const capacityData = [{ name: 'Used', value: 75 }, { name: 'Available', value: 25 }];
  const occupancyData = [
    { day: 'Mon', occupancy: 65 }, { day: 'Tue', occupancy: 70 }, { day: 'Wed', occupancy: 85 },
    { day: 'Thu', occupancy: 80 }, { day: 'Fri', occupancy: 95 }, { day: 'Sat', occupancy: 90 }, { day: 'Sun', occupancy: 75 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Facility Vitality</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Bukuru Premium Cold Storage • FR-2921</p>
        </div>
        <div className="flex items-center bg-white dark:bg-brand-800 px-5 py-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
          <Thermometer className="w-5 h-5 text-blue-500 mr-3" />
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Ambience</p>
            <p className="text-sm font-black text-gray-900 dark:text-white">-18.4°C <span className="ml-2 text-[10px] text-green-500 font-black uppercase tracking-widest">Optimal</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Capacity" value="1,200 m³" icon={<Package className="w-5 h-5 text-blue-600" />} />
        <MetricCard title="Utilization" value="78%" icon={<Percent className="w-5 h-5 text-orange-600" />} trend={{ value: 4, isPositive: true }} />
        <MetricCard title="Active Farmers" value="24" icon={<Users className="w-5 h-5 text-primary-600" />} />
        <MetricCard title="Settled (Mo)" value="₦2.4M" icon={<TrendingUp className="w-5 h-5 text-green-600" />} trend={{ value: 18, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-brand-800 p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Daily Load Pattern</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', background: '#0f172a', color: '#fff'}} />
                <Bar dataKey="occupancy" fill="#1976D2" radius={[10, 10, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-brand-800 p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm flex flex-col items-center">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 w-full tracking-tight">Active Stock Distribution</h3>
          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={capacityData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={10} dataKey="value">
                  {capacityData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-4xl font-black text-gray-900 dark:text-white">75%</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Filled</p>
            </div>
          </div>
          <div className="mt-10 space-y-4 w-full">
            <div className="flex justify-between items-center p-4 bg-secondary-50 dark:bg-secondary-500/10 rounded-2xl border border-secondary-100 dark:border-white/5">
              <span className="text-xs font-black text-secondary-700 dark:text-secondary-400 uppercase tracking-widest">Occupied</span>
              <span className="text-lg font-black text-secondary-900 dark:text-white">900 m³</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Standby</span>
              <span className="text-lg font-black text-gray-900 dark:text-white">300 m³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingModal, setRatingModal] = useState<ColdRoom | null>(null);
  const [userRating, setUserRating] = useState(5);
  const mockRooms: ColdRoom[] = [
    { id: 'r1', facilityName: 'Jos North Premium Storage', address: '12 Zaria Road', city: 'Jos', totalCapacity: 1000, availableCapacity: 450, basePrice: 5000, rating: 4.8, features: ['Solar Backup', 'CCTV', 'Insured'] },
    { id: 'r2', facilityName: 'Bukuru Cold Hub', address: 'Old Airport Junction', city: 'Jos South', totalCapacity: 800, availableCapacity: 120, basePrice: 4500, rating: 4.5, features: ['Generator', 'Loading Bay'] },
    { id: 'r3', facilityName: 'Barkin Ladi Agro-Cool', address: 'Station Road', city: 'Barkin Ladi', totalCapacity: 500, availableCapacity: 300, basePrice: 3800, rating: 4.2, features: ['Near Market', 'Clean Certification'] },
  ];

  const filteredRooms = useMemo(() => {
    return mockRooms.filter(r => 
      r.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Market Intelligence</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Observe verified cold storage partners in the Plateau network.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search network..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-brand-800 border-none rounded-2xl shadow-sm outline-none text-sm font-bold transition-all dark:text-white ring-1 ring-gray-100 dark:ring-white/5" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white dark:bg-brand-800 p-8 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row gap-8 group">
            <div className="w-full sm:w-56 h-56 bg-gray-100 dark:bg-white/5 rounded-[2rem] overflow-hidden shrink-0">
              <img 
                src={`https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop&sig=${room.id}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={room.facilityName} 
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-[1.1]">{room.facilityName}</h3>
                <button 
                  onClick={() => setRatingModal(room)}
                  className="flex items-center text-accent-600 font-black text-sm bg-accent-50 dark:bg-accent-500/10 px-3 py-1 rounded-xl transition-transform hover:scale-105"
                >
                  <Star className="w-4 h-4 mr-1 fill-current" /> {room.rating}
                </button>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center mb-6"><MapPin className="w-4 h-4 mr-1" /> {room.city}, Plateau</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {room.features.map(f => (
                  <span key={f} className="text-[10px] font-black text-primary-600 bg-primary-50 dark:bg-primary-500/10 px-3 py-1 rounded-lg uppercase tracking-widest">{f}</span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50 dark:border-white/5">
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Network Rate</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">₦{room.basePrice.toLocaleString()}<span className="text-xs text-gray-400 font-bold">/day</span></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ratingModal && (
        <div className="fixed inset-0 z-[170] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-brand-800 rounded-[3rem] shadow-2xl max-sm w-full p-10 text-center animate-zoomIn">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Rate Partner</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Share your peer-to-peer feedback for {ratingModal.facilityName}.</p>
            <div className="flex justify-center gap-2 mb-10">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setUserRating(star)}>
                  <Star className={`w-10 h-10 ${star <= userRating ? 'fill-accent-500 text-accent-500' : 'text-gray-200 dark:text-white/10'}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setRatingModal(null)} className="flex-1 py-4 text-xs font-black uppercase text-gray-400">Close</button>
              <button onClick={() => setRatingModal(null)} className="flex-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-200">Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingManagement: React.FC<{ bookings: Booking[], onUpdate: any }> = ({ bookings, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');
  // Include 'paid' in pending tab as it's waiting for approval
  const filtered = bookings.filter(b => activeTab === 'pending' ? (b.status === 'pending' || b.status === 'paid') : b.status === 'approved');

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    onUpdate(bookings.map(b => b.id === id ? {...b, status} : b));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Booking Pipeline</h2>
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-2xl">
          <button onClick={() => setActiveTab('pending')} className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'pending' ? 'bg-white dark:bg-brand-800 shadow-sm text-secondary-600' : 'text-gray-400'}`}>Pending ({bookings.filter(b=>b.status==='pending' || b.status==='paid').length})</button>
          <button onClick={() => setActiveTab('active')} className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'active' ? 'bg-white dark:bg-brand-800 shadow-sm text-secondary-600' : 'text-gray-400'}`}>Active</button>
        </div>
      </div>
      <div className="bg-white dark:bg-brand-800 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50 dark:bg-white/5 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
            <tr><th className="px-8 py-5">Farmer</th><th className="px-8 py-5">Item Details</th><th className="px-8 py-5">Duration</th><th className="px-8 py-5">Revenue</th><th className="px-8 py-5">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 flex items-center justify-center font-black text-xs mr-3">{b.farmerName[0]}</div>
                    <div><p className="text-sm font-black text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{b.farmerName}</p><p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Verified Partner</p></div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-gray-600 dark:text-gray-400">{b.itemName}</td>
                <td className="px-8 py-6 text-sm font-bold text-gray-600 dark:text-gray-400">{b.durationDays} Days</td>
                <td className="px-8 py-6 text-lg font-black text-gray-900 dark:text-white">₦{b.totalPrice.toLocaleString()}</td>
                <td className="px-8 py-6">
                  {b.status === 'pending' || b.status === 'paid' ? (
                    <div className="flex flex-col gap-2">
                      {b.status === 'paid' && <span className="text-[10px] font-black text-green-600 uppercase mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Paid</span>}
                      <div className="flex space-x-3">
                        <button onClick={() => handleAction(b.id, 'approved')} className="px-5 py-2 bg-green-600 text-white text-[10px] font-black rounded-lg hover:bg-green-700 uppercase tracking-widest">Approve</button>
                        <button onClick={() => handleAction(b.id, 'rejected')} className="px-5 py-2 border border-red-100 dark:border-white/5 text-red-500 text-[10px] font-black rounded-lg hover:bg-red-50 uppercase tracking-widest">Reject</button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full" /> Active Storage</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No bookings found in this pipeline.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ColdRoomDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'b1', farmerName: 'Musa Ibrahim', facilityName: 'Bukuru Premium', itemName: 'Cattle (4 Units)', startDate: '2024-10-12', endDate: '2024-10-19', status: 'pending', totalPrice: 45000, durationDays: 7 },
    { id: 'b2', farmerName: 'Grace Bitrus', facilityName: 'Bukuru Premium', itemName: 'Broiler Batch #1', startDate: '2024-10-15', endDate: '2024-10-29', status: 'paid', totalPrice: 32000, durationDays: 14 },
  ]);

  return (
    <div className="animate-fadeIn">
      <Routes>
        <Route index element={<ColdRoomOverview bookings={bookings} />} />
        <Route path="facility" element={<div className="p-20 bg-white dark:bg-brand-800 rounded-[3rem] text-center text-gray-400 uppercase tracking-widest font-black text-xs border-2 border-dashed border-gray-100 dark:border-white/5">Facility Profile Module Locked</div>} />
        <Route path="bookings" element={<BookingManagement bookings={bookings} onUpdate={setBookings} />} />
        <Route path="market" element={<MarketFinder />} />
        <Route path="profile" element={<UserProfile user={user} />} />
        <Route path="finance" element={<div className="p-20 bg-white dark:bg-brand-800 rounded-[3rem] text-center text-gray-400 uppercase tracking-widest font-black text-xs border-2 border-dashed border-gray-100 dark:border-white/5">Finance Ledger Locked</div>} />
      </Routes>
    </div>
  );
};

export default ColdRoomDashboard;
