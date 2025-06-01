import { useState } from 'react';

const SurprisePlanner = () => {
  // Replace with your WhatsApp number (with country code, no '+' or '0')
  const whatsappNumber = '919876543210'; // Example: 91 for India + 9876543210

  const [surpriseType, setSurpriseType] = useState(null);
  const [formData, setFormData] = useState({
    kidsCount: 1,
    gamesCount: 0,
    cakeSize: '',
    giftsCount: 0,
    videoShoot: false,
    selectedCharacters: []
  });
  
  const [previewCharacter, setPreviewCharacter] = useState(null);

  // Character data with image URLs
  const characters = [
    { 
      name: "Chhota Bheem", 
      emoji: "🏹", 
      price: 500,
      image: "https://example.com/chhota-bheem.jpg" // Replace with actual image URL
    },
    { 
      name: "Doraemon", 
      emoji: "🤖", 
      price: 600,
      image: "https://example.com/doraemon.jpg" // Replace with actual image URL
    },
    { 
      name: "Captain America", 
      emoji: "🛡️", 
      price: 800,
      image: "https://example.com/captain-america.jpg" // Replace with actual image URL
    },
    { 
      name: "Iron Man", 
      emoji: "🔴", 
      price: 1000,
      image: "https://example.com/iron-man.jpg" // Replace with actual image URL
    }
  ];

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

  const calculateTotal = () => {
    const charactersCost = formData.selectedCharacters.reduce((sum, char) => {
      const character = characters.find(c => c.name === char);
      return sum + (character?.price || 0);
    }, 0);
    
    return 2000 + (formData.gamesCount * 200) + (formData.videoShoot ? 2500 : 0) + charactersCost;
  };

  const handleSubmit = (time) => {
    // Format the message
    const selectedChars = formData.selectedCharacters.length > 0 
      ? formData.selectedCharacters.join(', ')
      : 'None selected';
    
    const message = `🎉 *New ${time} Surprise Booking Request* 🎉
    
👶 *Kids Count:* ${formData.kidsCount}
🎮 *Games:* ${formData.gamesCount} (₹${formData.gamesCount * 200})
🦸 *Characters:* ${selectedChars}
🎂 *Cake Size:* ${formData.cakeSize || 'Not selected'}
🎁 *Gifts:* ${formData.giftsCount}
📹 *Video Shoot:* ${formData.videoShoot ? 'Yes (₹2500)' : 'No'}
💰 *Total Estimated Cost:* ₹${calculateTotal().toLocaleString()}

Please contact me to confirm this booking!`;

    // Open WhatsApp with the message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className='pt-20 py-10 bg-[rgb(245,244,251)]'>
      <div className='flex justify-center pb-15 text-4xl text-blue-500 font-bold'>🎈 Choose Your Surprise Time</div>
      
      <div id='surprise-planner' className="flex flex-col md:flex-row justify-center gap-4 mb-12">
        <button
          onClick={() => setSurpriseType('morning')}
          className={`p-10 cursor-pointer rounded-full text-lg font-medium ${surpriseType === 'morning' ? 'bg-yellow-300 text-red-600' : 'bg-white text-blue-800'}`}
        >
          🌞 Morning Surprise (6am-12pm)
        </button>
        <button
          onClick={() => setSurpriseType('evening')}
          className={`p-10 cursor-pointer rounded-full text-lg font-medium ${surpriseType === 'evening' ? 'bg-gray-600 text-white' : 'bg-white text-blue-800'}`}
        >
          🌙 Evening Surprise (4pm-9pm)
        </button>
      </div>

      {/* Character Preview Modal */}
      {previewCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{previewCharacter.name}</h3>
              <button 
                onClick={() => setPreviewCharacter(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <img 
              src={previewCharacter.image} 
              alt={previewCharacter.name}
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}

      {surpriseType === 'morning' && (
        <div className="w-full max-w-2xl mx-auto border-2 border-dashed border-yellow-400 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-2xl text-center mb-6 text-blue-600">
            🌞 Morning Surprise Planner
          </h3>

          <div className="space-y-6">
            {/* Kids Count */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                👶 Kids Present
              </label>
              <input
                type="number"
                name="kidsCount"
                min="1"
                value={formData.kidsCount}
                onChange={handleChange}
                className="w-full p-2 border-2 border-blue-200 rounded-lg focus:border-blue-400"
              />
            </div>

            {/* Games */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                🎮 Games (₹200 per game)
              </label>
              <select
                name="gamesCount"
                value={formData.gamesCount}
                onChange={handleChange}
                className="w-full p-2 border-2 border-blue-200 rounded-lg focus:border-blue-400"
              >
                {[0, 1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'game' : 'games'}
                  </option>
                ))}
              </select>
            </div>

            {/* Characters */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                🦸 Choose Characters
              </label>
              <div className="grid grid-cols-2 gap-3">
                {characters.map(character => (
                  <div
                    key={character.name}
                    className={`flex items-center justify-between p-3 bg-white rounded-lg border-2 ${
                      formData.selectedCharacters.includes(character.name) 
                        ? 'border-blue-400' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.selectedCharacters.includes(character.name)}
                        onChange={() => toggleCharacter(character.name)}
                        className="mr-2"
                      />
                      <span>
                        {character.emoji} {character.name} - ₹{character.price}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewCharacter(character);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                      title="Preview character"
                    >
                      👁️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cake Size */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                🎂 Birthday Cake
              </label>
              <select
                name="cakeSize"
                value={formData.cakeSize}
                onChange={handleChange}
                className="w-full p-2 border-2 border-blue-200 rounded-lg focus:border-blue-400"
              >
                <option value="">Select cake size</option>
                <option value="small">Small (₹500)</option>
                <option value="medium">Medium (₹800)</option>
                <option value="large">Large (₹1200)</option>
              </select>
            </div>

            {/* Gifts */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                🎁 Gifts for Birthday Kid
              </label>
              <select
                name="giftsCount"
                value={formData.giftsCount}
                onChange={handleChange}
                className="w-full p-2 border-2 border-blue-200 rounded-lg focus:border-blue-400"
              >
                {[0, 1, 2, 3].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'gift' : 'gifts'}
                  </option>
                ))}
              </select>
            </div>

            {/* Video Shoot */}
            <div
              className={`flex items-center p-4 bg-white rounded-lg border-2 ${
                formData.videoShoot ? 'border-blue-400' : 'border-gray-200'
              } cursor-pointer`}
              onClick={() => setFormData(prev => ({
                ...prev,
                videoShoot: !prev.videoShoot
              }))}
            >
              <input
                type="checkbox"
                checked={formData.videoShoot}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  videoShoot: !prev.videoShoot
                }))}
                className="mr-2"
              />
              <span className="font-semibold text-gray-700">
                📹 Video + Photo Shoot - ₹2,500
              </span>
            </div>

            {/* Total Cost */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                🎉 Total Cost: ₹{calculateTotal().toLocaleString()}
              </h3>
              <button 
                onClick={() => handleSubmit('Morning')}
                className="cursor-pointer mt-4 bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg text-lg"
              >
                📅 Book My Morning Surprise
              </button>
            </div>
          </div>
        </div>
      )}

      {surpriseType === 'evening' && (
        <div className="w-full max-w-2xl mx-auto border-2 border-dashed border-yellow-400 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-lg p-6 shadow-md">
          {/* Evening form content (similar to morning) */}
          {/* ... */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              🎉 Total Cost: ₹{calculateTotal().toLocaleString()}
            </h3>
            <button 
              onClick={() => handleSubmit('Evening')}
              className="cursor-pointer mt-4 bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg text-lg"
            >
              📅 Book My Evening Surprise
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurprisePlanner;