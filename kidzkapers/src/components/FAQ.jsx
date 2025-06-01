const FAQ = () => {
  const faqs = [
    {
      question: "How early should I book?",
      answer: "We recommend booking at least 3-5 days in advance to ensure availability of your preferred characters and time slot.",
      icon: "📅"
    },
    {
      question: "Do you provide the cake?",
      answer: "Yes! We bring fresh, delicious birthday cakes in various sizes. You can choose the size in our calculator above.",
      icon: "🎂"
    },
    {
      question: "Are the characters real people in costumes?",
      answer: "Yes, our trained performers wear high-quality costumes and know how to interact with children in character.",
      icon: "🦸"
    },
    {
      question: "What if it rains during an outdoor party?",
      answer: "We can easily adapt to indoor spaces. Our team is flexible and will work with you to ensure the party goes on!",
      icon: "⛈️"
    },
    {
      question: "What areas do you serve?",
      answer: "We currently cover all of Nagpur city and surrounding areas within 20km.",
      icon: "📍"
    },
    {
      question: "Can we request custom characters?",
      answer: "Absolutely! We can arrange most popular characters. Special requests may require extra lead time.",
      icon: "✨"
    }
  ];

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="fredoka-700 text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            🤔 Quick Questions & Answers
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our birthday surprises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 border-yellow-400"
            >
              <div className="flex items-start mb-3">
                <span className="text-2xl mr-3">{faq.icon}</span>
                <h3 className="fredoka-700 text-xl text-blue-700">
                  {faq.question}
                </h3>
              </div>
              <p className="text-gray-700 pl-9">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Still have questions? We're happy to help!
          </p>
          <a href="tel:8600257360">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all hover:scale-105">
              Contact Us
            </button>
          </a>

        </div>
      </div>
    </section>
  );
};

export default FAQ;