
import React, { useState, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  Plus, 
  Filter, 
  Grid, 
  List, 
  MoreVertical, 
  Tag, 
  HeartPulse, 
  Scale, 
  Calendar as CalendarIcon,
  ChevronRight,
  TrendingUp,
  Package,
  Store,
  DollarSign,
  MapPin,
  Search,
  Star,
  X,
  CreditCard,
  CheckCircle2,
  Info,
  History,
  ArrowUpDown,
  Mail,
  Phone,
  ShieldCheck,
  Edit2,
  Camera,
  LogOut,
  Map as MapIcon,
  Building,
  Sparkles,
  Lock,
  Loader2
} from 'lucide-react';
import { CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, AreaChart, Area } from 'recharts';
import { User, MetricCardProps, Livestock, ColdRoom, Booking } from '../types';
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

const PriceHistoryModal: React.FC<{ animal: Livestock, onClose: () => void }> = ({ animal, onClose }) => {
  const historyData = [
    { date: 'Sep 10', price: animal.price * 0.85 },
    { date: 'Sep 20', price: animal.price * 0.90 },
    { date: 'Oct 01', price: animal.price * 0.88 },
    { date: 'Oct 10', price: animal.price * 0.95 },
    { date: 'Oct 20', price: animal.price },
  ];

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-brand-800 rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-zoomIn border border-white/10">
        <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Market Value History</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{animal.type} - {animal.breed}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"><X className="w-7 h-7" /></button>
        </div>
        <div className="p-10">
          <div className="h-64 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis hide />
                <ChartTooltip contentStyle={{borderRadius: '16px', border: 'none', background: '#0f172a', color: '#fff'}} />
                <Area type="monotone" dataKey="price" stroke="#2E7D32" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Low</p>
              <p className="text-lg font-black text-gray-900 dark:text-white">₦{(animal.price * 0.85).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">High</p>
              <p className="text-lg font-black text-gray-900 dark:text-white">₦{animal.price.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl border border-primary-100 dark:border-white/5">
              <p className="text-[10px] font-black text-primary-600 uppercase mb-1">Growth</p>
              <p className="text-lg font-black text-primary-700 dark:text-primary-400">+15.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentModal: React.FC<{ booking: Booking, onClose: () => void, onSuccess: (id: string) => void }> = ({ booking, onClose, onSuccess }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  
  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess(booking.id);
        onClose();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-900/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-white dark:bg-brand-800 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 animate-zoomIn">
        {/* Paystack Style Header */}
        <div className="bg-[#f1f4f9] dark:bg-brand-900/50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-black">Y</div>
             <div>
               <p className="text-xs font-black text-brand-500 dark:text-white uppercase tracking-widest">Yeeza Farms</p>
               <p className="text-[10px] text-gray-400 font-bold">Secure Checkout</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-brand-500"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-8">
          {step === 'details' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Amount Due</p>
                <h3 className="text-4xl font-black text-brand-800 dark:text-white">₦{booking.totalPrice.toLocaleString()}</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Card Number</label>
                  <div className="relative">
                    <input disabled value="4242 4242 4242 4242" className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-bold text-sm outline-none" />
                    <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiry Date</label>
                    <input disabled value="12 / 26" className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-bold text-sm outline-none" />
                  </div>
                   <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVV</label>
                    <input disabled value="***" className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl font-bold text-sm outline-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handlePay}
                  className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-primary-200 dark:shadow-none hover:bg-primary-700 transition-all flex items-center justify-center gap-3"
                >
                  <Lock className="w-4 h-4" /> Pay ₦{booking.totalPrice.toLocaleString()}
                </button>
                <p className="text-center text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-tighter">Your payment is secured with Paystack Escrow Technology</p>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-20 flex flex-col items-center justify-center animate-fadeIn text-center">
               <Loader2 className="w-16 h-16 text-primary-500 animate-spin mb-6" />
               <h4 className="text-xl font-black text-brand-800 dark:text-white mb-2">Authorizing Payment...</h4>
               <p className="text-gray-400 text-sm font-medium">Please do not refresh this page.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-16 flex flex-col items-center justify-center animate-fadeIn text-center">
               <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mb-8">
                 <CheckCircle2 className="w-12 h-12" />
               </div>
               <h4 className="text-3xl font-black text-brand-800 dark:text-white mb-2">Payment Success!</h4>
               <p className="text-gray-500 dark:text-gray-400 font-medium mb-12">Booking for {booking.itemName} is now secured.</p>
               <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 animate-[progress_2s_linear]" />
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getLivestockImage = (type: string, id: string) => {
  const images: Record<string, string> = {
    Cattle: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30',
    Goat: 'https://images.unsplash.com/photo-1524024973431-2ad916746881',
    Sheep: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73',
    Poultry: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7',
  };
  const base = images[type] || images['Cattle'];
  return `${base}?q=80&w=600&auto=format&fit=crop&sig=${id}`;
};

const LivestockCard: React.FC<{ animal: Livestock, onShowHistory: (a: Livestock) => void }> = ({ animal, onShowHistory }) => (
  <div className="bg-white dark:bg-brand-800 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div className="h-48 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
      <img 
        src={getLivestockImage(animal.type, animal.id)} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        alt={animal.type} 
      />
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg ${
          animal.status === 'in_storage' ? 'bg-secondary-500 text-white' : 
          animal.status === 'sold' ? 'bg-brand-500 text-white' : 'bg-primary-600 text-white'
        }`}>
          {animal.status.replace('_', ' ')}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-black text-gray-900 dark:text-white">{animal.type}</h4>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{animal.breed}</p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Tooltip text="Measured live weight in Kilograms. Accuracy +/- 0.5kg.">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-white/5 rounded-2xl w-full">
            <Scale className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-xs font-black text-gray-700 dark:text-gray-300">{animal.weight}kg</span>
          </div>
        </Tooltip>
        <Tooltip text="Verified veterinary status including recent vaccinations.">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-white/5 rounded-2xl w-full">
            <HeartPulse className="w-4 h-4 mr-2 text-red-500" />
            <span className="text-xs font-black text-gray-700 dark:text-gray-300">{animal.healthStatus}</span>
          </div>
        </Tooltip>
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-white/5">
        <span className="text-2xl font-black text-primary-700 dark:text-primary-500">₦{animal.price.toLocaleString()}</span>
        <button 
          onClick={() => onShowHistory(animal)}
          className="p-2.5 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-all"
        >
          <History className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// --- Profile View ---

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cover and Avatar Section */}
      <div className="relative h-64 w-full rounded-[3rem] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1596272871239-18a66f773f91?q=80&w=1200&auto=format&fit=crop" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          alt="Plateau Landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 flex items-end gap-6">
          <div className="relative group/avatar">
            <div className="w-32 h-32 rounded-[2.5rem] bg-secondary-500 border-4 border-white dark:border-brand-900 shadow-2xl flex items-center justify-center text-4xl font-black text-white overflow-hidden">
              {user.firstName?.[0] || 'A'}
            </div>
            <button className="absolute bottom-0 right-0 p-3 bg-primary-600 text-white rounded-2xl shadow-xl hover:bg-primary-700 transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-black text-white tracking-tighter">{user.firstName} {user.lastName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified Farmer
              </span>
              <span className="text-xs text-white/70 font-bold tracking-tight">LGA: Jos North, Plateau</span>
            </div>
          </div>
        </div>
        <button className="absolute top-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
          <Edit2 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Account Intelligence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <ProfileItem icon={<Mail />} label="Email Address" value={user.email} />
                <ProfileItem icon={<Phone />} label="Registered Mobile" value={user.phone || '+234 800 123 4567'} />
                <ProfileItem icon={<Building />} label="Farm Entity" value="Bitrus Livestock Co." />
              </div>
              <div className="space-y-6">
                <ProfileItem icon={<MapIcon />} label="Base Operations" value="12 Zaria Road, Jos" />
                <ProfileItem icon={<CreditCard />} label="Settlement Bank" value="Zenith Bank • ****6789" />
                <ProfileItem icon={<CalendarIcon />} label="Member Since" value="October 2023" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-800 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Platform Preferences</h3>
            <div className="space-y-4">
              <PreferenceToggle label="Email Notifications" description="Receive weekly market reports and booking alerts." defaultChecked />
              <PreferenceToggle label="SMS Gateway Updates" description="Get real-time SMS for cold room temperature variations." defaultChecked />
              <PreferenceToggle label="Public Network Visibility" description="Allow other farmers to see your verified inventory lists." />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-primary-600 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-4">Escrow Status</p>
               <p className="text-4xl font-black mb-2 tracking-tighter">₦142,500</p>
               <p className="text-xs font-bold text-primary-100 mb-8 leading-relaxed">Available for immediate withdrawal to your linked Plateau account.</p>
               <button className="w-full py-5 bg-white text-primary-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary-50 transition-all shadow-xl">Initiate Payout</button>
             </div>
             <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
          </div>

          <div className="bg-white dark:bg-brand-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Security Perimeter</h3>
            <div className="space-y-4">
              <button className="w-full py-4 px-6 border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left flex justify-between items-center group">
                Rotate Security Key <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full py-4 px-6 border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left flex justify-between items-center group">
                2FA Verification <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded">Active</span>
              </button>
              <button className="w-full py-4 px-6 border border-red-50 dark:border-red-500/10 rounded-2xl text-xs font-black text-red-500 uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-500/5 transition-all text-left flex justify-between items-center group">
                Delete Platform Data <ChevronRight className="w-4 h-4" />
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

// --- Main Views ---

const FarmerOverview: React.FC<{ user: User, livestock: Livestock[], bookings: Booking[] }> = ({ user, livestock, bookings }) => {
  const revenueData = [
    { month: 'Jan', revenue: 120000 }, { month: 'Feb', revenue: 150000 }, { month: 'Mar', revenue: 110000 },
    { month: 'Apr', revenue: 180000 }, { month: 'May', revenue: 220000 }, { month: 'Jun', revenue: 200000 },
  ];

  const metrics = [
    { title: 'Total Units', value: livestock.length, icon: <Package className="w-5 h-5 text-secondary-600" />, trend: { value: 12, isPositive: true } },
    { title: 'Currently Stored', value: livestock.filter(l => l.status === 'in_storage').length, icon: <Store className="w-5 h-5 text-primary-600" /> },
    { title: 'Pending Storage', value: bookings.filter(b => b.status === 'pending').length, icon: <CalendarIcon className="w-5 h-5 text-accent-600" /> },
    { title: 'Platform Payouts', value: '₦420k', icon: <DollarSign className="w-5 h-5 text-green-600" />, trend: { value: 24, isPositive: true } },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Welcome Back, {user.firstName}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Monitoring your livestock performance across Plateau State.</p>
        </div>
        <Link to="livestock" className="px-6 py-4 bg-primary-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-200 dark:shadow-none flex items-center gap-3"><Plus /> Add New Unit</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => <MetricCard key={idx} {...m} />)}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-brand-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-10">Revenue Projections</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis hide />
                <ChartTooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', background: '#1e293b', color: '#fff'}} />
                <Line type="monotone" dataKey="revenue" stroke="#2E7D32" strokeWidth={5} dot={{ r: 6, fill: '#2E7D32', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 9 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-brand-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">Asset Liquidity</h3>
          <div className="space-y-6 flex-1">
             <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Market Valuation</p>
               <p className="text-3xl font-black text-gray-900 dark:text-white">₦1,240,000</p>
               <p className="text-[10px] text-primary-600 font-bold mt-1 uppercase">Ready for settlement</p>
             </div>
             <div className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-white/5">
               <span className="text-sm font-bold text-gray-500">Inventory Verified</span>
               <span className="text-sm font-black text-gray-900 dark:text-white">100%</span>
             </div>
             <div className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-white/5">
               <span className="text-sm font-bold text-gray-500">Storage Coverage</span>
               <span className="text-sm font-black text-gray-900 dark:text-white">Fully Active</span>
             </div>
          </div>
          <button className="w-full mt-8 py-5 bg-secondary-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary-700 transition-all">
            System Ledger
          </button>
        </div>
      </div>
    </div>
  );
};

const LivestockManagement: React.FC<{ livestock: Livestock[], setLivestock: any }> = ({ livestock, setLivestock }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('id');
  const [historyAnimal, setHistoryAnimal] = useState<Livestock | null>(null);
  const [newStock, setNewStock] = useState({ type: 'Cattle', breed: '', weight: 0, price: 0 });

  const processedLivestock = useMemo(() => {
    let result = [...livestock];
    if (searchTerm) {
      result = result.filter(l => 
        l.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(l => l.status === statusFilter);
    }
    result.sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'weight') return b.weight - a.weight;
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });
    return result;
  }, [livestock, searchTerm, statusFilter, sortBy]);

  const handleAddStock = () => {
    const stock: Livestock = {
      id: Math.random().toString(36).substr(2, 9),
      type: newStock.type,
      breed: newStock.breed || 'Standard',
      weight: newStock.weight,
      healthStatus: 'A+',
      price: newStock.price,
      quantity: 1,
      status: 'available'
    };
    setLivestock([stock, ...livestock]);
    setShowModal(false);
    setNewStock({ type: 'Cattle', breed: '', weight: 0, price: 0 });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Active Inventory</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Managing {processedLivestock.length} units in the field.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-brand-800 border-none rounded-xl text-sm font-bold outline-none ring-1 ring-gray-100 dark:ring-white/5 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => setShowModal(true)} className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all">
            <Plus className="w-4 h-4 mr-2" /> New Entry
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-brand-800 p-4 rounded-3xl border border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Filter Status:</span>
          {['all', 'available', 'sold', 'in_storage'].map(status => (
            <button 
              key={status} 
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                statusFilter === status ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Sort By:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 dark:bg-white/5 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none dark:text-white"
          >
            <option value="id">Recent</option>
            <option value="price">Price (High-Low)</option>
            <option value="weight">Weight</option>
            <option value="type">Species Type</option>
          </select>
          <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-xl">
            <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white dark:bg-brand-800 shadow-sm text-primary-600' : 'text-gray-400'}`}><Grid className="w-4 h-4" /></button>
            <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white dark:bg-brand-800 shadow-sm text-primary-600' : 'text-gray-400'}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {processedLivestock.length === 0 ? (
        <div className="p-24 bg-white dark:bg-brand-800 rounded-[3rem] text-center border-2 border-dashed border-gray-100 dark:border-white/5">
          <Search className="w-16 h-16 text-gray-200 dark:text-white/10 mx-auto mb-6" />
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No matching units</h3>
          <p className="text-gray-400 font-medium">Clear filters to see your full stock.</p>
        </div>
      ) : (
        <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : ""}>
          {view === 'grid' ? (
            processedLivestock.map(animal => <LivestockCard key={animal.id} animal={animal} onShowHistory={setHistoryAnimal} />)
          ) : (
            <div className="bg-white dark:bg-brand-800 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-50 dark:bg-white/5 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
                  <tr><th className="px-8 py-5">Livestock Unit</th><th className="px-8 py-5">Status</th><th className="px-8 py-5">Attributes</th><th className="px-8 py-5">Valuation</th><th className="px-8 py-5"></th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {processedLivestock.map(animal => (
                    <tr key={animal.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform"><Tag className="w-6 h-6 text-primary-600" /></div>
                          <div><p className="text-sm font-black text-gray-900 dark:text-white">{animal.type}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{animal.breed}</p></div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                          animal.status === 'in_storage' ? 'bg-secondary-100 text-secondary-700' : 
                          animal.status === 'sold' ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'
                        }`}>{animal.status.replace('_', ' ')}</span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-600 dark:text-gray-400">{animal.weight}kg • Healthy</td>
                      <td className="px-8 py-6 text-lg font-black text-gray-900 dark:text-white">₦{animal.price.toLocaleString()}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setHistoryAnimal(animal)} className="p-2 text-gray-400 hover:text-primary-600"><History className="w-4 h-4" /></button>
                          <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {historyAnimal && <PriceHistoryModal animal={historyAnimal} onClose={() => setHistoryAnimal(null)} />}

      {showModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-brand-800 rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden animate-zoomIn border border-white/10">
            <div className="p-10 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Inventory Onboarding</h3>
              <button onClick={() => setShowModal(false)} className="p-3 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all"><X className="w-8 h-8" /></button>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</label>
                  <select value={newStock.type} onChange={e => setNewStock({...newStock, type: e.target.value})} className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50 dark:text-white">
                    <option>Cattle</option><option>Goat</option><option>Sheep</option><option>Poultry</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Breed</label>
                  <input type="text" value={newStock.breed} onChange={e => setNewStock({...newStock, breed: e.target.value})} className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50 dark:text-white" placeholder="Brahman" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weight (kg)</label>
                  <input type="number" value={newStock.weight} onChange={e => setNewStock({...newStock, weight: Number(e.target.value)})} className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50 dark:text-white" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Payout (₦)</label>
                  <input type="number" value={newStock.price} onChange={e => setNewStock({...newStock, price: Number(e.target.value)})} className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50 dark:text-white" />
                </div>
              </div>
              <button onClick={handleAddStock} className="w-full py-6 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-primary-200 dark:shadow-none mt-4 hover:bg-primary-700 transition-all">Publish to Network</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ColdRoomFinder: React.FC<{ onBook: (room: ColdRoom) => void }> = ({ onBook }) => {
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

  const handleSubmitRating = () => {
    setRatingModal(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Storage Partners</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Browse verified cold storage facilities in Plateau State.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Filter by city or facility..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-brand-800 border-none rounded-2xl focus:ring-4 focus:ring-primary-50 dark:focus:ring-primary-500/20 shadow-sm outline-none text-sm font-bold transition-all dark:text-white ring-1 ring-gray-100 dark:ring-white/5" 
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
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Base Rate</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">₦{room.basePrice.toLocaleString()}<span className="text-xs text-gray-400 font-bold">/day</span></p>
                </div>
                <button onClick={() => onBook(room)} className="px-8 py-3 bg-secondary-600 text-white text-xs font-black rounded-xl hover:bg-secondary-700 shadow-xl shadow-secondary-100 dark:shadow-none transition-all uppercase tracking-widest">Reserve Space</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ratingModal && (
        <div className="fixed inset-0 z-[170] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-brand-800 rounded-[3rem] shadow-2xl max-w-sm w-full p-10 text-center animate-zoomIn">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Rate This Facility</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">How was your storage experience at {ratingModal.facilityName}?</p>
            <div className="flex justify-center gap-2 mb-10">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setUserRating(star)}>
                  <Star className={`w-10 h-10 ${star <= userRating ? 'fill-accent-500 text-accent-500' : 'text-gray-200 dark:text-white/10'}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setRatingModal(null)} className="flex-1 py-4 text-xs font-black uppercase text-gray-400">Cancel</button>
              <button onClick={handleSubmitRating} className="flex-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Submit Rating</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Dashboard Wrapper ---

const FarmerDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [livestock, setLivestock] = useState<Livestock[]>([
    { id: '1', type: 'Cattle', breed: 'Brahman', weight: 450, healthStatus: 'A+', price: 250000, quantity: 4, status: 'available' },
    { id: '2', type: 'Goat', breed: 'Boer', weight: 35, healthStatus: 'B+', price: 45000, quantity: 12, status: 'in_storage' },
  ]);
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'b1', farmerName: `${user.firstName} ${user.lastName}`, facilityName: 'Jos North Premium', itemName: '50 Broilers', startDate: '2024-11-01', endDate: '2024-11-08', status: 'pending', totalPrice: 35000, durationDays: 7 }
  ]);
  const [selectedRoom, setSelectedRoom] = useState<ColdRoom | null>(null);
  const [bookingDetails, setBookingDetails] = useState({ itemName: '', duration: 7 });
  const [paymentBooking, setPaymentBooking] = useState<Booking | null>(null);

  const handleBookingSubmit = () => {
    if (!selectedRoom) return;
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      farmerName: `${user.firstName} ${user.lastName}`,
      facilityName: selectedRoom.facilityName,
      itemName: bookingDetails.itemName || 'Mixed Stock',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + bookingDetails.duration * 86400000).toISOString().split('T')[0],
      status: 'pending',
      totalPrice: selectedRoom.basePrice * bookingDetails.duration,
      durationDays: bookingDetails.duration
    };
    setBookings([newBooking, ...bookings]);
    setSelectedRoom(null);
  };

  const handlePaymentSuccess = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'paid' } : b));
  };

  return (
    <div className="animate-fadeIn">
      <Routes>
        <Route index element={<FarmerOverview user={user} livestock={livestock} bookings={bookings} />} />
        <Route path="livestock" element={<LivestockManagement livestock={livestock} setLivestock={setLivestock} />} />
        <Route path="bookings" element={
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Reservations</h2>
            <div className="bg-white dark:bg-brand-800 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-50 dark:bg-white/5 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
                  <tr><th className="px-8 py-5">Partner Facility</th><th className="px-8 py-5">Stock Details</th><th className="px-8 py-5">Cycle Period</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Settlement</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6 font-black text-gray-900 dark:text-white">{b.facilityName}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-600 dark:text-gray-400">{b.itemName}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-500 dark:text-gray-400">{b.startDate} → {b.endDate}</td>
                      <td className="px-8 py-6">
                        {b.status === 'pending' ? (
                          <button 
                            onClick={() => setPaymentBooking(b)}
                            className="px-4 py-2 bg-primary-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-primary-100 hover:bg-primary-700 transition-all flex items-center gap-2"
                          >
                            <CreditCard className="w-3.5 h-3.5" /> Pay Now
                          </button>
                        ) : (
                          <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                            b.status === 'paid' ? 'bg-green-100 text-green-700' : 
                            b.status === 'approved' ? 'bg-blue-100 text-blue-700' : 
                            'bg-red-100 text-red-700'
                          }`}>{b.status}</span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-lg font-black text-gray-900 dark:text-white text-right">₦{b.totalPrice.toLocaleString()}</td>
                    </tr>
                  ))}
                  {bookings.length === 0 && <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No active reservations found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        } />
        <Route path="cold-rooms" element={<ColdRoomFinder onBook={setSelectedRoom} />} />
        <Route path="profile" element={<UserProfile user={user} />} />
      </Routes>

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-brand-900/80 backdrop-blur-xl animate-fadeIn">
          <div className="bg-white dark:bg-brand-800 rounded-[3.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-zoomIn border border-white/20">
            <div className="p-10 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Space Reservation</h3>
                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mt-1">{selectedRoom.facilityName}</p>
              </div>
              <button onClick={() => setSelectedRoom(null)} className="p-3 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all"><X className="w-8 h-8" /></button>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory Label</label>
                <input type="text" placeholder="e.g. 50 Broilers" onChange={e => setBookingDetails({...bookingDetails, itemName: e.target.value})} className="w-full px-6 py-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none font-bold text-base focus:ring-4 focus:ring-primary-50 dark:text-white" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration (Days)</label>
                   <span className="text-2xl font-black text-gray-900 dark:text-white">{bookingDetails.duration}</span>
                </div>
                <input type="range" min="3" max="60" value={bookingDetails.duration} onChange={e => setBookingDetails({...bookingDetails, duration: Number(e.target.value)})} className="w-full h-3 bg-gray-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>
              <div className="p-8 bg-secondary-50 dark:bg-secondary-500/10 rounded-3xl flex items-center justify-between border-2 border-secondary-100 dark:border-white/5">
                <span className="text-xs font-black text-secondary-700 dark:text-secondary-400 uppercase tracking-widest">Total Fee</span>
                <span className="text-3xl font-black text-secondary-900 dark:text-white">₦{(selectedRoom.basePrice * bookingDetails.duration).toLocaleString()}</span>
              </div>
              <button onClick={handleBookingSubmit} className="w-full py-6 bg-secondary-600 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-secondary-200 dark:shadow-none mt-4 hover:bg-secondary-700 transition-all flex items-center justify-center gap-3">
                <CreditCard className="w-6 h-6" /> Confirm Reserve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {paymentBooking && (
        <PaymentModal 
          booking={paymentBooking} 
          onClose={() => setPaymentBooking(null)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
    </div>
  );
};

export default FarmerDashboard;
