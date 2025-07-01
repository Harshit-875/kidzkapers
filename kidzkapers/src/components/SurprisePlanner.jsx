import { useState, useEffect } from 'react';

const SurprisePlanner = ({ initialValues = {}, onClose }) => {
  const whatsappNumber = '918600257360';
  const [surpriseType, setSurpriseType] = useState(initialValues.surpriseType || null);
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    parentName: initialValues.parentName || '',
    address: initialValues.address || '',
    email: initialValues.email || '',
    mobile: initialValues.mobile || '',
    gender: initialValues.gender || '',
    dateOfBirth: initialValues.dateOfBirth || '',
    kidsCount: initialValues.kidsCount || 1,
    gamesCount: initialValues.gamesCount || 1,
    cakeSize: initialValues.cakeSize || '',
    cakeFlavor: initialValues.cakeFlavor || '',
    giftsCount: initialValues.giftsCount || 0,
    shootOption: initialValues.shootOption || 'free',
    selectedCharacters: initialValues.selectedCharacters || [],
    timeSlot: initialValues.timeSlot || '',
    packageType: initialValues.packageType || '',
    freeExtras: initialValues.freeExtras !== undefined ? initialValues.freeExtras : true
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        ...initialValues,
        name: prev.name || initialValues.name || '',
        parentName: prev.parentName || initialValues.parentName || '',
        address: prev.address || initialValues.address || '',
        email: prev.email || initialValues.email || '',
        mobile: prev.mobile || initialValues.mobile || '',
        dateOfBirth: prev.dateOfBirth || initialValues.dateOfBirth || '',
        cakeSize: prev.cakeSize || initialValues.cakeSize || '',
        cakeFlavor: prev.cakeFlavor || initialValues.cakeFlavor || '',
        timeSlot: prev.timeSlot || initialValues.timeSlot || '',
        freeExtras: prev.freeExtras !== undefined ? prev.freeExtras : true
      }));
      
      if (initialValues.surpriseType) {
        setSurpriseType(initialValues.surpriseType);
      }
    }
  }, [initialValues]);

  const [previewCharacter, setPreviewCharacter] = useState(null);
  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const timeSlots = surpriseType === 'morning' 
    ? ['6:00 AM - 8:00 AM', '8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM']
    : ['4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM', '8:00 PM - 10:00 PM'];

  const initialCharacters = [
    {
      name: "Batman",
      emoji: "🦇",
      price: 2199,
      image: "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/89093/93728/DC-Comics-Batman-Caped-Crusader-official-cardboard-cutout-buy-now-at-starstills__04189.1582849820.jpg?c=2"
    },
    {
      name: "Spiderman",
      emoji: "🕷️",
      price: 2199,
      image: "https://i.pinimg.com/originals/2f/0a/9d/2f0a9d0b5c5b5e5b5e5b5e5b5e5b5e5b.jpg"
    },
    {
      name: "Mickey Mouse",
      emoji: "🐭",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Minnie Mouse",
      emoji: "🐁",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
  ];

  const additionalCharacters = [
    {
      name: "Iron Man",
      emoji: "🔴",
      price: 2199,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1l5fR_5J_LRooC8aw-PkMF8XJWK18bdikQQ&s"
    },
    {
      name: "Thor",
      emoji: "⚡",
      price: 2199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Hulk",
      emoji: "💪",
      price: 2199,
      image: "https://www.pngmart.com/files/15/Hulk-PNG-Transparent-Image.png"
    },
    {
      name: "Captain America",
      emoji: "🛡️",
      price: 2199,
      image: "https://www.shutterstock.com/image-vector/captain-america-stand-walk-art-600nw-2291276013.jpg"
    },
    {
      name: "Motu",
      emoji: "👬",
      price: 2999,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt4BzFLn4-PyzRx5XawdpYZZRCG5kvvWJaYw&s"
    },
    {
      name: "Patlu",
      emoji: "👬",
      price: 2999,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt4BzFLn4-PyzRx5XawdpYZZRCG5kvvWJaYw&s"
    },
    {
      name: "Olaf",
      emoji: "⛄",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Paw Patrol (Zuma)",
      emoji: "🐶",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Paw Patrol (Sky)",
      emoji: "🐕",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Cocomelon",
      emoji: "🍉",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Peppa Pig",
      emoji: "🐷",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Naruto",
      emoji: "🍥",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Sonic",
      emoji: "🌀",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
    {
      name: "Minion",
      emoji: "💛",
      price: 3199,
      image: "https://i.pinimg.com/originals/9f/1d/97/9f1d97fab1a895b6a1a5a1e8a5a1f7e5.jpg"
    },
  ];

  const allCharacters = [...initialCharacters, ...additionalCharacters];
  const displayedCharacters = showAllCharacters ? allCharacters : initialCharacters;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleCharacter = (name) => {
    setFormData(prev => {
      const newCharacters = prev.selectedCharacters.includes(name)
        ? prev.selectedCharacters.filter(char => char !== name)
        : [...prev.selectedCharacters, name];
      return { ...prev, selectedCharacters: newCharacters };
    });
  };

  const handleShootOption = (option) => {
    setFormData(prev => ({
      ...prev,
      shootOption: option
    }));
  };

  const toggleFreeExtras = () => {
    setFormData(prev => ({
      ...prev,
      freeExtras: !prev.freeExtras
    }));
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'FIRSTSURPRISE') {
      setIsCouponApplied(true);
      setCouponError('');
    } else {
      setIsCouponApplied(false);
      setCouponError('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  const calculateSubtotal = () => {
    const charactersCost = formData.selectedCharacters.reduce((sum, char) => {
      const character = allCharacters.find(c => c.name === char);
      return sum + (character?.price || 0);
    }, 0);

    const cakeCost = {
      'xsmall': 300,
      'small': 600,
      'medium': 1000,
      'large': 1500,
      'xlarge': 2300
    }[formData.cakeSize] || 0;

    const shootCost = formData.shootOption === 'premium' ? 5000 : 0;
    
    // Base game cost (600 for morning, 1000 for evening)
    const baseGameCost = surpriseType === 'morning' ? 1600 : 2000;
    
    // Additional charge per kid per game (80 per kid per game)
    const perKidGameCharge = formData.kidsCount * formData.gamesCount * 100;
    
    // Total games cost
    const gamesCost = (baseGameCost * formData.gamesCount) + perKidGameCharge;
    
    const giftsCost = formData.giftsCount * 350;

    return gamesCost + shootCost + charactersCost + cakeCost + giftsCost;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (isCouponApplied) {
      return subtotal * 0.95;
    }
    return subtotal;
  };

  const handleSubmit = (time) => {
    const selectedChars = formData.selectedCharacters.length > 0
      ? formData.selectedCharacters.join(', ')
      : 'None selected';

    const shootOption = formData.shootOption === 'premium'
      ? 'Premium Video+Photo Shoot (₹5000) - Professional DSLR, 5 collaborative reels, 1 edited video, photos, raw video'
      : 'Free Video+Photo Shoot - Mobile camera, 2-3 collaborative reels, photos, raw video';

    const freeExtras = formData.freeExtras 
      ? 'Yes (2 party poppers, balloons, chocolates, little surprise gifts)'
      : 'No';

    const message = `🎉 *New ${time} Surprise Booking Request* 🎉
    
👶 *Child's Name:* ${formData.name}
👨‍👩‍👧 *Parent's Name:* ${formData.parentName || 'Not specified'}
🏠 *Address:* ${formData.address || 'Not specified'}
📧 *Email:* ${formData.email || 'Not specified'}
📱 *Mobile:* ${formData.mobile || 'Not specified'}
👦 *Gender:* ${formData.gender || 'Not specified'}
🎂 *Date of Birth:* ${formData.dateOfBirth || 'Not specified'}
⏰ *Time Slot:* ${formData.timeSlot || 'Not selected'}
🧒 *Kids Present:* ${formData.kidsCount}
🎮 *Games:* ${formData.gamesCount} (Base: ₹${surpriseType === 'morning' ? '600' : '1000'} per game + ₹80 per kid per game)
🦸 *Characters:* ${selectedChars}
🎂 *Cake Size:* ${formData.cakeSize || 'Not selected'} (${formData.cakeFlavor || 'No flavor selected'})
🎁 *Gifts:* ${formData.giftsCount}
🎊 *Free Extras:* ${freeExtras}
📸 *Shoot Option:* ${shootOption}
${isCouponApplied ? '🎟️ *Coupon Applied:* FIRSTSURPRISE (5% discount)\n' : ''}💰 *Total Estimated Cost:* ₹${calculateTotal().toLocaleString()}

Please contact me to confirm this booking!`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear());
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className='pt-20 py-10 bg-[rgb(245,244,251)] px-4 sm:px-6 lg:px-8'>
      <div className='fredoka-700 flex justify-center pb-8 text-3xl sm:text-4xl text-blue-800 font-extrabold text-center px-4'>
        🎈 Choose Your Surprise Time
      </div>

      <div id='surprise-planner' className="flex flex-col md:flex-row justify-center gap-4 mb-12 max-w-4xl mx-auto">
        <button
          onClick={() => setSurpriseType('morning')}
          className={`
            p-6 md:p-10 cursor-pointer rounded-2xl text-base sm:text-lg font-medium
            transition-all duration-300 transform hover:scale-105
            border-4 ${surpriseType === 'morning' ? 'border-yellow-400' : 'border-transparent'}
            ${surpriseType === 'morning'
              ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-white shadow-xl'
              : 'bg-white text-blue-500 hover:bg-gray-100 shadow-md'}
            relative overflow-hidden
          `}
        >
          {surpriseType === 'morning' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping absolute h-20 w-20 rounded-full bg-yellow-400 opacity-20"></div>
            </div>
          )}
          <span className="relative z-10 fredoka-700">
            🌞 Morning Surprise (6am-12pm)
          </span>
        </button>

        <button
          onClick={() => setSurpriseType('evening')}
          className={`
            p-6 md:p-10 cursor-pointer rounded-2xl text-base sm:text-lg font-medium
            transition-all duration-300 transform hover:scale-105
            border-4 ${surpriseType === 'evening' ? 'border-purple-400' : 'border-transparent'}
            ${surpriseType === 'evening'
              ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl'
              : 'bg-white text-blue-500 hover:bg-gray-100 shadow-md'}
            relative overflow-hidden
          `}
        >
          {surpriseType === 'evening' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping absolute h-20 w-20 rounded-full bg-purple-400 opacity-20"></div>
            </div>
          )}
          <span className="relative z-10  fredoka-700">
            🌙 Evening Surprise (4pm-10pm)
          </span>
        </button>
      </div>

      {previewCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{previewCharacter.name}</h3>
              <button
                onClick={() => setPreviewCharacter(null)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl"
              >
                X
              </button>
            </div>
            <img
              src={previewCharacter.image}
              alt={previewCharacter.name}
              className="w-full h-auto rounded max-h-[60vh] object-contain"
            />
            <div className="mt-4 text-center font-bold text-lg">
              Price: ₹{previewCharacter.price}
            </div>
          </div>
        </div>
      )}

      {surpriseType && (
        <div className={`w-full max-w-4xl mx-auto border-2 border-dashed border-yellow-400 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-lg p-4 sm:p-6 shadow-md mb-10`}>
          <h3 className="font-bold text-xl sm:text-2xl text-center mb-6 text-blue-600">
            {surpriseType === 'morning' ? '🌞 Morning' : '🌙 Evening'} Surprise Planner
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {/* Child's Name Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                👶 Child's Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Enter child's name"
                required
              />
            </div>

            {/* Parent's Name Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                👨‍👩‍👧 Parent's Name
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Enter parent's name"
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                🏠 Address (Where surprise is planned)
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Enter full address with landmark"
                rows="3"
                required
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                  📧 Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                  📱 Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>

            {/* Gender Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                👦 Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Boy', 'Girl'].map(gender => (
                  <label
                    key={gender}
                    className={`p-2 sm:p-3 bg-white rounded-lg border-2 cursor-pointer text-center transition
                      ${formData.gender === gender.toLowerCase()
                        ? 'border-blue-400 bg-blue-50 shadow-inner'
                        : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      checked={formData.gender === gender.toLowerCase()}
                      onChange={() => setFormData(prev => ({ ...prev, gender: gender.toLowerCase() }))}
                      className="mr-2 hidden"
                    />
                    {gender === 'Boy' ? '👦 Boy' : '👧 Girl'}
                  </label>
                ))}
              </div>
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 mt-4 text-sm sm:text-base">
                🎂 Date of Birth (Must be born after 2014)
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={maxDateString}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                required
              />
            </div>

            {/* Time Slot Field */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                ⏰ Time Slot
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                required
              >
                <option value="">Select time slot</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Kids Count */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                👶 Kids Present
              </label>
              <input
                type="number"
                name="kidsCount"
                min="1"
                value={formData.kidsCount}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                required
              />
            </div>

            {/* Games */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                🎮 Games
              </label>
              <select
                name="gamesCount"
                value={formData.gamesCount}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                required
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'game' : 'games'} 
                  </option>
                ))}
              </select>
            </div>

            {/* Characters */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3 text-sm sm:text-base">
                🦸 Choose Characters
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayedCharacters.map(character => (
                  <div
                    key={character.name}
                    className={`flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg border-2 transition
                      ${formData.selectedCharacters.includes(character.name)
                        ? 'border-blue-400 bg-blue-50 shadow-inner'
                        : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <div className="flex items-center truncate">
                      <input
                        type="checkbox"
                        checked={formData.selectedCharacters.includes(character.name)}
                        onChange={() => toggleCharacter(character.name)}
                        className="mr-2 h-4 w-4"
                      />
                      <span className="truncate">
                        {character.emoji} {character.name}
                      </span>
                    </div>
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewCharacter(character);
                      }}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2 flex-shrink-0"
                      title="Preview character"
                    >
                      👁️
                    </button> */}
                  </div>
                ))}
              </div>
              {!showAllCharacters ? (
                <button
                  onClick={() => setShowAllCharacters(true)}
                  className="mt-3 text-blue-600 hover:text-blue-800 font-medium cursor-pointer text-sm sm:text-base w-full text-center py-2 bg-blue-50 rounded-lg"
                >
                  ↓ View More Characters ↓
                </button>
              ) : (
                <button
                  onClick={() => setShowAllCharacters(false)}
                  className="mt-3 text-blue-600 hover:text-blue-800 font-medium cursor-pointer text-sm sm:text-base w-full text-center py-2 bg-blue-50 rounded-lg"
                >
                  ↑ View Less Characters ↑
                </button>
              )}
            </div>

            {/* Cake Size */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                🎂 Birthday Cake
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">Size</label>
                  <select
                    name="cakeSize"
                    value={formData.cakeSize}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                  >
                    <option value="">Select size</option>
                    <option value="xsmall">Bento Cake</option>
                    <option value="small">500gm</option>
                    <option value="medium">750gm</option>
                    <option value="large">1Kg</option>
                    <option value="xlarge">2Kg</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">Flavor</label>
                  <select
                    name="cakeFlavor"
                    value={formData.cakeFlavor}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                  >
                    <option value="">Select flavor</option>
                    <option value="chocolate">Chocolate</option>
                    <option value="vanilla">Vanilla</option>
                    <option value="strawberry">Strawberry</option>
                    <option value="butterscotch">Butterscotch</option>
                    <option value="pineapple">Pineapple</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Gifts */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                🎁 Gifts for Birthday Kid
              </label>
              <select
                name="giftsCount"
                value={formData.giftsCount}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
              >
                {[1, 2, 3].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'gift' : 'gifts'}
                  </option>
                ))}
              </select>
            </div>

            {/* Free Extras */}
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${formData.freeExtras 
                  ? 'border-green-400 bg-green-50 shadow-inner' 
                  : 'border-gray-200 hover:border-green-200'}`}
              onClick={toggleFreeExtras}
            >
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={formData.freeExtras}
                    readOnly
                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">🎊 Free Extras (Included)</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    • 2 Party Poppers 🎉<br />
                    • Decorative Balloons 🎈<br />
                    • Chocolates for kids 🍫<br />
                    • Little surprise gifts 🎁
                  </p>
                </div>
              </div>
            </div>

            {/* Shoot Options */}
            <div className="space-y-4">
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                📸 Shoot Options
              </label>
              
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${formData.shootOption === 'free' 
                    ? 'border-green-400 bg-green-50 shadow-inner' 
                    : 'border-gray-200 hover:border-green-200'}`}
                onClick={() => handleShootOption('free')}
              >
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      checked={formData.shootOption === 'free'}
                      readOnly
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">Free Video+Photo Shoot</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      • Mobile camera quality<br />
                      • 2-3 collaborative reels<br />
                      • Photos + raw video<br />
                      • Basic editing
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${formData.shootOption === 'premium' 
                    ? 'border-purple-400 bg-purple-50 shadow-inner' 
                    : 'border-gray-200 hover:border-purple-200'}`}
                onClick={() => handleShootOption('premium')}
              >
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      checked={formData.shootOption === 'premium'}
                      readOnly
                      className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">Premium Video+Photo Shoot (₹5000)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      • Professional DSLR camera<br />
                      • 5 collaborative reels<br />
                      • 1 professionally edited video<br />
                      • High-quality photos + raw video<br />
                      • Premium editing and effects
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-4">
              <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                🎟️ Coupon Code
              </label>
              {!isCouponApplied ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition transform hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
                  <span className="font-medium">🎉 Coupon "FIRSTSURPRISE" applied (5% discount)</span>
                  <button
                    onClick={removeCoupon}
                   
                    className="text-green-600 hover:text-green-800 font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <div className="text-red-500 text-sm mt-1">{couponError}</div>
              )}
            </div>

            {/* Total Cost */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 sm:p-6 rounded-lg text-white text-center shadow-lg mt-6">
              <div className="mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold">
                  Subtotal: ₹{calculateSubtotal().toLocaleString()}
                </h3>
                {isCouponApplied && (
                  <h4 className="text-sm sm:text-base font-medium">
                    Discount (5%): -₹{(calculateSubtotal() * 0.05).toLocaleString()}
                  </h4>
                )}
                <h3 className="text-xl sm:text-2xl font-bold mt-2">
                  🎉 Total Estimated Cost: ₹{calculateTotal().toLocaleString()}
                </h3>
              </div>
              <button
                onClick={() => handleSubmit(surpriseType === 'morning' ? 'Morning' : 'Evening')}
                className="cursor-pointer mt-3 sm:mt-4 bg-white text-green-600 hover:bg-gray-100 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg transition transform hover:scale-105 shadow-md w-full sm:w-auto"
              >
                📅 Book My {surpriseType === 'morning' ? 'Morning' : 'Evening'} Surprise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurprisePlanner;