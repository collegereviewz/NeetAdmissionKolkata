import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MessageSquare, ShieldCheck, 
  Smartphone, ChevronDown, CheckCircle2,
  X, RefreshCw
} from 'lucide-react';
import logo from '../assets/logo6.png';
import axios from 'axios';

const LoginPage = ({ onLoginSuccess, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [stage, setStage] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const [otpMethod, setOtpMethod] = useState(null); // 'sms' or 'whatsapp'

  const bouncy = { type: 'spring', stiffness: 500, damping: 25, mass: 0.5 };

  const [timer, setTimer] = useState(0);

  React.useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async (method) => {
    if (phoneNumber.length < 10) return;
    setLoading(true);
    setOtpMethod(method);
    try {
      await axios.post('/users/send-otp', { phoneNumber, method });
      setLoading(false);
      setStage('otp');
      setTimer(60); // Start 60s countdown
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Check console.");
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) return;
    setLoading(true);
    try {
      const response = await axios.post('/users/verify-otp', { phoneNumber, otp: otpString });
      setLoading(false);
      onLoginSuccess(response.data.user);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid OTP or verification failed.";
      alert(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans text-gray-900">
      {/* Left Panel: Illustration & Text */}
      <div className="w-full md:w-1/2 bg-[#FFF1ED] p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
      <div className="w-full md:w-1/2 bg-college-bg p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-md mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-black text-[#E35422] leading-tight mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-college-primary leading-tight mb-6">
              Comprehensive Resources & Tools
            </h1>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              Access Allotments, Cut-offs, Fees, Stipends & Bonds across counselings and institutes in one place. Use Allotment Mapping & Rank Scan for smarter decisions and stay updated on Announcements & Events.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
             <img 
               src="https://img.freepik.com/free-vector/professional-doctor-surgeon-working-with-digital-screen-healthcare-innovation-technology_107791-16345.jpg?..." 
               alt="Auth Illustration" 
               className="w-full h-auto drop-shadow-2xl rounded-2xl"
             />
             {/* Carousel Dots */}
             <div className="flex justify-center space-x-2 mt-8">
               <div className="w-6 h-2 bg-[#E35422] rounded-full"></div>
               <div className="w-2 h-2 bg-peach-300 rounded-full"></div>
               <div className="w-2 h-2 bg-peach-300 rounded-full"></div>
               <div className="w-6 h-2 bg-college-primary rounded-full"></div>
               <div className="w-2 h-2 bg-college-light rounded-full"></div>
               <div className="w-2 h-2 bg-college-light rounded-full"></div>
             </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-college-light/30/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 relative">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="ZyNerd" className="h-10 w-auto" />
              <span className="text-3xl font-black text-college-dark italic">ZyNerd</span>
              <img src={logo} alt="CRZ Counselling" className="h-10 w-auto" />
              <span className="text-3xl font-black text-college-dark italic">CRZ Counselling</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 text-center mb-1">
              Start your journey to success
            </h2>
            <p className="text-gray-500 font-bold text-sm">
              {stage === 'phone' ? 'Enter your phone number to continue' : 'Enter the 6-digit OTP sent to your phone'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {stage === 'phone' ? (
              <motion.div
                key="phone-stage"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Phone Input Card */}
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 flex items-center pl-4 pr-3 border-r border-gray-100">
                      <div className="flex items-center space-x-2">
                        <img 
                          src="https://flagcdn.com/w20/in.png" 
                          alt="India" 
                          className="w-5 h-auto rounded-sm"
                        />
                        <span className="text-sm font-bold text-gray-800">+91</span>
                        <ChevronDown size={14} className="text-gray-400" />
                      </div>
                   </div>
                   <input 
                     type="tel"
                     placeholder="Enter your phone number"
                     maxLength={10}
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                     className="w-full pl-28 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl text-lg font-bold placeholder-gray-300 focus:outline-none focus:border-[#E35422] focus:ring-4 focus:ring-orange-50 transition-all"
                     className="w-full pl-28 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl text-lg font-bold placeholder-gray-300 focus:outline-none focus:border-college-primary focus:ring-4 focus:ring-college-primary/10 transition-all"
                   />
                </div>

                <div className="space-y-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={phoneNumber.length < 10 || loading}
                    onClick={() => handleSendOtp('sms')}
                    className="w-full bg-[#E35422] hover:bg-[#D1481D] text-white py-4 rounded-2xl font-black shadow-xl shadow-orange-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    className="w-full bg-college-primary hover:bg-college-dark text-white py-4 rounded-2xl font-black shadow-xl shadow-college-primary/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading && otpMethod === 'sms' ? (
                      <RefreshCw size={20} className="animate-spin" />
                    ) : (
                      <>
                        <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Get OTP via SMS</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={phoneNumber.length < 10 || loading}
                    onClick={() => handleSendOtp('whatsapp')}
                    className="w-full bg-white border-2 border-[#25D366] text-[#25D366] py-4 rounded-2xl font-black flex items-center justify-center space-x-2 transition-all hover:bg-[#25D366]/5 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                     {loading && otpMethod === 'whatsapp' ? (
                      <RefreshCw size={20} className="animate-spin" />
                    ) : (
                      <>
                        <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.894-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.231 3.481 8.401 0 6.557-5.331 11.892-11.893 11.892-1.997 0-3.951-.5-5.688-1.448l-6.306 1.668zm6.29-4.103c1.733 1.017 3.305 1.592 5.303 1.592 5.456 0 9.894-4.437 9.894-9.892 0-2.64-1.029-5.122-2.895-6.989-1.868-1.866-4.349-2.894-6.988-2.894-5.458 0-9.894 4.438-9.894 9.892 0 2.129.581 3.73 1.68 5.464l-.994 3.633 3.894-.996zm10.32-6.524c-.112-.112-.132-.128-.21-.132-.078-.004-.339-.144-.725-.336-.387-.192-2.288-1.129-2.646-1.258-.358-.129-.619-.193-.878.193s-1.002 1.258-1.229 1.516c-.227.258-.454.29-.841.096-.387-.193-1.636-.603-3.116-1.919-1.152-1.027-1.929-2.296-2.156-2.682-.227-.387-.024-.596.17-.79.174-.174.387-.451.581-.677.193-.226.258-.387.387-.645.129-.258.064-.484-.032-.677-.096-.193-.878-2.115-1.201-2.891-.314-.755-.634-.652-.878-.664-.227-.011-.486-.011-.745-.011-.258 0-.678.096-1.032.484-.354.387-1.354 1.323-1.354 3.226 0 1.903 1.387 3.742 1.581 4.001.193.258 2.73 4.168 6.613 5.849.924.4 1.644.64 2.206.818.928.293 1.772.251 2.441.151.745-.112 2.288-.936 2.61-1.839.323-.903.323-1.677.226-1.838z"/></svg>
                        <span>Get OTP to WhatsApp</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="otp-stage"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          document.getElementById(`otp-${index - 1}`).focus();
                        }
                      }}
                      className="w-12 h-14 bg-gray-50 border-2 border-gray-100 rounded-xl text-center text-xl font-black text-[#E35422] focus:outline-none focus:border-[#E35422] focus:ring-4 focus:ring-orange-50 transition-all"
                      className="w-12 h-14 bg-gray-50 border-2 border-gray-100 rounded-xl text-center text-xl font-black text-college-primary focus:outline-none focus:border-college-primary focus:ring-4 focus:ring-college-primary/10 transition-all"
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVerifyOtp}
                    disabled={otp.join('').length < 6 || loading}
                    className="w-full bg-[#E35422] hover:bg-[#D1481D] text-white py-4 rounded-2xl font-black shadow-xl shadow-orange-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    className="w-full bg-college-primary hover:bg-college-dark text-white py-4 rounded-2xl font-black shadow-xl shadow-college-primary/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <RefreshCw size={20} className="animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Verify & Login</span>
                      </>
                    )}
                  </motion.button>

                  <button 
                    onClick={() => timer === 0 && handleSendOtp(otpMethod)}
                    disabled={timer > 0}
                    className={`w-full py-2 text-sm font-bold transition-colors ${timer > 0 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 text-center">
             <p className="text-gray-400 text-sm font-bold">
               Trouble signing in? <a href="#" className="text-blue-600 hover:underline">Get Help</a>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
