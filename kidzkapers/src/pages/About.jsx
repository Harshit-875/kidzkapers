import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HashLink } from "react-router-hash-link";

// Import team member images (replace with actual imports)
import sanskar from "../assets/team/sanskar.png";
import shrihari from "../assets/team/shrihari.png";
import roshani from "../assets/team/roshani.jpg";
import gourav from "../assets/team/gourav.jpg";
import rohit from "../assets/team/rohit.jpg";
const scrollWithOffset = (el) => {
  if (!el) return;

  const headerOffset = window.innerWidth <= 768 ? 60 : 80;

  // Ensure DOM is ready and handle mobile height correctly
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const elementTop = el.getBoundingClientRect().top + scrollTop;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const scrollTarget = elementTop - (viewportHeight / 2) + (el.offsetHeight / 2) - headerOffset;

  window.scrollTo({
    top: scrollTarget,
    behavior: 'smooth',
  });
};

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Sanskar Agarwal",
      role: "Founder & CEO",
      description: "The heart and mind behind Kidz Kapers. Sanskar started it all — from planning every detail to personally anchoring many events. He leads the business, drives innovation, and ensures every child receives joy.",
      image: sanskar
    },
    {
      name: "Shrihari Bolwatkar",
      role: "Creative Director",
      description: "Every game and superhero mask you see? That's Shrihari's magic. He designs custom games, builds creative experiences, and crafts unique superhero faces that bring Kidz Kapers to life.",
      image: shrihari
    },
    {
      name: "Roshani Kumbhalkar",
      role: "Strategy & Campaign Manager",
      description: "From accounts to Meta ad campaigns, Roshani keeps Kidz Kapers organized and visible online. Her dual role ensures we reach the right audience while staying financially sound.",
      image: roshani
    },
    {
      name: "Gourav Dayma",
      role: "Research & Event Operations Lead",
      description: "Our go-to for back-end planning and research. From sourcing props to understanding child behavior trends, he ensures every event runs smoothly behind the scenes.",
      image: gourav
    },
    {
      name: "Rohit Dhurwe",
      role: "Visuals & Tech Coordinator",
      description: "The man behind the lens. Rohit handles all video shooting, photography, and backstage coordination to ensure every smile is captured beautifully.",
      image: rohit
    }
  ];

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section - Updated with new styling */}
      <section className="pt-12 md:pt-13 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sky-300 via-yellow-300 to-red-400 text-center  md:mb-16 h-64 md:h-80 flex flex-col justify-center items-center p-6 md:p-8 rounded-2xl shadow-md">
          <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 fredoka-700 tracking-tight">
            About Kidz Kapers
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 font-medium max-w-2xl mx-auto">
            Where magic meets professional celebration planning
          </p>
          <HashLink
            smooth
            scroll={scrollWithOffset}
            to="/#surprise-planner"
            className="inline-block mt-6 bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-100 transition-all shadow-lg hover:shadow-xl"
          >
            Book a Surprise Now
          </HashLink>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="pt-0 pb-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Creating Magical Memories Since Day One
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              At Kidz Kapers, we don't just plan birthday surprises — we create unforgettable memories that children will cherish for years.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 text-left my-8 rounded-r-lg">
              <p className="text-xl italic text-gray-700">
                "Every child deserves a magical birthday — not just balloons, but real wonder."
              </p>
            </div>
            <p className="text-lg text-gray-600">
              Founded in Nagpur, we are on a mission to make kids across India wake up to smiles, superheroes, cake, and joy. Whether it's a surprise visit from their favorite cartoon character, fun games designed just for them, or gifts that light up their eyes — we make sure your child feels like the hero of their story.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-xl text-gray-600">
              To become India's most loved surprise brand for kids, starting from Nagpur and growing one smile at a time — by combining <span className="font-semibold text-purple-600">creativity, emotion, and celebration</span> into every moment we create.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate creators who make the magic happen at every Kidz Kapers event.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-yellow-300 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Why Parents Trust Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                "✅ Surprise character entry",
                "✅ Games created for your space & theme",
                "✅ Gifts for all kids",
                "✅ Photo + video coverage",
                "✅ Anchoring & emotional connection",
                "✅ Memories your child will never forget"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white backdrop-blur-sm p-4 rounded-lg text-lg font-medium"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h3 className="text-2xl font-bold mb-4">📍 Starting from Nagpur. Dreaming of India.</h3>
              <p className="text-xl mb-8">
                Kidz Kapers is proudly built in Nagpur, but our dream is much bigger — to create India's largest and most loved kids' celebration brand.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-100 transition-all shadow-lg hover:shadow-xl"
              >
                Let's Create Magic Together
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;