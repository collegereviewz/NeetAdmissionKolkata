import React from 'react';

const AuroraBackground = () => {
  return (
    <div className="aurora-bg">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-sky-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default AuroraBackground;
