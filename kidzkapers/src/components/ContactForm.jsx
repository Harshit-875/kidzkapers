import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childNameAge: '',
    birthdayDate: '',
    surpriseIdea: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `
Hi Kidz Kapers! I'd like to book a birthday surprise:

*Parent's Name:* ${formData.parentName}
*Phone Number:* ${formData.phone}
*Child's Name & Age:* ${formData.childNameAge}
*Birthday Date:* ${formData.birthdayDate}
*Surprise Idea:* ${formData.surpriseIdea}
    `.trim();

    const whatsappUrl = `https://wa.me/918600257360?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-white" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="fredoka-700 text-3xl sm:text-4xl font-bold text-blue-800 mb-3 md:mb-4 font-sans">
            Plan Your Perfect Surprise
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Fill this form and we'll get back to you within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-blue-50 p-5 sm:p-6 md:p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="parentName" className="block text-gray-700 font-bold">
                Parent's Name
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-gray-700 font-bold">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-100 rounded-l-lg border-r border-gray-300">
                  <span className="text-gray-600">+91</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-14 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="98765 43210"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="childNameAge" className="block text-gray-700 font-bold">
                Child's Name & Age
              </label>
              <input
                type="text"
                id="childNameAge"
                name="childNameAge"
                value={formData.childNameAge}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Arjun, 7 years old"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="birthdayDate" className="block text-gray-700 font-bold">
                When is the birthday?
              </label>
              <input
                type="date"
                id="birthdayDate"
                name="birthdayDate"
                value={formData.birthdayDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-700"
                required
              />
            </div>
          </div>

          <div className="mb-6 md:mb-8 space-y-2">
            <label htmlFor="surpriseIdea" className="block text-gray-700 font-bold">
              Tell us about your surprise idea
            </label>
            <textarea
              id="surpriseIdea"
              name="surpriseIdea"
              value={formData.surpriseIdea}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Any specific characters, themes, or requirements..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 sm:py-3.5 sm:px-8 rounded-full text-base sm:text-lg shadow-md transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center mx-auto"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send Message via WhatsApp
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
            Or call us directly at <a href="tel:+918600257360" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">+91 86002 57360</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;