
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Users, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Zap, 
  Globe, 
  MessageSquare, 
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import { User } from '../types';
import { BrandLogo } from '../App';

interface LandingPageProps {
  user: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/"><BrandLogo size="md" /></Link>
          <div className="hidden lg:flex items-center space-x-10">
            <a href="#how-it-works" className="text-gray-500 hover:text-primary-600 font-bold text-xs uppercase tracking-widest transition-colors">How it Works</a>
            <a href="#impact" className="text-gray-500 hover:text-primary-600 font-bold text-xs uppercase tracking-widest transition-colors">Our Impact</a>
            <a href="#partners" className="text-gray-500 hover:text-primary-600 font-bold text-xs uppercase tracking-widest transition-colors">Partners</a>
            <a href="#contact" className="text-gray-500 hover:text-primary-600 font-bold text-xs uppercase tracking-widest transition-colors">Support</a>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-md">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 font-bold text-sm hover:text-primary-600">Login</Link>
                <Link to="/register/farmer" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 shadow-lg">Join Yeeza</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-8 border border-primary-200">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">Plateau's Smart Agro-Network</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-[0.95] mb-8 tracking-tighter">
              Securing <br />
              <span className="text-primary-600 italic">Plateau's</span> <br />
              Harvest.
            </h1>
            <p className="text-xl text-gray-500 mb-12 max-w-xl font-medium leading-relaxed">
              We connect local livestock farmers with premium cold storage facilities in Jos, Bukuru, and beyond. Eliminating post-harvest loss through technology.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Link to="/register/farmer" className="bg-primary-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-primary-700 transition-all shadow-2xl shadow-primary-200 flex items-center justify-center">
                I'm a Farmer <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <Link to="/register/cold-room" className="bg-white text-primary-600 border-2 border-primary-100 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-primary-50 transition-all flex items-center justify-center">
                I Own a Cold Room
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute top-0 right-0 w-full h-full bg-primary-200/40 rounded-[4rem] -rotate-3 -z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=1000&auto=format&fit=crop" 
               alt="Livestock Farm" 
               className="rounded-[3.5rem] w-full h-[550px] object-cover shadow-2xl border-4 border-white"
             />
             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 max-w-xs animate-bounce">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent-500 rounded-2xl flex items-center justify-center text-white"><Globe className="w-8 h-8" /></div>
                  <div>
                    <p className="text-lg font-black text-gray-900">40% Less Loss</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Post-harvest average</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="partners" className="py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-12">Trusted Partners in Plateau State</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-black text-gray-900">JOS AGRO</span>
            <span className="text-2xl font-black text-gray-900">BUKURU COLD</span>
            <span className="text-2xl font-black text-gray-900">PLATEAU STATE GOVT</span>
            <span className="text-2xl font-black text-gray-900">AGRI-TECH NG</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Simple, Transparent, Efficient.</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">Whether you're breeding or storing, Yeeza Farm manages the complex logistics so you don't have to.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <h3 className="text-2xl font-black text-primary-600 flex items-center"><CheckCircle2 className="mr-3" /> For Farmers</h3>
              <Step number="01" title="Register Your Stock" desc="Onboard your livestock and target market prices directly on the platform." />
              <Step number="02" title="Find Cold Storage" desc="Locate vetted cold rooms near you based on capacity and pricing." />
              <Step number="03" title="Secure Storage" desc="Transport and store with peace of mind. Monitor health and status remotely." />
            </div>
            <div className="space-y-12">
              <h3 className="text-2xl font-black text-secondary-600 flex items-center"><CheckCircle2 className="mr-3" /> For Cold Room Owners</h3>
              <Step number="01" title="List Your Facility" desc="Showcase your capacity, power backups, and insurance status." />
              <Step number="02" title="Accept Bookings" desc="Receive storage requests from verified smallholder farmers." />
              <Step number="03" title="Earn & Expand" desc="Get paid on-time through our secure escrow system and grow your business." />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10 text-primary-600" />}
              title="Verified Security"
              description="Every cold room is physically inspected and verified for power redundancy and 24/7 security."
            />
            <FeatureCard 
              icon={<Truck className="w-10 h-10 text-secondary-500" />}
              title="Cold-Chain Logistics"
              description="Partnerships with local transport providers ensure your products never break the cold-chain."
            />
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-accent-500" />}
              title="Direct Market Access"
              description="We link your stored products directly to major retailers in Jos North and South."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-brand-600 rounded-[3.5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full -mr-32 -mt-32 blur-[100px] opacity-20"></div>
          <h2 className="text-4xl lg:text-6xl font-black mb-8 relative z-10 leading-tight">Ready to eliminate post-harvest loss?</h2>
          <p className="text-xl text-primary-100/70 mb-12 max-w-2xl mx-auto relative z-10">Join over 500+ farmers and 15+ storage owners across Plateau State building a better food system.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link to="/register/farmer" className="bg-primary-500 hover:bg-primary-600 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary-900/40">Start as Farmer</Link>
            <Link to="/register/cold-room" className="bg-white hover:bg-gray-100 text-brand-600 px-12 py-5 rounded-2xl font-black text-lg transition-all">List My Facility</Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer id="contact" className="bg-white border-t border-gray-100 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1">
              <BrandLogo size="lg" />
              <p className="mt-8 text-gray-500 font-medium leading-relaxed">
                Empowering the livestock farmers of Plateau State through shared infrastructure and smart logistics technology.
              </p>
              <div className="flex space-x-5 mt-10">
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-8">Solutions</h4>
              <ul className="space-y-4">
                <li><Link to="/register/farmer" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">For Smallholders</Link></li>
                <li><Link to="/register/cold-room" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">For Cold Room Owners</Link></li>
                <li><a href="#" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">Logistics Network</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">Market Integration</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-8">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">Service Standards</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">Terms of Use</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-8">Contact Plateau</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                  <span className="text-gray-500 font-medium">12 Zaria Road, Jos North,<br />Plateau State, Nigeria</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-500 font-medium">+234 (0) 800 YEEZA</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-500 font-medium">hello@yeeza.farm</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-100 flex flex-col md:row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            <p>© 2024 YEEZA AGRO AND FARMS NIGERIA. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <span className="cursor-pointer hover:text-primary-600">Built for the Plateau</span>
              <span className="cursor-pointer hover:text-primary-600">Secure Payments</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Step: React.FC<{ number: string, title: string, desc: string }> = ({ number, title, desc }) => (
  <div className="flex gap-8 group">
    <span className="text-5xl font-black text-gray-100 group-hover:text-primary-50 transition-colors">{number}</span>
    <div>
      <h4 className="text-xl font-black text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
    <div className="mb-8 bg-gray-50 w-20 h-20 rounded-[1.8rem] flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
