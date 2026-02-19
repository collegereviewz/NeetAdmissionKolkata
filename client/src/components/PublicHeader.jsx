import React from 'react';
import { ChevronDown, Phone, Smartphone } from 'lucide-react';
import logo from '../assets/logo6.png';

const PublicHeader = ({ onLogin }) => {
  return (
    <header className="bg-white px-4 md:px-8 py-4 flex items-center justify-between shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={logo} alt="ZyNerd" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-college-dark">ZyNerd</span>
          <img src={logo} alt="CRZ Counselling" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-college-dark">CRZ Counselling</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <div className="relative group">
             <button className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-college-primary rounded-full text-xs font-bold border border-blue-200">
                <span className="bg-blue-600 text-white text-[8px] px-1 rounded absolute -top-2 right-0">New</span>
                <Smartphone size={14} />
                <span>ZyTales</span>
                <span>CRZTales</span>
             </button>
          </div>
          
          <div className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-college-primary cursor-pointer group">
            <span>Counsellings</span>
            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </div>

          <div className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-college-primary cursor-pointer group">
            <span>Explore</span>
            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </div>

          <a href="#" className="text-sm font-semibold text-gray-700 hover:text-college-primary transition-colors">Packages</a>
          <a href="#" className="text-sm font-semibold text-gray-700 hover:text-college-primary transition-colors">Blogs & News</a>
          
          <div className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-college-primary cursor-pointer group">
            <span>About</span>
            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </div>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {/* Contact Info */}
        <div className="hidden xl:flex items-center space-x-3 text-right">
          <div className="bg-gray-50 p-2 rounded-full text-gray-600">
            <Phone size={16} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Talk to our experts</p>
            <p className="text-sm font-bold text-gray-800">080-690-36000</p>
            <p className="text-sm font-bold text-gray-800">+91 97179 87058</p>
          </div>
        </div>

        {/* Actions */}
        <button className="hidden md:flex items-center space-x-2 bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-md">
          <Smartphone size={16} />
          <span>Get the app</span>
        </button>

        <button 
          onClick={onLogin}
          className="bg-orange-500 text-white px-8 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95"
          className="bg-college-primary text-white px-8 py-2 rounded-full text-sm font-bold hover:bg-college-dark transition-all shadow-lg hover:shadow-college-primary/20 active:scale-95"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;
