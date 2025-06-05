import { motion } from 'framer-motion';
import React from 'react';
import { HashLink } from 'react-router-hash-link';

const HowItWorks = () => {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust for fixed header
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const steps = [
    {
      id: 1,
      title: "Choose Your Surprise",
      description: "Pick between our morning wake-up surprise, evening party package, or both!",
      icon: "📅",
      color: "from-blue-100 to-blue-200",
      details: ["🌞 Morning: 6am-12pm", "🌙 Evening: 4pm-10pm"],
      link: "#surprise-planner"
    },
    {
      id: 2,
      title: "Customize the Magic",
      description: "Select characters, cake, games, and gifts to create the perfect experience",
      icon: "✨",
      color: "from-yellow-100 to-yellow-200",
      tags: ["🦸 Characters", "🎂 Cake", "🎁 Gifts"],
      link: "#surprise-planner" // Added link to step 2
    },
    {
      id: 3,
      title: "We Deliver the Joy",
      description: "Our team arrives with all the fun - you just enjoy the priceless reactions!",
      icon: "🎁",
      color: "from-purple-100 to-pink-200",
      extras: ["Professional setup", "Full coordination", "Memorable moments"],
      link: "#surprise-planner" // Added link to step 3
    }
  ];

  const inclusions = [
    "🎭 Cartoon Characters",
    "🎂 Fresh Cake (Eggless)",
    "🎮 2+ Games",
    "🎁 Return Gifts",
    "🎤 Anchoring",
    "📸 Optional Video Shoot"
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50" id="how-it-works">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16 relative"
        >
          <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-5xl sm:text-6xl opacity-10">
            ✨
          </div>
          <h2 className="fredoka-700 text-2xl sm:text-3xl md:text-4xl text-purple-800 mb-3 sm:mb-4">
            How <span className="text-yellow-500">Kidz Kapers</span> Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Creating magical birthday memories in just 3 simple steps
          </p>
        </motion.div>

        {/* Steps Section - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Decorative Connector Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-[120px] left-4 right-4 h-1.5 bg-gradient-to-r from-blue-200 via-yellow-200 to-pink-200 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex flex-col items-center z-10 bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
              whileHover={{ y: -5 }}
              onClick={(e) => {
                const el = document.querySelector(step.link);
                if (el) {
                  e.preventDefault();
                  scrollWithOffset(el);
                }
              }}
            >
              {/* Step Indicator */}
              <div className={`relative mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl sm:text-4xl shadow-md`}>
                {step.icon}
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-sm border border-purple-200">
                  <span className="text-sm sm:text-base font-bold text-purple-800">{step.id}</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{step.description}</p>

                {/* Dynamic Content Based on Step */}
                {step.details && (
                  <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
                    {step.details.map((detail, i) => (
                      <div key={i}>{detail}</div>
                    ))}
                  </div>
                )}

                {step.tags && (
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-2">
                    {step.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Package Inclusions - Responsive Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-white rounded-xl p-6 sm:p-8 shadow-md border border-gray-100 max-w-4xl mx-auto"
        >
          <h3 className="text-lg sm:text-xl font-bold text-center text-purple-800 mb-4 sm:mb-6">
            Every Package Includes:
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {inclusions.map((item, i) => (
              <div key={i} className="flex items-start sm:items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2 text-purple-600 flex-shrink-0 mt-0.5 sm:mt-0">
                  {item.match(/^.{1,2}/)[0]}
                </div>
                <span className="text-sm sm:text-base">{item.replace(/^.{1,2}\s/, '')}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <HashLink
            to="#surprise-planner"
            scroll={scrollWithOffset}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Start Planning Your Surprise Now →
          </HashLink>
          <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
            Limited slots available! Book 7 days in advance for best availability.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;