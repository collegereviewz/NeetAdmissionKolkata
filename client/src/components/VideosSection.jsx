import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, MapPin, Grid3X3, Search, 
  ChevronRight, PlayCircle, Star, List, ArrowRight
} from 'lucide-react';
import { 
  playlistData, videoData, getAllPlaylists, 
  getYoutubeThumbnail, getPlaylistThumbnail, 
  getAvailableYears, getLatestVideos
} from '../data/videoData';
import { useNavigate } from 'react-router-dom';

const VideosSection = ({ 
  id = "videos-section", 
  variant = "full",
  limit = null,
  containerClassName = "bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100 relative overflow-hidden" 
}) => {
  const navigate = useNavigate();
  const [videoViewMode, setVideoViewMode] = useState('playlists');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const bouncy = { type: 'spring', stiffness: 500, damping: 25, mass: 0.5 };

  useEffect(() => {
    const available = getAvailableYears(selectedLocation);
    if (!available.includes(selectedYear)) {
      setSelectedYear('All');
    }
  }, [selectedLocation]);

  return (
    <div className={variant === 'dashboard' ? "" : "py-8 md:py-12 px-4 md:px-6 bg-gray-50/50"}>
      <div className={variant === 'dashboard' ? "" : "max-w-7xl mx-auto"}>
        <div className={containerClassName}>
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-8">
              {variant === 'dashboard' ? (
                <>
                  <h3 className="text-xl font-bold text-gray-800">Videos</h3>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/videos')}
                    className="px-4 py-1.5 bg-college-primary hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                  >
                    View all
                  </motion.button>
                </>
              ) : (
                <>
                  <div className="flex-1"></div>
                  <h2 className="text-2xl font-black text-gray-900 text-center flex-1">Videos</h2>
                  <div className="flex-1 flex justify-end">
                    <button className="flex items-center space-x-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                      <Star size={14} className="text-gray-400" />
                      <span>Saved videos</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {variant !== 'dashboard' && (
              <>
                {/* Search Row */}
                <div className="max-w-4xl mx-auto mb-10">
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-college-primary transition-colors">
                      <Search size={20} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Global Search: Find any video or playlist..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value) setVideoViewMode('playlists');
                      }}
                      className="w-full bg-white border border-gray-200 rounded-full py-3.5 pl-14 pr-6 text-gray-800 text-base placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-college-primary/10 focus:border-college-primary transition-all shadow-lg hover:shadow-xl"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-sm"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Persistent Year & Location Filters */}
                <div className="flex flex-col items-center space-y-4 mb-8">
                  <div className="bg-gray-100 p-1 rounded-2xl flex items-center shadow-inner overflow-x-auto max-w-full no-scrollbar">
                    <div className="flex items-center space-x-1 min-w-max">
                      {getAvailableYears().map((year) => (
                        <button 
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={`px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                            year === selectedYear 
                            ? 'bg-white text-college-primary shadow-md' 
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex flex-wrap justify-center gap-2 items-center">
                      <button 
                        onClick={() => {
                          setSelectedLocation(null);
                          setVideoViewMode('playlists');
                          setActivePlaylist(null);
                        }}
                        className={`${selectedLocation === null ? 'bg-college-primary text-white border-college-primary' : 'bg-gray-50 text-gray-600 border-gray-200'} border px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[12px] md:text-[13px] font-black hover:bg-college-primary hover:text-white transition-all shadow-sm flex items-center space-x-2`}
                      >
                        <Grid3X3 size={16} />
                        <span>All</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedLocation('Faridabad');
                          setVideoViewMode('playlists');
                          setActivePlaylist(null);
                        }}
                        className={`${selectedLocation === 'Faridabad' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border-red-100'} border px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[12px] md:text-[13px] font-black hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center space-x-2`}
                      >
                        <PlayCircle size={16} />
                        <span>Faridabad</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedLocation('Kolkata');
                          setVideoViewMode('playlists');
                          setActivePlaylist(null);
                        }}
                        className={`${selectedLocation === 'Kolkata' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border-blue-100'} border px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[12px] md:text-[13px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center space-x-2`}
                      >
                        <PlayCircle size={16} />
                        <span>Kolkata</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedLocation('UG');
                          setVideoViewMode('playlists');
                          setActivePlaylist(null);
                        }}
                        className={`${selectedLocation === 'UG' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 border-purple-100'} border px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[12px] md:text-[13px] font-black hover:bg-purple-600 hover:text-white transition-all shadow-sm flex items-center space-x-2`}
                      >
                        <PlayCircle size={16} />
                        <span>UG</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <AnimatePresence mode="wait">
              {variant === 'dashboard' && !searchQuery ? (
                <motion.div
                  key="dashboard-latest-videos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar snap-x snap-mandatory">
                    {getLatestVideos(limit || 10).map((v, i) => (
                      <motion.div 
                        key={`latest-video-${i}`}
                        whileHover={{ y: -5 }}
                        onClick={() => {
                          if (v.youtubeLink) window.open(v.youtubeLink, '_blank');
                        }}
                        className="flex-none w-[85%] sm:w-[45%] lg:w-[calc(25%-12px)] snap-start group cursor-pointer"
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 shadow-md border border-gray-100 group-hover:border-college-primary transition-all">
                          <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 shadow-lg">
                            <span className="text-[10px] font-black text-white">Latest #{i + 1}</span>
                          </div>
                          
                          <img 
                            src={getYoutubeThumbnail(v.youtubeLink, v.img)} 
                            alt={v.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 p-3 rounded-full text-college-primary shadow-xl">
                              <Play size={20} fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <div className="text-left px-1">
                          <h4 className="font-black text-gray-800 text-sm group-hover:text-college-primary transition-colors line-clamp-2 leading-tight mb-1">
                            {v.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{v.playlistTitle}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {/* Graduation effect on edges if scrollable? No, simple scroll is fine. */}
                </motion.div>
              ) : searchQuery ? (
                <motion.div
                  key="global-search-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  {(() => {
                    const allPlaylists = getAllPlaylists();
                    const matchedPlaylists = allPlaylists.filter(p => {
                      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesYear = selectedYear === 'All' || p.year === selectedYear;
                      const matchesLocation = !selectedLocation || p.location === selectedLocation;
                      return matchesSearch && matchesYear && matchesLocation;
                    });

                    const matchedVideos = [];
                    Object.entries(videoData).forEach(([playlistId, videos]) => {
                      const playlist = allPlaylists.find(p => p.id === playlistId);
                      const matchesYear = selectedYear === 'All' || playlist?.year === selectedYear;
                      const matchesLocation = !selectedLocation || playlist?.location === selectedLocation;
                      
                      if (matchesYear && matchesLocation) {
                        videos.forEach((v, index) => {
                          const videoTitle = v.title || `${playlist?.title || 'Video'} - #${videos.length - index}`;
                          if (videoTitle.toLowerCase().includes(searchQuery.toLowerCase())) {
                            matchedVideos.push({
                              ...v,
                              playlistTitle: playlist?.title || 'Unknown Playlist',
                              playlistId,
                              title: videoTitle,
                              originalIndex: videos.length - index
                            });
                          }
                        });
                      }
                    });

                    if (matchedPlaylists.length === 0 && matchedVideos.length === 0) {
                      return (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="bg-gray-50 p-8 rounded-full">
                            <Search size={64} className="text-gray-300" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-gray-900">No Match Found</h3>
                            <p className="text-gray-500 font-bold max-w-md mx-auto">
                              We couldn't find any results for "{searchQuery}" {selectedYear !== 'All' || selectedLocation ? 'with the current filters' : 'across our database'}.
                            </p>
                            {(selectedYear !== 'All' || selectedLocation) && (
                              <button 
                                onClick={() => {
                                  setSelectedYear('All');
                                  setSelectedLocation(null);
                                }}
                                className="mt-4 text-college-primary font-black text-sm hover:underline"
                              >
                                Clear all filters
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-16">
                        {matchedPlaylists.length > 0 && (
                          <section>
                            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <List className="text-college-primary" />
                                Matched Playlists
                              </h3>
                              <span className="bg-college-primary/10 text-college-primary px-4 py-1 rounded-full text-xs font-black">
                                {matchedPlaylists.length} Found
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {matchedPlaylists.map(playlist => (
                                <motion.div 
                                  key={`search-playlist-${playlist.id}`}
                                  whileHover={{ y: -5 }}
                                  onClick={() => {
                                    setSearchQuery('');
                                    setActivePlaylist(playlist);
                                    setVideoViewMode('videos');
                                  }}
                                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group cursor-pointer hover:border-college-primary transition-all"
                                >
                                  <div className="relative aspect-video">
                                    <img 
                                      src={getPlaylistThumbnail(playlist)} 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <PlayCircle size={32} className="text-white" />
                                    </div>
                                  </div>
                                  <div className="p-4">
                                    <h4 className="font-black text-gray-800 text-sm line-clamp-2">{playlist.title}</h4>
                                    <p className="text-[10px] text-gray-400 mt-1 font-bold">{playlist.count} Videos</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </section>
                        )}

                        {matchedVideos.length > 0 && (
                          <section>
                            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <PlayCircle className="text-red-600" />
                                Matched Videos
                              </h3>
                              <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-xs font-black">
                                {matchedVideos.length} Found
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {matchedVideos.map((v, i) => (
                                <motion.div 
                                  key={`search-video-${v.playlistId}-${i}`}
                                  whileHover={{ y: -5 }}
                                  onClick={() => {
                                    if (v.youtubeLink) window.open(v.youtubeLink, '_blank');
                                  }}
                                  className="flex flex-col group cursor-pointer"
                                >
                                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 shadow-md border border-gray-100 group-hover:border-red-500 transition-all">
                                    <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10">
                                      <span className="text-[10px] font-black text-white">#{v.originalIndex}</span>
                                    </div>
                                    <img 
                                      src={getYoutubeThumbnail(v.youtubeLink, v.img)} 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <div className="bg-white/90 p-3 rounded-full text-red-600 shadow-xl">
                                        <Play size={20} fill="currentColor" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-left px-1">
                                    <h4 className="font-black text-gray-800 text-sm group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                                      {v.title}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{v.playlistTitle}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </section>
                        )}
                      </div>
                    );
                  })()}
                </motion.div>
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    {videoViewMode === 'playlists' ? (
                      <motion.div
                        key="playlists-grid"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                          <div className="flex items-center space-x-3">
                            {selectedLocation && (
                              <button 
                                onClick={() => {
                                  setSelectedLocation(null);
                                  setVideoViewMode('playlists');
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                              >
                                <ArrowRight size={20} className="rotate-180" />
                              </button>
                            )}
                            <h3 className="text-2xl font-black text-gray-900">{selectedLocation || 'All'} Playlists</h3>
                          </div>
                          <span className="text-gray-400 text-sm font-bold">
                            {(selectedLocation ? playlistData[selectedLocation] : getAllPlaylists())
                              .filter(p => selectedYear === 'All' || p.year === selectedYear).length} Playlists
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {(() => {
                            const filteredPlaylists = (selectedLocation ? playlistData[selectedLocation] : getAllPlaylists())
                              .filter(p => {
                                const matchesYear = selectedYear === 'All' || p.year === selectedYear;
                                return matchesYear;
                              });
                            
                            if (filteredPlaylists.length === 0) {
                              return (
                                <div className="col-span-full py-4 flex flex-col items-center justify-center text-center space-y-2">
                                  <div className="bg-gray-50 p-6 rounded-full">
                                    <Search size={48} className="text-gray-300" />
                                  </div>
                                  <div>
                                    <h3 className="text-2xl font-black text-gray-900">Not Found</h3>
                                    <p className="text-gray-500 font-bold">
                                      No playlists found for the selected filters.
                                    </p>
                                  </div>
                                </div>
                              );
                            }

                            return filteredPlaylists.map((playlist) => (
                              <motion.div 
                                key={playlist.id}
                                whileHover={{ y: -5 }}
                                onClick={() => {
                                  if (playlist.youtubeLink) {
                                    window.open(playlist.youtubeLink, '_blank');
                                  } else {
                                    setActivePlaylist(playlist);
                                    setVideoViewMode('videos');
                                  }
                                }}
                                className="relative group cursor-pointer"
                              >
                                <div className="absolute inset-0 bg-gray-800 rounded-2xl translate-y-2 scale-[0.98] -z-10 opacity-40"></div>
                                <div className="absolute inset-0 bg-gray-700 rounded-2xl translate-y-1 scale-[0.99] -z-10 opacity-60"></div>
                                
                                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800 h-full">
                                  <div className="relative aspect-video">
                                    <img 
                                      src={getPlaylistThumbnail(playlist)} 
                                      alt={playlist.title} 
                                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                       <PlayCircle size={32} className="text-white" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center space-x-2 border border-white/10 shadow-lg">
                                      <List size={14} className="text-white" />
                                      <span className="text-[11px] font-black text-white leading-none whitespace-nowrap">{playlist.count} {playlist.count === 1 ? 'video' : 'videos'}</span>
                                    </div>
                                  </div>
                                  <div className="p-4 text-left">
                                    <h4 className="text-white font-black text-sm group-hover:text-college-primary transition-colors line-clamp-2 leading-tight mb-2">
                                      {playlist.title}
                                    </h4>
                                    <p className="text-[10px] text-gray-500 font-bold hover:text-white transition-colors">View full playlist</p>
                                  </div>
                                </div>
                              </motion.div>
                            ));
                          })()}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="videos-grid"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                      >
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => setVideoViewMode('playlists')}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                              <ArrowRight size={20} className="rotate-180" />
                            </button>
                            <div>
                              <h3 className="text-2xl font-black text-gray-900">{activePlaylist?.title}</h3>
                              <p className="text-xs text-gray-400 font-bold">{selectedLocation} • {activePlaylist?.count} Videos</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {(() => {
                            if (!activePlaylist) return null;
                            const videos = Array.from({ length: activePlaylist.count }).map((_, i) => {
                              const rawData = (videoData[activePlaylist.id] || [])[i];
                              return {
                                id: rawData?.id || `v-auto-${i}`,
                                title: rawData?.title || `${activePlaylist.title} - Video ${i + 1}`,
                                time: rawData?.time || 'Updated recently',
                                youtubeLink: rawData?.youtubeLink || null,
                                img: rawData?.img || (playlistData.Faridabad ? playlistData.Faridabad[0].img : ''),
                                originalIndex: activePlaylist.count - i
                              };
                            });

                            if (videos.length === 0) {
                              return (
                                <div className="col-span-full py-10 flex flex-col items-center justify-center text-center space-y-2">
                                  <div className="bg-gray-50 p-6 rounded-full">
                                    <Search size={48} className="text-gray-300" />
                                  </div>
                                  <div>
                                    <h3 className="text-2xl font-black text-gray-900">Not Found</h3>
                                    <p className="text-gray-500 font-bold">No videos found for this playlist.</p>
                                  </div>
                                </div>
                              );
                            }

                            return videos.map((v) => (
                              <motion.div 
                                key={v.id}
                                whileHover={{ y: -5 }}
                                onClick={() => {
                                  if (v.youtubeLink) {
                                    window.open(v.youtubeLink, '_blank');
                                  }
                                }}
                                className="flex flex-col group cursor-pointer"
                              >
                                <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 shadow-md border border-gray-100 group-hover:border-college-primary transition-all">
                                  <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 shadow-lg">
                                    <span className="text-[10px] font-black text-white">#{v.originalIndex}</span>
                                  </div>
                                  
                                  <img 
                                    src={getYoutubeThumbnail(v.youtubeLink, v.img)} 
                                    alt={v.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                  />
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-white/90 p-3 rounded-full text-college-primary shadow-xl">
                                      <Play size={20} fill="currentColor" />
                                    </div>
                                  </div>
                                </div>
                                <div className="text-left px-1">
                                  <h4 className="font-black text-gray-800 text-sm group-hover:text-college-primary transition-colors line-clamp-2 leading-tight mb-1">
                                    {v.title}
                                  </h4>
                                  <p className="text-[10px] text-gray-400 font-bold">{v.time}</p>
                                </div>
                              </motion.div>
                            ));
                          })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosSection;
