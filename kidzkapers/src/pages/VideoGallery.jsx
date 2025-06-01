import { useState, useEffect, useMemo } from 'react';
import noimageavail from '../assets/noimageavail.jpg'

const VideoGallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('⭐ Most Popular');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 // Accessing environment variables
const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const channelId = import.meta.env.VITE_CHANNEL_ID;
const maxResults = import.meta.env.VITE_MAX_RESULTS;
const instagramToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const instagramBusinessId = import.meta.env.VITE_INSTAGRAM_BUSINESS_ID;

  const stats = useMemo(() => [
    { value: "50+", label: "Happy Videos", icon: "🎥" },
    { value: "25K+", label: "Total Views", icon: "👀" },
    { value: "50+", label: "Celebrations", icon: "🎉" },
    { value: "100%", label: "Smiling Kids", icon: "😊" }
  ], []);

  const filters = useMemo(() => [
    "All", "Morning Surprise", "Evening Party",
    "Character Visit", "Behind the Scenes", "Testimonials"
  ], []);

  const sourceFilters = useMemo(() => [
    "All", "YouTube", "Instagram"
  ], []);

  const sortOptions = useMemo(() => [
    "⭐ Most Popular",
    "🔥 Trending",
    "Newest First",
    "Most Liked",
    "Most Engaged"
  ], []);

  // Memoized utility functions
  const getBestThumbnail = useMemo(() => (thumbnails) => {
    return (
      thumbnails?.maxres?.url ||
      thumbnails?.standard?.url ||
      thumbnails?.high?.url ||
      thumbnails?.medium?.url ||
      thumbnails?.default?.url
    );
  }, []);

  const formatDuration = useMemo(() => (duration) => {
    if (!duration) return '';
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    return [
      hours > 0 ? hours : null,
      minutes.toString().padStart(hours ? 2 : 1, '0'),
      seconds.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  }, []);

  const formatDate = useMemo(() => (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const extractTypeFromCaption = (caption) => {
    if (!caption) return "Other";
    const captionLower = caption.toLowerCase();
    if (captionLower.includes("morning")) return "Morning Surprise";
    if (captionLower.includes("evening")) return "Evening Party";
    if (captionLower.includes("character") || captionLower.includes("spiderman") || captionLower.includes("iron man")) return "Character Visit";
    if (captionLower.includes("behind the scenes") || captionLower.includes("bts")) return "Behind the Scenes";
    if (captionLower.includes("parents") || captionLower.includes("testimonial")) return "Testimonials";
    return "Other";
  };

  // Fetch videos from both YouTube and Instagram
  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cacheKey = `social_videos_${channelId}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Use cache if less than 1 hour old
          if (Date.now() - timestamp < 3600000) {
            setVideos(data);
            setLoading(false);
            return;
          }
        }

        // Fetch from both APIs in parallel
        const [youtubeVideos, instagramVideos] = await Promise.all([
          fetchYouTubeVideos(),
          fetchInstagramVideos()
        ]);

        const combinedVideos = [...youtubeVideos, ...instagramVideos]
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify({
          data: combinedVideos,
          timestamp: Date.now()
        }));

        setVideos(combinedVideos);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchYouTubeVideos = async () => {
      try {
        // First fetch search results
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
        );

        if (!searchRes.ok) throw new Error('Failed to fetch YouTube videos');
        const searchData = await searchRes.json();

        // Batch fetch video details
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');
        const detailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`
        );

        if (!detailsRes.ok) throw new Error('Failed to fetch YouTube video details');
        const detailsData = await detailsRes.json();

        return detailsData.items.map((video) => {
          return {
            id: video.id,
            title: video.snippet.title,
            description: video.snippet.description || "No description available",
            views: parseInt(video.statistics.viewCount),
            formattedViews: `${parseInt(video.statistics.viewCount).toLocaleString()} views`,
            duration: formatDuration(video.contentDetails.duration),
            type: extractTypeFromCaption(video.snippet.title),
            source: "YouTube",
            trending: video.statistics.likeCount / video.statistics.viewCount > 0.1,
            thumbnail: getBestThumbnail(video.snippet.thumbnails),
            url: `https://www.youtube.com/watch?v=${video.id}`,
            publishedAt: video.snippet.publishedAt,
            likes: parseInt(video.statistics.likeCount || 0),
            comments: parseInt(video.statistics.commentCount || 0)
          };
        });
      } catch (err) {
        console.error("YouTube API Error:", err);
        return []; // Return empty array if YouTube fails
      }
    };

    const fetchInstagramVideos = async () => {
      try {
        const mediaResponse = await fetch(
          `https://graph.facebook.com/v23.0/${instagramBusinessId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&access_token=${instagramToken}`
        );

        if (!mediaResponse.ok) {
          throw new Error(`Instagram API error: ${mediaResponse.status}`);
        }

        const mediaData = await mediaResponse.json();

        if (!mediaData.data) return [];

        const videosWithInsights = await Promise.all(
          mediaData.data
            .filter(item => ["VIDEO", "CAROUSEL_ALBUM", "REEL"].includes(item.media_type))
            .map(async item => {
              let insights = {
                reach: 0,
                likes: item.like_count || 0,
                comments: item.comments_count || 0,
                shares: 0,
                total_interactions: 0
              };

              try {
                const insightsResponse = await fetch(
                  `https://graph.facebook.com/v23.0/${item.id}/insights?metric=reach,likes,comments,shares,total_interactions&access_token=${instagramToken}`
                );

                if (insightsResponse.ok) {
                  const insightsData = await insightsResponse.json();
                  if (insightsData.data && Array.isArray(insightsData.data)) {
                    insightsData.data.forEach(metric => {
                      if (metric.name && metric.values && metric.values[0]) {
                        insights[metric.name] = metric.values[0].value || 0;
                      }
                    });
                  }
                }
              } catch (insightsError) {
                console.error(`Failed to get insights for media ${item.id}:`, insightsError);
              }

              const engagementRate = insights.reach > 0
                ? (insights.total_interactions / insights.reach) * 100
                : 0;

              return {
                id: item.id,
                title: item.caption ? item.caption.split('\n')[0] : "Instagram Video",
                description: item.caption || "No description available",
                views: insights.reach, // proxy for views
                formattedViews: `${(insights.reach || 0).toLocaleString()} reach • ${(insights.likes || 0).toLocaleString()} likes`,
                duration: '', // API does not provide duration
                type: extractTypeFromCaption(item.caption), // your custom helper
                source: "Instagram",
                trending: engagementRate > 10,
                thumbnail: item.thumbnail_url,
                url: item.permalink,
                publishedAt: item.timestamp,
                likes: insights.likes,
                comments: insights.comments,
                shares: insights.shares,
                reach: insights.reach,
                totalInteractions: insights.total_interactions,
                engagementRate,
                isInstagram: true
              };
            })
        );

        return videosWithInsights.filter(Boolean);

      } catch (err) {
        console.error("Instagram API Error:", err);
        return [];
      }
    };


    fetchAllVideos();
  }, [formatDuration, getBestThumbnail]);

  // Memoized filtered and sorted videos
  const filteredVideos = useMemo(() => videos.filter(video =>
    (activeFilter === 'All' || video.type === activeFilter) &&
    (sourceFilter === 'All' || video.source === sourceFilter)
  ), [videos, activeFilter, sourceFilter]);

  const sortedVideos = useMemo(() => [...filteredVideos].sort((a, b) => {
    switch (activeSort) {
      case "⭐ Most Popular":
        return b.views - a.views;
      case "🔥 Trending":
        return (b.trending === a.trending) ?
          (b.views - a.views) :
          (b.trending - a.trending);
      case "Newest First":
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      case "Most Liked":
        return b.likes - a.likes;
      case "Most Engaged":
        return (b.engagementRate || 0) - (a.engagementRate || 0);
      default:
        return 0;
    }
  }), [filteredVideos, activeSort]);

  const handleVideoClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="container mx-auto max-w-7xl">
          {/* Loading header */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-blue-200 rounded-full w-3/4 mx-auto"></div>
          </div>

          {/* Loading stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="h-8 bg-blue-200 rounded-full w-3/4 mb-3"></div>
                <div className="h-4 bg-blue-200 rounded-full w-1/2"></div>
              </div>
            ))}
          </div>

          {/* Loading filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-white/80 rounded-full w-24"></div>
            ))}
          </div>

          {/* Loading video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-blue-200 to-purple-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-blue-200 rounded-full w-3/4"></div>
                  <div className="h-3 bg-blue-200 rounded-full w-full"></div>
                  <div className="h-3 bg-blue-200 rounded-full w-1/2"></div>
                  <div className="flex justify-between pt-2">
                    <div className="h-3 bg-blue-200 rounded-full w-16"></div>
                    <div className="h-3 bg-blue-200 rounded-full w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all hover:shadow-lg text-lg font-medium"
            aria-label="Retry loading videos"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl ">
        {/* Header Section */}
        <div className=" rounded-2xl text-center mb-12 bg-gradient-to-br from-sky-300 via-yellow-300 to-red-400  p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('/images/confetti-pattern.svg')] bg-cover opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black drop-shadow-lg fredoka-700">
              🎥 Our Happy Moments
            </h2>
            <p className="text-lg md:text-xl text-black max-w-3xl mx-auto drop-shadow-md">
              Watch real birthday surprises and see the magic we create! These videos show the joy, laughter, and unforgettable moments we bring to every celebration.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white  p-4 md:p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-all border border-white/20 hover:border-white/40"
              aria-label={`${stat.value} ${stat.label}`}
            >
              <p className="text-4xl md:text-5xl font-bold  mb-2">
                {stat.icon}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-5 mb-8 gap-4 sticky top-0  bg-gray-200 py-7 z-10 border-b border-white/20">
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                  }`}
                aria-label={`Filter by ${filter}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {sourceFilters.map(source => (
              <button
                key={source}
                onClick={() => setSourceFilter(source)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${sourceFilter === source
                    ? source === 'YouTube'
                      ? 'bg-red-500 text-white shadow-md'
                      : source === 'Instagram'
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                  }`}
                aria-label={`Filter by ${source}`}
              >
                {source}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white rounded-full shadow-sm pl-4 border border-gray-200">
            <span className="text-gray-600 text-xs md:text-sm">Sort by:</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-transparent border-0 py-2 pl-2 pr-8 text-xs md:text-sm focus:ring-2 focus:ring-blue-500 rounded-r-full"
              aria-label="Sort videos"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Video */}
        {sortedVideos.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-12 hover:shadow-2xl transition-all duration-300 border border-white/30">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div
                className="relative h-64 lg:h-96 cursor-pointer group"
                onClick={() => handleVideoClick(sortedVideos[0].url)}
                role="button"
                aria-label={`Play featured video: ${sortedVideos[0].title}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleVideoClick(sortedVideos[0].url)}
              >
                <img
                  src={sortedVideos[0].thumbnail}
                  alt={sortedVideos[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={450}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-white w-full">
                    <div className="flex items-center mb-3">
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mr-3 shadow-sm">
                        Featured
                      </span>
                      <span className="text-sm text-white/90 flex items-center">
                        {sortedVideos[0].source === 'Instagram' ? (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                            </svg>
                            {sortedVideos[0].views.toLocaleString()} reach • {sortedVideos[0].likes.toLocaleString()} likes
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                            </svg>
                            {sortedVideos[0].formattedViews}
                            {sortedVideos[0].duration && ` • ${sortedVideos[0].duration}`}
                          </>
                        )}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{sortedVideos[0].title}</h3>
                    <p className="text-white/90 text-sm line-clamp-1">
                      {sortedVideos[0].description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
                <div>
                  <div className="flex items-center mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full mr-3 ${sortedVideos[0].source === 'YouTube'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gradient-to-r from-pink-100 to-orange-100 text-pink-800'
                      }`}>
                      {sortedVideos[0].source}
                    </span>
                    <span className="text-gray-500 text-sm">{formatDate(sortedVideos[0].publishedAt)}</span>
                  </div>
                  <p className="text-gray-700 mb-6 line-clamp-4 text-sm md:text-base">
                    {sortedVideos[0].description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full flex items-center transition-all hover:shadow-lg text-sm md:text-base font-medium"
                    onClick={() => handleVideoClick(sortedVideos[0].url)}
                    aria-label={`Watch ${sortedVideos[0].title}`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Now
                  </button>
                  {/* <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full flex items-center transition-all hover:shadow-lg text-sm md:text-base font-medium"
                    aria-label="Book similar celebration"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
                    </svg>
                    Book Similar
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 cursor-pointer">
          {sortedVideos.slice(1).map(video => (
            <div
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-white/30 hover:border-white/50"
            >
              <div
                className="relative cursor-pointer aspect-video"
                onClick={() => handleVideoClick(video.url)}
                role="button"
                aria-label={`Play video: ${video.title}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleVideoClick(video.url)}
              >
                <div className="overflow-hidden w-full h-full rounded-t-xl">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width={400}
                      height={225}
                    />
                  ) : (
                    <img
                      src={noimageavail}
                      alt="No thumbnail available"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={400}
                      height={225}
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 flex flex-col justify-end p-3">
                  {video.duration && (
                    <span className="text-xs bg-black/70 text-white px-2 py-1 rounded-full self-end mb-1">
                      {video.duration}
                    </span>
                  )}
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${video.source === 'Instagram'
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                        : 'bg-red-500 text-white'
                      }`}>
                      {video.source}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {video.type}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-5 bg-gradient-to-b from-white to-gray-50">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-sm md:text-base">{video.title}</h3>
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    {video.source === 'Instagram' ? (
                      <>
                        <svg className="w-4 h-4 mr-1 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg>
                        {video.views.toLocaleString()} reach • {video.likes.toLocaleString()} likes
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg>
                        {video.formattedViews}
                      </>
                    )}
                  </span>
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                {/* {video.source === 'Instagram' && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      👀 {video.reach.toLocaleString()} reach
                    </span>
                    <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      👍 {video.likes.toLocaleString()} likes
                    </span>
                    <span className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      💬 {video.comments.toLocaleString()} comments
                    </span>
                    {video.shares > 0 && (
                      <span className="flex items-center bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                        🔄 {video.shares.toLocaleString()} shares
                      </span>
                    )}
                  </div>
                )} */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs md:text-sm text-gray-500">
                    {video.comments > 0 && (
                      <>
                        <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                        </svg>
                        {video.comments.toLocaleString()}
                      </>
                    )}
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm font-medium cursor-pointer"
                    onClick={() => handleVideoClick(video.url)}
                    aria-label={`Play ${video.title}`}
                  >
                    Watch
                    <svg className="w-4 h-4 ml-1 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;