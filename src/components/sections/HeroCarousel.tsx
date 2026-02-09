import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
        subtitle: 'SERVICENOW',
        title: 'Smart Workflows For Enterprise Transformation',
        description: 'Streamline your operations and enhance productivity with our cutting-edge ServiceNow solutions.',
        cta: 'Explore Solutions',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
        subtitle: 'DIGITAL INNOVATION',
        title: 'AI-Driven Digital Transformation',
        description: 'Leverage the power of Artificial Intelligence to revolutionize your business processes.',
        cta: 'Learn More',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80',
        subtitle: 'CLOUD SOLUTIONS',
        title: 'Scalable Cloud Architecture',
        description: 'Future-proof your infrastructure with our robust and secure cloud migration services.',
        cta: 'Get Started',
    },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-primary">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />

                    {/* Content */}
                    <div className="relative container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-3xl text-white pt-20">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mb-4"
                            >
                                <span className="text-accent font-bold tracking-widest text-sm md:text-base uppercase">
                                    {slides[current].subtitle}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                            >
                                {slides[current].title}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl"
                            >
                                {slides[current].description}
                            </motion.p>

                            <motion.button
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="group bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2"
                            >
                                {slides[current].cta}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-0 right-0 z-20">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1 transition-all duration-300 rounded-full ${current === index ? 'w-8 bg-accent' : 'w-4 bg-white/50 hover:bg-white'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
