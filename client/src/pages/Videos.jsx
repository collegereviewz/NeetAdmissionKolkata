import React from 'react';
import VideosSection from '../components/VideosSection';

const Videos = () => {
  return (
    <div className="p-2 md:p-4 pt-1 md:pt-2 space-y-4">
      <VideosSection 
        id="dedicated-videos-page" 
        containerClassName="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
      />
    </div>
  );
};

export default Videos;
