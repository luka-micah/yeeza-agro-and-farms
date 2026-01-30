
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
  CheckCircle2
} from 'lucide-react';
import { CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import { User, MetricCardProps, Livestock, ColdRoom, Booking } from '../types';

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

const LivestockCard: React.FC<{ animal: Livestock }> = ({ animal }) => (
  <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div className="h-48 bg-gray-100 relative overflow-hidden">
      <img 
        src={`https://images.unsplash.com/photo-1547018608-4660a9f83033?q=80&w=600&auto=format&fit=crop&sig=${animal.id}`} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        alt={animal.type} 
      />
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg ${
          animal.status === 'in_storage' ? 'bg-secondary-500 text-white' : 'bg-primary-600 text-white'
        }`}>
          {animal.status.replace('_', ' ')}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-black text-gray-900">{animal.type}</h4>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{animal.breed}</p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center p-2 bg-gray-50 rounded-xl">
          <Scale className="w-4 h-4 mr-2 text-primary-600" />
          <span className="text-xs font-black text-gray-700">{animal.weight}kg</span>
        </div>
        <div className="flex items-center p-2 bg-gray-50 rounded-xl">
          <HeartPulse className="w-4 h-4 mr-2 text-red-500" />
          <span className="text-xs font-black text-gray-700">{animal.healthStatus}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <span className="text-2xl font-black text-primary-700">₦{animal.price.toLocaleString()}</span>
        <button className="px-4 py-2 bg-gray-900 text-white text-[10px] font-black rounded-xl hover:bg-primary-600 transition-colors uppercase tracking-widest">
          View Health
        </button>
      </div>
    </div>
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
    { title: 'Valuation', value: '₦420k', icon: <DollarSign className="w-5 h-5 text-green-600" />, trend: { value: 24, isPositive: true } },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => <MetricCard key={idx} {...m} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-black text-gray-900 mb-10">Revenue Projections</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}} />
                <Line type="monotone" dataKey="revenue" stroke="#2E7D32" strokeWidth={4} dot={{ r: 5, fill: '#2E7D32', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-xl font-black text-gray-900 mb-8">System Status</h3>
          <div className="space-y-6 flex-1">
            <div className="flex items-start gap-4 p-4 bg-primary-50 rounded-2xl border border-primary-100">
              <CheckCircle2 className="w-6 h-6 text-primary-600 shrink-0 mt-1" />
              <div>
                <p className="text-sm font-black text-primary-900 uppercase tracking-tight">Verified Farmer</p>
                <p className="text-xs text-primary-700 leading-relaxed font-medium">Your credentials have been matched with CAC data.</p>
              </div>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Next Payout</p>
              <p className="text-2xl font-black text-gray-900">₦82,400</p>
              <p className="text-[10px] text-primary-600 font-bold mt-1">Expected: Friday, 25 Oct</p>
            </div>
          </div>
          <button className="w-full mt-6 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-colors">
            Account Logs
          </button>
        </div>
      </div>
    </div>
  );
};

const LivestockManagement: React.FC<{ livestock: Livestock[], setLivestock: any }> = ({ livestock, setLivestock }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [newStock, setNewStock] = useState({ type: 'Cattle', breed: '', weight: 0, price: 0 });

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Inventory</h2>
          <p className="text-gray-500 font-medium">Manage and track your livestock stock levels.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            <button onClick={() => setView('grid')} className={`p-2 rounded-xl transition-all ${view === 'grid' ? 'bg-primary-500 shadow-md text-white' : 'text-gray-400 hover:text-gray-600'}`}><Grid className="w-5 h-5" /></button>
            <button onClick={() => setView('list')} className={`p-2 rounded-xl transition-all ${view === 'list' ? 'bg-primary-500 shadow-md text-white' : 'text-gray-400 hover:text-gray-600'}`}><List className="w-5 h-5" /></button>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-200">
            <Plus className="w-5 h-5 mr-3" /> Add Unit
          </button>
        </div>
      </div>

      <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : ""}>
        {view === 'grid' ? (
          livestock.map(animal => <LivestockCard key={animal.id} animal={animal} />)
        ) : (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                <tr><th className="px-8 py-5">Livestock Unit</th><th className="px-8 py-5">Status</th><th className="px-8 py-5">Attributes</th><th className="px-8 py-5">Valuation</th><th className="px-8 py-5"></th></tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {livestock.map(animal => (
                  <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mr-4"><Tag className="w-6 h-6 text-primary-600" /></div>
                        <div><p className="text-sm font-black text-gray-900">{animal.type}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{animal.breed}</p></div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${animal.status === 'in_storage' ? 'bg-secondary-100 text-secondary-700' : 'bg-green-100 text-green-700'}`}>{animal.status.replace('_', ' ')}</span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-600">{animal.weight}kg • Healthy</td>
                    <td className="px-8 py-6 text-lg font-black text-gray-900">₦{animal.price.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right"><button className="p-2 text-gray-400 hover:text-gray-900"><MoreVertical className="w-5 h-5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-zoomIn border border-white/20">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter">New Unit Entry</h3>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-7 h-7" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</label>
                  <select value={newStock.type} onChange={e => setNewStock({...newStock, type: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50">
                    <option>Cattle</option><option>Goat</option><option>Sheep</option><option>Poultry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Breed Spec</label>
                  <input type="text" value={newStock.breed} onChange={e => setNewStock({...newStock, breed: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50" placeholder="e.g. Brahman" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Live Weight (kg)</label>
                  <input type="number" value={newStock.weight} onChange={e => setNewStock({...newStock, weight: Number(e.target.value)})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Target Valuation (₦)</label>
                  <input type="number" value={newStock.price} onChange={e => setNewStock({...newStock, price: Number(e.target.value)})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm focus:ring-4 focus:ring-primary-50" />
                </div>
              </div>
              <button onClick={handleAddStock} className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-primary-200 mt-4 hover:bg-primary-700 transition-all">Save To Ledger</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ColdRoomFinder: React.FC<{ onBook: (room: ColdRoom) => void }> = ({ onBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const mockRooms: ColdRoom[] = [
    { id: 'r1', facilityName: 'Jos North Premium Storage', address: '12 Zaria Road', city: 'Jos', totalCapacity: 1000, availableCapacity: 450, basePrice: 5000, rating: 4.8, features: ['Solar Backup', 'CCTV', 'Insured'] },
    { id: 'r2', facilityName: 'Bukuru Cold Hub', address: 'Old Airport Junction', city: 'Jos South', totalCapacity: 800, availableCapacity: 120, basePrice: 4500, rating: 4.5, features: ['Generator', 'Loading Bay'] },
    { id: 'r3', facilityName: 'Barkin Ladi Agro-Cool', address: 'Station Road', city: 'Barkin Ladi', totalCapacity: 500, availableCapacity: 300, basePrice: 3800, rating: 4.2, features: ['Near Market', 'Clean Certification'] },
  ];

  const filteredRooms = mockRooms.filter(r => r.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) || r.city.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Storage Partners</h2>
          <p className="text-gray-500 font-medium">Browse verified cold storage facilities in your area.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search facilities..." className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary-50 shadow-sm outline-none text-sm font-bold transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row gap-8">
            <div className="w-full sm:w-56 h-56 bg-gray-100 rounded-[2rem] overflow-hidden shrink-0">
              <img 
                src={`https://images.unsplash.com/photo-1542312891-88347101867c?q=80&w=600&auto=format&fit=crop&sig=${room.id}`} 
                className="w-full h-full object-cover" 
                alt={room.facilityName} 
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black text-gray-900 leading-[1.1]">{room.facilityName}</h3>
                <div className="flex items-center text-accent-600 font-black text-sm bg-accent-50 px-3 py-1 rounded-xl"><Star className="w-4 h-4 mr-1 fill-current" /> {room.rating}</div>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center mb-6"><MapPin className="w-4 h-4 mr-1" /> {room.city}, Plateau</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {room.features.map(f => (
                  <span key={f} className="text-[10px] font-black text-primary-600 bg-primary-50 px-3 py-1 rounded-lg uppercase tracking-widest">{f}</span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Base Rate</p>
                  <p className="text-2xl font-black text-gray-900">₦{room.basePrice.toLocaleString()}<span className="text-xs text-gray-400 font-bold">/day</span></p>
                </div>
                <button onClick={() => onBook(room)} className="px-8 py-3 bg-secondary-600 text-white text-xs font-black rounded-xl hover:bg-secondary-700 shadow-xl shadow-secondary-100 transition-all uppercase tracking-widest">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Dashboard Wrapper ---

const FarmerDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [livestock, setLivestock] = useState<Livestock[]>([
    { id: '1', type: 'Cattle', breed: 'Brahman', weight: 450, healthStatus: 'A+', price: 250000, quantity: 4, status: 'available' },
    { id: '2', type: 'Goat', breed: 'Boer', weight: 35, healthStatus: 'B+', price: 45000, quantity: 12, status: 'in_storage' },
  ]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ColdRoom | null>(null);
  const [bookingDetails, setBookingDetails] = useState({ itemName: '', duration: 7 });

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

  return (
    <div className="animate-fadeIn">
      <Routes>
        <Route index element={<FarmerOverview user={user} livestock={livestock} bookings={bookings} />} />
        <Route path="livestock" element={<LivestockManagement livestock={livestock} setLivestock={setLivestock} />} />
        <Route path="bookings" element={
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Reservations</h2>
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                  <tr><th className="px-8 py-5">Partner Facility</th><th className="px-8 py-5">Stock Details</th><th className="px-8 py-5">Cycle Period</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Settlement</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-black text-gray-900">{b.facilityName}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-600">{b.itemName}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-500">{b.startDate} → {b.endDate}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${
                          b.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                          b.status === 'approved' ? 'bg-green-100 text-green-700' : 
                          'bg-red-100 text-red-700'
                        }`}>{b.status}</span>
                      </td>
                      <td className="px-8 py-6 text-lg font-black text-gray-900 text-right">₦{b.totalPrice.toLocaleString()}</td>
                    </tr>
                  ))}
                  {bookings.length === 0 && <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No active reservations found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        } />
        <Route path="cold-rooms" element={<ColdRoomFinder onBook={setSelectedRoom} />} />
        <Route path="profile" element={<div className="p-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100 text-center text-gray-400 font-black uppercase tracking-[0.2em]">Profile Editing Restricted</div>} />
      </Routes>

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-xl animate-fadeIn">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden animate-zoomIn border border-white/20">
            <div className="p-10 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Reserve Space</h3>
                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mt-1">{selectedRoom.facilityName}</p>
              </div>
              <button onClick={() => setSelectedRoom(null)} className="p-3 text-gray-400 hover:bg-gray-100 rounded-2xl transition-all"><X className="w-8 h-8" /></button>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory Manifest</label>
                <input type="text" placeholder="e.g. 50 Broilers, Batch #02" onChange={e => setBookingDetails({...bookingDetails, itemName: e.target.value})} className="w-full px-6 py-5 bg-gray-50 border-none rounded-2xl outline-none font-bold text-base focus:ring-4 focus:ring-primary-50" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cycle Duration</label>
                   <span className="text-xl font-black text-gray-900">{bookingDetails.duration} Days</span>
                </div>
                <input type="range" min="3" max="60" value={bookingDetails.duration} onChange={e => setBookingDetails({...bookingDetails, duration: Number(e.target.value)})} className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>
              <div className="p-6 bg-secondary-50 rounded-3xl flex items-center justify-between border-2 border-secondary-100">
                <span className="text-xs font-black text-secondary-700 uppercase tracking-widest">Estimated Fee</span>
                <span className="text-2xl font-black text-secondary-900">₦{(selectedRoom.basePrice * bookingDetails.duration).toLocaleString()}</span>
              </div>
              <button onClick={handleBookingSubmit} className="w-full py-6 bg-secondary-600 text-white rounded-[1.8rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-secondary-200 mt-4 hover:bg-secondary-700 transition-all flex items-center justify-center gap-3">
                <CreditCard className="w-6 h-6" /> Confirm Reserve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
