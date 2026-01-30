
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  Lock, 
  Smartphone, 
  Building2, 
  MapPin, 
  FileText,
  CreditCard,
  ShieldCheck,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { UserRole, UserStatus, User } from '../types';
import { BrandLogo } from '../App';

interface AuthPageProps {
  mode: 'login' | 'register';
  onAuth: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, onAuth }) => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    farmName: '',
    address: '',
    city: 'Jos',
    bankName: '',
    accountNumber: ''
  });

  const totalSteps = mode === 'login' ? 1 : 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const setDemoCredentials = (type: 'admin' | 'superadmin') => {
    if (type === 'superadmin') {
      setFormData(prev => ({ ...prev, email: 'superadmin@yeezafarm.com', password: 'Password@123' }));
    } else {
      setFormData(prev => ({ ...prev, email: 'admin@yeezafarm.com', password: 'Password@123' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && step < totalSteps) {
      handleNext();
      return;
    }

    let assignedRole = role?.toUpperCase() === 'COLD-ROOM' ? UserRole.COLD_ROOM_OWNER : UserRole.FARMER;

    // Admin demo credentials logic
    if (mode === 'login') {
      if (formData.email === 'superadmin@yeezafarm.com' && formData.password === 'Password@123') {
        assignedRole = UserRole.SUPER_ADMIN;
      } else if (formData.email === 'admin@yeezafarm.com' && formData.password === 'Password@123') {
        assignedRole = UserRole.ADMIN;
      }
    }

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email || 'user@yeeza.com',
      phone: formData.phone || '08012345678',
      role: assignedRole,
      status: UserStatus.ACTIVE,
      firstName: assignedRole === UserRole.SUPER_ADMIN ? 'Super' : assignedRole === UserRole.ADMIN ? 'System' : (formData.firstName || 'Demo'),
      lastName: assignedRole === UserRole.SUPER_ADMIN ? 'Admin' : assignedRole === UserRole.ADMIN ? 'Admin' : (formData.lastName || 'User')
    };

    localStorage.setItem('yeeza_user', JSON.stringify(mockUser));
    onAuth(mockUser);
    navigate('/dashboard');
  };

  const currentRoleName = role?.replace('-', ' ') || 'User';

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Panel - Branding */}
      <div className="md:w-1/3 bg-brand-800 p-8 md:p-16 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="z-10">
          <Link to="/" className="mb-16 block">
            <BrandLogo inverse size="lg" />
          </Link>
          <h2 className="text-4xl font-black mb-8 leading-tight">
            {mode === 'login' ? 'Great to see you again!' : `Start your journey as a ${currentRoleName}`}
          </h2>
          <p className="text-primary-100/70 text-lg font-medium leading-relaxed max-w-sm">
            {mode === 'login' 
              ? 'Login to manage your livestock inventory and facility bookings.'
              : 'Join the premier network connecting the Plateau agricultural industry.'
            }
          </p>
        </div>

        <div className="z-10 bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl">
          <p className="text-sm font-bold italic leading-relaxed text-primary-50">"Yeeza Farm gave me the peace of mind I needed. My cattle are safe, and my profits are up by 40%."</p>
          <div className="mt-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl border-4 border-white/20 bg-primary-500 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white">Musa Bitrus</p>
              <p className="text-[10px] text-primary-200 font-bold">Barkin Ladi Co-operative</p>
            </div>
          </div>
        </div>

        {/* Brand Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full -mr-48 -mt-48 blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500 rounded-full -ml-36 -mb-36 blur-[100px] opacity-10"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="md:w-2/3 p-8 md:p-24 flex items-center justify-center bg-gray-50/30">
        <div className="w-full max-w-lg">
          {mode === 'register' && (
            <div className="mb-16">
              <div className="flex justify-between items-center mb-5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600">Step {step} of {totalSteps}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{['Personal', 'Entity', 'Files', 'Banking', 'Security'][step-1]}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 transition-all duration-700 ease-in-out"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="mb-8 flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={() => setDemoCredentials('superadmin')}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-2xl border border-primary-100 dark:border-primary-800 text-xs font-black uppercase tracking-widest transition-all hover:bg-primary-100"
              >
                <ShieldAlert className="w-4 h-4" /> Demo Super Admin
              </button>
              <button 
                type="button"
                onClick={() => setDemoCredentials('admin')}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 rounded-2xl border border-secondary-100 dark:border-secondary-800 text-xs font-black uppercase tracking-widest transition-all hover:bg-secondary-100"
              >
                <UserCheck className="w-4 h-4" /> Demo Admin
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
            {mode === 'login' ? (
              <>
                <InputField 
                  label="Registered Email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={<Mail className="w-5 h-5" />} 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                />
                <InputField 
                  label="Security Password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  icon={<Lock className="w-5 h-5" />} 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-xs font-bold text-gray-500 cursor-pointer">
                    <input type="checkbox" className="mr-3 w-5 h-5 rounded-lg border-gray-200 text-primary-500 focus:ring-primary-100" />
                    Remember session
                  </label>
                  <a href="#" className="text-xs font-black text-primary-600 hover:underline">Forgot?</a>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" required />
                      <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" required />
                    </div>
                    <InputField label="Primary Email" name="email" value={formData.email} onChange={handleInputChange} icon={<Mail className="w-5 h-5" />} type="email" placeholder="john@example.com" />
                    <InputField label="Mobile Phone" name="phone" value={formData.phone} onChange={handleInputChange} icon={<Smartphone className="w-5 h-5" />} placeholder="+234 ..." />
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-8">
                    <InputField label={role === 'cold-room' ? 'Facility Brand' : 'Farm Entity Name'} name="farmName" value={formData.farmName} onChange={handleInputChange} icon={<Building2 className="w-5 h-5" />} placeholder="Green Pastures Ltd" />
                    <InputField label="Registered Address" name="address" value={formData.address} onChange={handleInputChange} icon={<MapPin className="w-5 h-5" />} placeholder="12 Agro Road, Jos" />
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-brand-500 uppercase tracking-widest">LGA / City</label>
                        <select name="city" value={formData.city} onChange={handleInputChange} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-sm outline-none focus:ring-4 focus:ring-primary-50">
                          <option>Jos North</option><option>Jos South</option><option>Barkin Ladi</option>
                        </select>
                      </div>
                      <InputField label="State" value="Plateau" disabled />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-8 text-center">
                    <div className="p-12 border-4 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50 flex flex-col items-center">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6">
                         <FileText className="w-10 h-10 text-primary-500" />
                      </div>
                      <p className="text-sm font-black text-brand-500 mb-2">Upload CAC or Government ID</p>
                      <p className="text-xs text-gray-400 mb-8 max-w-[200px] mx-auto leading-relaxed">Required for account verification & payout processing.</p>
                      <button type="button" className="bg-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-colors shadow-lg">Select Image</button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="space-y-8">
                    <InputField label="Target Bank" name="bankName" value={formData.bankName} onChange={handleInputChange} icon={<Building2 className="w-5 h-5" />} placeholder="Zenith Bank" />
                    <InputField label="Account ID" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} icon={<CreditCard className="w-5 h-5" />} placeholder="0123456789" />
                    <div className="p-6 bg-accent-50 rounded-[2rem] border border-accent-100 flex items-start gap-4">
                      <ShieldCheck className="w-6 h-6 text-accent-600 shrink-0" />
                      <p className="text-xs font-bold text-accent-700 leading-relaxed">Payouts are secured via Paystack and verified against your CAC registration.</p>
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <div className="space-y-8">
                    <InputField label="Create Password" name="password" value={formData.password} onChange={handleInputChange} icon={<Lock className="w-5 h-5" />} type="password" placeholder="••••••••" />
                    <InputField label="Repeat Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} icon={<Lock className="w-5 h-5" />} type="password" placeholder="••••••••" />
                    <label className="flex items-start text-[10px] font-bold text-gray-400 cursor-pointer">
                      <input type="checkbox" className="mt-1 mr-4 w-5 h-5 rounded-lg border-gray-200 text-primary-500" required />
                      <span className="leading-relaxed">I consent to the <span className="text-primary-600 font-black">YEEZA FARM</span> terms of service and standard operating procedures for Plateau State agriculture.</span>
                    </label>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 pt-4">
              {step > 1 && (
                <button type="button" onClick={handleBack} className="flex-1 px-8 py-5 border border-gray-100 text-brand-500 font-black rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center text-sm uppercase tracking-widest">
                  Back
                </button>
              )}
              <button type="submit" className="flex-[2] px-8 py-5 bg-brand-800 text-white font-black rounded-2xl hover:bg-brand-900 transform hover:-translate-y-1 transition-all shadow-2xl shadow-brand-100 flex items-center justify-center text-sm uppercase tracking-widest">
                {step === totalSteps ? (mode === 'login' ? 'Enter Dashboard' : 'Finalize Account') : 'Continue Process'}
              </button>
            </div>
          </form>

          <div className="mt-16 pt-12 border-t border-gray-100 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {mode === 'login' ? "New to the farm?" : "Part of the family?"}
              <Link to={mode === 'login' ? '/register/farmer' : '/login'} className="ml-3 text-primary-600 font-black hover:underline">
                {mode === 'login' ? 'Create Account' : 'Log In Here'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{ 
  label: string, 
  name?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  icon?: React.ReactNode, 
  type?: string, 
  placeholder?: string, 
  required?: boolean, 
  value?: string, 
  disabled?: boolean 
}> = ({ label, name, onChange, icon, type = 'text', placeholder, required, value, disabled }) => (
  <div className="space-y-3">
    <label className="text-xs font-black text-brand-500 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-500 transition-colors">{icon}</div>}
      <input 
        name={name}
        onChange={onChange}
        type={type} 
        value={value} 
        disabled={disabled} 
        className={`w-full ${icon ? 'pl-14' : 'px-6'} pr-6 py-5 bg-white border border-gray-200 rounded-2xl font-bold text-sm outline-none transition-all placeholder:text-gray-300 focus:ring-4 focus:ring-primary-50 focus:border-primary-100 ${disabled ? 'bg-gray-50/50 cursor-not-allowed text-gray-400' : ''}`}
        placeholder={placeholder} 
        required={required} 
      />
    </div>
  </div>
);

export default AuthPage;
