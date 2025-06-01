import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import SurprisePlanner from '../components/SurprisePlanner';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import PartyPackages from '../components/PartyPackages';

const Home = () => {
    const [formData, setFormData] = useState(null);

    const handlePackageSelect = (packageData) => {
        setFormData(packageData);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
        >
            <Header />
            <Hero />
            <HowItWorks />
            <PartyPackages onPackageSelect={handlePackageSelect} />
            <section id="surprise-planner" className="py-16">
                <SurprisePlanner
                    initialValues={formData || {}}
                />
            </section>

            <Testimonials />
            <FAQ />
            <ContactForm />
        </motion.div>
    );
};

export default Home;
