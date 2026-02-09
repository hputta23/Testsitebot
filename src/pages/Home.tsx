import React from 'react';
import HeroCarousel from '../components/sections/HeroCarousel';
import ServiceCard from '../components/sections/ServiceCard';
import ClientLogoGrid from '../components/sections/ClientLogoGrid';
import { Cloud, Shield, Settings, Server, Users, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const services = [
        {
            title: 'ServiceNow Solutions',
            description: 'End-to-end ServiceNow implementation, customization, and support to streamline your enterprise workflows.',
            icon: Settings
        },
        {
            title: 'Appian Development',
            description: 'Accelerate digital transformation with low-code Appian applications tailored to your business needs.',
            icon: Monitor
        },
        {
            title: 'Cloud Migration',
            description: 'Seamless migration to AWS, Azure, or Google Cloud with minimal downtime and maximum security.',
            icon: Cloud
        },
        {
            title: 'Cybersecurity',
            description: 'Protect your digital assets with our comprehensive security audits and threat mitigation strategies.',
            icon: Shield
        },
        {
            title: 'Data Analytics',
            description: 'Unlock actionable insights from your data with advanced analytics and visualization tools.',
            icon: Server
        },
        {
            title: 'IT Staffing',
            description: 'Find the right talent for your projects with our specialized IT staffing and recruitment services.',
            icon: Users
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <HeroCarousel />

                {/* Clients Section */}
                <ClientLogoGrid />

                {/* Services Section */}
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">What We Do</span>
                            <h2 className="text-4xl font-bold text-primary mb-6">Innovative Solutions for Modern Businesses</h2>
                            <p className="text-gray-600 text-lg">
                                We combine industry expertise with technological innovation to deliver solutions that drive growth and efficiency.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <ServiceCard key={index} {...service} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* About / CTA Section */}
                <section className="py-24 bg-primary text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                                    alt="Team Collaboration"
                                    className="rounded-2xl shadow-2xl border-4 border-white/10"
                                />
                            </div>
                            <div className="lg:w-1/2">
                                <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">Our Mission</span>
                                <h2 className="text-4xl font-bold mb-6">Empowering Your Digital Journey</h2>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    At DPR Solutions, we believe in the power of technology to transform businesses. With over two decades of experience, we help organizations navigate the complexities of the digital landscape.
                                </p>
                                <div className="flex gap-4">
                                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                        <h4 className="text-3xl font-bold text-accent mb-1">20+</h4>
                                        <span className="text-sm text-gray-300">Years of Excellence</span>
                                    </div>
                                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                        <h4 className="text-3xl font-bold text-accent mb-1">500+</h4>
                                        <span className="text-sm text-gray-300">Projects Delivered</span>
                                    </div>
                                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                        <h4 className="text-3xl font-bold text-accent mb-1">100%</h4>
                                        <span className="text-sm text-gray-300">Client Satisfaction</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
