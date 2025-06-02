export default function Testimonials() {
    const testimonials = [
      {
        id: 1,
        quote: "My son couldn't believe Captain America was at our house in the morning! The look on his face was priceless.",
        author: "Neha, Nagpur",
        rating: 5
      },
      {
        id: 2,
        quote: "They made the birthday feel magical – games, characters, and fun! All the kids had an amazing time.",
        author: "Rajiv, Nagpur",
        rating: 5
      },
      {
        id: 3,
        quote: "The morning surprise was the perfect way to start my daughter's birthday. She's still talking about it weeks later!",
        author: "Priya, Nagpur",
        rating: 5
      }
    ];
  
    return (
      <section className="py-12 px-4 bg-blue-100">
        <div className="container mx-auto">
          <h2 className="fredoka-700 text-3xl font-bold text-center mb-8 text-blue-800">💖 What Parents Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-medium text-blue-800">– {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  