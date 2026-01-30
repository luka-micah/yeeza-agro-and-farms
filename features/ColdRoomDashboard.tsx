
import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User, MetricCardProps, Booking } from '../types';

// --- Components ---

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2.5 bg-gray-50 rounded-xl">{icon}</div>
      {trend && (
        <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${trend.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          <TrendingUp className={`w-3 h-3 mr-1 ${!trend.isPositive && 'rotate-180'}`} />
          {trend.value}%
        </div>
      )}
    </div>
    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facility Health</h2>
          <p className="text-gray-500">Bukuru Premium Cold Storage • FR-2921</p>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
          <Thermometer className="w-5 h-5 text-blue-500 mr-3" />
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Main Unit</p>
            <p className="text-sm font-black text-gray-900">-18.4°C <span className="ml-2 text-[10px] text-green-500 font-bold uppercase tracking-tighter">Optimal</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Capacity" value="1,200 m³" icon={<Package className="w-5 h-5 text-blue-600" />} />
        <MetricCard title="Utilization" value="78%" icon={<Percent className="w-5 h-5 text-orange-600" />} trend={{ value: 4, isPositive: true }} />
        <MetricCard title="Active Farmers" value="24" icon={<Users className="w-5 h-5 text-primary-600" />} />
        <MetricCard title="Monthly Revenue" value="₦2.4M" icon={<TrendingUp className="w-5 h-5 text-green-600" />} trend={{ value: 18, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Occupancy Velocity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{borderRadius: '16px', border: 'none', shadow: '2xl'}} />
                <Bar dataKey="occupancy" fill="#1976D2" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-900 mb-8 w-full">Inventory Split</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={capacityData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value">
                  {capacityData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-black text-gray-900">75%</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Filled</p>
            </div>
          </div>
          <div className="mt-8 space-y-3 w-full">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-2xl">
              <span className="text-xs font-bold text-blue-700">Occupied Space</span>
              <span className="text-sm font-black text-blue-900">900 m³</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
              <span className="text-xs font-bold text-gray-500">Free Space</span>
              <span className="text-sm font-black text-gray-900">300 m³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinanceView: React.FC = () => {
  const financeData = [
    { week: 'W1', income: 450000 }, { week: 'W2', income: 520000 }, { week: 'W3', income: 480000 },
    { week: 'W4', income: 610000 }, { week: 'W5', income: 590000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Financial Insights</h2>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-100"><FileText className="w-4 h-4 mr-2" /> Export Statement</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-secondary-600 to-secondary-800 p-6 rounded-3xl text-white shadow-xl shadow-secondary-100 relative overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Payouts</p>
          <p className="text-3xl font-black mb-6">₦2,420,000</p>
          <div className="flex items-center text-xs font-bold bg-white/20 px-2 py-1 rounded-lg w-fit">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5% this month
          </div>
          <CreditCard className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10" />
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Weekly Income Projection</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis hide />
                <Bar dataKey="income" fill="#1976D2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <button className="text-sm font-bold text-secondary-600">See All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <tr><th className="px-6 py-4">Transaction ID</th><th className="px-6 py-4">Farmer</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {[1, 2, 3].map(i => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-mono text-xs">#TRX-92{i}12</td>
                  <td className="px-6 py-4 font-bold text-gray-900">Musa Ibrahim</td>
                  <td className="px-6 py-4 text-gray-500">Oct 2{i}, 2024</td>
                  <td className="px-6 py-4 font-bold text-gray-900">₦12,500</td>
                  <td className="px-6 py-4"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-lg text-[10px] font-bold">COMPLETED</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BookingManagement: React.FC<{ bookings: Booking[], onUpdate: any }> = ({ bookings, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');
  const filtered = bookings.filter(b => activeTab === 'pending' ? b.status === 'pending' : b.status === 'approved');

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    onUpdate(bookings.map(b => b.id === id ? {...b, status} : b));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Booking Pipeline</h2>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button onClick={() => setActiveTab('pending')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-white shadow-sm text-secondary-600' : 'text-gray-400'}`}>Pending ({bookings.filter(b=>b.status==='pending').length})</button>
          <button onClick={() => setActiveTab('active')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'active' ? 'bg-white shadow-sm text-secondary-600' : 'text-gray-400'}`}>Active</button>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
            <tr><th className="px-6 py-4">Farmer</th><th className="px-6 py-4">Item Details</th><th className="px-6 py-4">Duration</th><th className="px-6 py-4">Revenue</th><th className="px-6 py-4">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs mr-3">{b.farmerName[0]}</div>
                    <div><p className="text-sm font-bold text-gray-900">{b.farmerName}</p><p className="text-[10px] text-gray-400 uppercase tracking-widest">Verified</p></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.itemName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.durationDays} Days</td>
                <td className="px-6 py-4 font-bold text-gray-900">₦{b.totalPrice.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {b.status === 'pending' ? (
                    <div className="flex space-x-2">
                      <button onClick={() => handleAction(b.id, 'approved')} className="px-4 py-1.5 bg-green-600 text-white text-[10px] font-bold rounded-lg hover:bg-green-700 uppercase">Approve</button>
                      <button onClick={() => handleAction(b.id, 'rejected')} className="px-4 py-1.5 border border-red-100 text-red-500 text-[10px] font-bold rounded-lg hover:bg-red-50 uppercase">Reject</button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-green-600 uppercase">Active Storage</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">No bookings found in this category.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FacilityProfile: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center"><ShieldCheck className="w-6 h-6 mr-3 text-primary-600" /> Compliance & Documents</h3>
        <span className="px-4 py-1.5 bg-primary-50 text-primary-700 rounded-xl text-xs font-bold uppercase tracking-widest border border-primary-100">Fully Verified</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5 text-gray-400" /></div>
            <div><p className="text-sm font-bold text-gray-900">NIPOST Reg</p><p className="text-[10px] text-gray-400">Valid until 2025</p></div>
          </div>
          <button className="text-xs font-bold text-secondary-600">View</button>
        </div>
        <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-gray-400" /></div>
            <div><p className="text-sm font-bold text-gray-900">Insurance Cert</p><p className="text-[10px] text-gray-400">Policy #92812</p></div>
          </div>
          <button className="text-xs font-bold text-secondary-600">View</button>
        </div>
      </div>
    </div>
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center"><Settings className="w-5 h-5 mr-3 text-gray-400" /> Facility Assets</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-400">Generator Back-up</span>
          <span className="text-sm font-bold text-green-600 flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" /> Operational</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-400">CCTV Coverage</span>
          <span className="text-sm font-bold text-gray-900">12 Channels Active</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm font-medium text-gray-400">Last Fumigation</span>
          <span className="text-sm font-bold text-gray-900">Sept 12, 2024</span>
        </div>
      </div>
    </div>
  </div>
);

const ColdRoomDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'b1', farmerName: 'Musa Ibrahim', facilityName: 'Bukuru Premium', itemName: 'Cattle (4 Units)', startDate: '2024-10-12', endDate: '2024-10-19', status: 'pending', totalPrice: 45000, durationDays: 7 },
    { id: 'b2', farmerName: 'Grace Bitrus', facilityName: 'Bukuru Premium', itemName: 'Broiler Batch #1', startDate: '2024-10-15', endDate: '2024-10-29', status: 'pending', totalPrice: 32000, durationDays: 14 },
  ]);

  return (
    <div className="animate-fadeIn">
      <Routes>
        <Route index element={<ColdRoomOverview bookings={bookings} />} />
        <Route path="facility" element={<FacilityProfile />} />
        <Route path="bookings" element={<BookingManagement bookings={bookings} onUpdate={setBookings} />} />
        <Route path="finance" element={<FinanceView />} />
        <Route path="profile" element={<div className="p-12 text-center text-gray-400 font-medium bg-white rounded-3xl border border-dashed border-gray-200">Owner Profile details managed by SuperAdmin.</div>} />
      </Routes>
    </div>
  );
};

export default ColdRoomDashboard;
