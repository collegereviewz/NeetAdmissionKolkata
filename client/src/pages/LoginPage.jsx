import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MessageSquare, ShieldCheck,
  Smartphone, ChevronDown, CheckCircle2,
  X, RefreshCw, User, Mail, CreditCard, Lock
} from 'lucide-react';
import logo from '../assets/logo6.png';
import axios from 'axios';

const LoginPage = ({ user, onLoginSuccess, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [stage, setStage] = useState('phone'); // 'phone', 'otp', 'plan', 'registration', 'payment', 'success'
  const [redirectCount, setRedirectCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tempUser, setTempUser] = useState(user || null);
  const [registrationData, setRegistrationData] = useState({ 
    fullName: user?.fullName || '', 
    email: (user?.email && !user?.email.includes('@otp.user')) ? user.email : '', 
    plan: user?.subscriptionType || 'Free' 
  });

  React.useEffect(() => {
    if (user && !user.isProfileComplete) {
      setTempUser(user);
      setPhoneNumber(user.phoneNumber || '');
      setStage('plan');
    }
  }, [user]);

  const bouncy = { type: 'spring', stiffness: 500, damping: 25, mass: 0.5 };
  const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  const [timer, setTimer] = useState(0);

  React.useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    if (phoneNumber.length < 10) return;
    setLoading(true);
    try {
      await axios.post('/users/send-otp', { phoneNumber });
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
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) return;
    setLoading(true);
    try {
      const response = await axios.post('/users/verify-otp', { phoneNumber, otp: otpString });
      const user = response.data.user;
      
      if (!user.isProfileComplete) {
        setTempUser(user);
        setStage('plan');
      } else {
        onLoginSuccess(user);
      }
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid OTP or verification failed.";
      alert(errorMsg);
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    setRegistrationData(prev => ({ ...prev, plan }));
    setStage('registration');
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    if (registrationData.plan === 'Paid') {
      setStage('payment');
    } else {
      finalizeRegistration();
    }
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const orderResponse = await axios.post('/payments/create-order', {
        amount: 1, // Example premium amount
        currency: 'INR',
        receipt: `receipt_${tempUser?._id}`
      });

      const orderData = orderResponse.data;

      // 2. Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        // 3. Open Razorpay modal
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || '', // Ensure VITE_RAZORPAY_KEY_ID is in client/.env
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'CRZGenie Premium',
          description: 'Unlock Elite Tracker Privileges',
          order_id: orderData.id,
          handler: async (response) => {
            // 4. Verify payment on backend
            try {
              const verifyResponse = await axios.post('/payments/verify-payment', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: tempUser?._id
              });

              if (verifyResponse.data.success) {
                finalizeRegistration();
              } else {
                alert("Payment verification failed.");
                setLoading(false);
              }
            } catch (err) {
              console.error("Verification error:", err);
              alert("Error verifying payment.");
              setLoading(false);
            }
          },
          prefill: {
            name: registrationData.fullName,
            email: registrationData.email,
            contact: phoneNumber
          },
          theme: {
            color: '#3B82F6'
          },
          modal: {
            ondismiss: () => setLoading(false)
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      
      script.onerror = () => {
        alert("Failed to load Razorpay SDK.");
        setLoading(false);
      };

      document.body.appendChild(script);

    } catch (error) {
      console.error("Payment initiation failed:", error);
      const errorMsg = error.response?.data?.message || error.message || "Network Error";
      alert(`Failed to initiate payment: ${errorMsg}. Please ensure the server is running and keys are configured.`);
      setLoading(false);
    }
  };

  const finalizeRegistration = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/users/complete-profile', {
        userId: tempUser?._id,
        fullName: registrationData.fullName,
        email: registrationData.email,
        subscriptionType: registrationData.plan
      });
      setLoading(false);
      setStage('success');
      // Countdown for redirection
      let count = 5;
      const timer = setInterval(() => {
        count -= 1;
        setRedirectCount(count);
        if (count === 0) {
          clearInterval(timer);
          onLoginSuccess(response.data.user);
        }
      }, 1000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to complete registration.";
      alert(errorMsg);
      setLoading(false);
    }
  };

  const handleLogoutInReg = async () => {
     try {
       await axios.post('/users/logout');
       setTempUser(null);
       setStage('phone');
       setPhoneNumber('');
       onBack(); 
     } catch (err) {
       console.error("Logout during reg failed:", err);
     }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col-reverse md:flex-row font-sans text-gray-900">
      {/* Left Panel: Illustration & Text */}
      <div className="w-full md:w-1/2 bg-college-bg p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-md mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-black text-college-primary leading-tight mb-6">
              Empower Your Medical Future
            </h1>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              Step into the most advanced NEET PG counseling ecosystem. Real-time data, expert-curated maps, and precise seat mapping await you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <img 
              src="https://img.freepik.com/free-vector/professional-doctor-surgeon-working-with-digital-screen-healthcare-innovation-technology_107791-16345.jpg" 
              alt="Auth Illustration" 
              className="w-full h-auto drop-shadow-2xl rounded-2xl"
            />
            {/* Carousel Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-6 h-2 bg-college-primary rounded-full"></div>
              <div className="w-2 h-2 bg-college-light rounded-full"></div>
              <div className="w-2 h-2 bg-college-light rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Background Decorative Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-college-light/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      </div>

      {/* Right Panel: Auth Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 relative">
        <button 
          onClick={() => {
            if (stage === 'plan' && tempUser) {
               handleLogoutInReg();
            } else if (stage === 'registration') {
              setStage('plan');
            } else if (stage === 'payment') {
              setStage('registration');
            } else if (stage === 'otp') {
              setStage('phone');
            } else if (stage === 'phone') {
              onBack();
            } else {
              setStage('phone');
            }
          }}
          className="absolute top-8 left-8 p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-600 flex items-center gap-1 group"
        >
          <ArrowLeft size={24} />
          {stage === 'plan' && tempUser && <span className="text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Logout</span>}
        </button>


        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="CRZGenie" className="h-10 w-auto" />
              <span className="text-3xl font-black tracking-tight">
                <span className="text-college-dark">CRZ</span>
                <span className="text-college-gold">Genie</span>
              </span>
            </div>
            
            {stage === 'phone' && (
              <>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Start your journey</h2>
                <p className="text-gray-500 font-bold text-sm">Enter phone number to continue</p>
              </>
            )}
            {stage === 'otp' && (
              <>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Verify Mobile</h2>
                <p className="text-gray-500 font-bold text-sm">Enter the 6-digit code sent to +91 {phoneNumber}</p>
              </>
            )}
            {stage === 'plan' && (
              <>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Choose Your Plan</h2>
                <p className="text-gray-500 font-bold text-sm">Select a version to get started</p>
              </>
            )}
            {stage === 'registration' && (
              <>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Complete Your Profile</h2>
                <p className="text-gray-500 font-bold text-sm">Almost there! We just need some basics.</p>
              </>
            )}
            {stage === 'payment' && (
              <>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Upgrade to Premium</h2>
                <p className="text-gray-500 font-bold text-sm">Join the Elite tracker community</p>
              </>
            )}
            {stage === 'success' && (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Congratulations!</h2>
                <p className="text-gray-500 font-bold text-sm">Payment Successfully</p>
              </>
            )}
          </div>

          <AnimatePresence mode="wait">
            {stage === 'phone' && (
              <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
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
                     type="tel" maxLength={10} value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                     placeholder="Enter phone number"
                     className="w-full pl-28 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl text-lg font-bold placeholder-gray-300 focus:outline-none focus:border-college-primary focus:ring-4 focus:ring-college-primary/10 transition-all"
                   />

                </div>
                <div className="space-y-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={phoneNumber.length < 10 || loading}
                    onClick={handleSendOtp}
                    className="w-full bg-college-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-college-primary/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="animate-spin" /> : <span>Continue & Get OTP</span>}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {stage === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index} id={`otp-${index}`} type="text" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index] && index > 0) document.getElementById(`otp-${index - 1}`).focus();
                      }}
                      className="w-12 h-14 bg-gray-50 border-2 border-gray-100 rounded-xl text-center text-xl font-black text-college-primary focus:outline-none focus:border-college-primary focus:ring-4 focus:ring-college-primary/10 transition-all"
                    />
                  ))}

                </div>
                <button onClick={handleVerifyOtp} disabled={otp.join('').length < 6 || loading} className="w-full bg-college-primary text-white py-4 rounded-2xl font-black transition-all disabled:opacity-50">
                   {loading ? <RefreshCw className="animate-spin mx-auto" /> : "Verify OTP"}
                </button>
                <button 
                  onClick={() => timer === 0 && handleSendOtp()}
                  className={`w-full py-2 text-sm font-bold ${timer > 0 ? 'text-gray-300' : 'text-blue-500'}`}
                >
                  {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
                </button>
              </motion.div>
            )}

            {stage === 'plan' && (
              <motion.div key="plan" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <button onClick={() => handleSelectPlan('Free')} className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-2xl text-left hover:border-college-primary hover:bg-white transition-all group">
                   <h3 className="font-bold text-gray-900 mb-1">Free Version</h3>
                   <p className="text-xs text-gray-500 font-medium">Access basic tracking and allotments</p>
                </button>
                <button onClick={() => handleSelectPlan('Paid')} className="w-full p-6 bg-white border-2 border-college-gold/20 rounded-2xl text-left hover:border-college-gold hover:shadow-lg transition-all relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-college-gold text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">Premium</div>
                   <h3 className="font-bold text-gray-900 mb-1 text-college-gold">Paid Version</h3>
                   <p className="text-xs text-gray-500 font-medium font-bold">Priority alerts, seat-mapping & 1v1 Expert help</p>
                </button>
              </motion.div>
            )}

            {stage === 'registration' && (
              <motion.div key="reg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required type="text" placeholder="Full Name"
                      value={registrationData.fullName}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-college-primary focus:bg-white outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required type="email" placeholder="Email Address"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-college-primary focus:bg-white outline-none transition-all font-bold"
                    />
                  </div>
                  <button type="submit" className="w-full bg-college-primary text-white py-4 rounded-2xl font-black mt-4 shadow-lg">
                    {registrationData.plan === 'Paid' ? "Proceed to Payment" : "Start Tracking"}
                  </button>
                </form>
              </motion.div>
            )}

            {stage === 'payment' && (
              <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-4 text-center">
                   <div className="flex justify-center mb-3 text-college-primary"><CreditCard size={48} /></div>
                   <p className="text-sm font-bold text-gray-700">Scan QR or enter card details to unlock Premium privileges.</p>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center space-x-2 text-blue-500 justify-center font-bold mb-4 italic">
                      <ShieldCheck size={18} />
                      <span>Razorpay Secure Connection</span>
                   </div>
                   <button 
                     disabled={loading}
                     onClick={handleRazorpayPayment} 
                     className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-all disabled:opacity-50"
                   >
                     {loading ? (
                       <RefreshCw className="animate-spin" />
                     ) : (
                       <>
                         <Lock size={18} />
                         <span>Pay Now & Unlock Premium</span>
                       </>
                     )}
                   </button>
                </div>
              </motion.div>
            )}

            {stage === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-8 shadow-sm">
                   <p className="text-lg font-black text-gray-900 mb-2">Go To your Home Page</p>
                   <p className="text-sm text-gray-500 font-bold mb-6">You will be redirected automatically in <span className="text-green-600">{redirectCount}s</span></p>
                   
                   <button 
                     onClick={() => onLoginSuccess(tempUser)}
                     className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black flex items-center justify-center space-x-2 active:scale-95 transition-all"
                   >
                     <span>Enter Dashboard Now</span>
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
