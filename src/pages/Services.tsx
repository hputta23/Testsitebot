import React from 'react';
import ServiceCard from '../components/sections/ServiceCard';
import { Cloud, Shield, Settings, Server, Users, Monitor, Code, Database, Globe } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'ServiceNow Solutions',
            description: 'Unlock enterprise productivity with our ServiceNow expertise. We offer implementation, upgrades, and custom application development to automate workflows.',
            icon: Settings
        },
        {
            title: 'Appian Development',
            description: 'Fast-track your digital transformation with Appian low-code automation platform. We build powerful enterprise apps at speed.',
            icon: Monitor
        },
        {
            title: 'Cloud Migration',
            description: 'Reliable strategies for migrating your infrastructure to the cloud. We support AWS, Azure, and Google Cloud environments.',
            icon: Cloud
        },
        {
            title: 'Cybersecurity',
            description: 'Comprehensive security assessments, penetration testing, and compliance management to safeguard your business.',
            icon: Shield
        },
        {
            title: 'Data Analytics & AI',
            description: 'Leverage data for strategic decision making. Our solutions include BI dashboards, predictive analytics, and machine learning models.',
            icon: Server
        },
        {
            title: 'IT Staffing',
            description: 'Flexible staffing solutions to augment your teams with top-tier technical talent for short-term or long-term projects.',
            icon: Users
        },
        {
            title: 'Custom Software Dev',
            description: 'Tailored software solutions built from the ground up to address your unique business challenges and requirements.',
            icon: Code
        },
        {
            title: 'Database Management',
            description: 'Optimization, administration, and support for your critical databases including Oracle, SQL Server, and NoSQL systems.',
            icon: Database
        },
        {
            title: 'Web & Mobile Apps',
            description: 'Engaging, responsive, and user-centric web and mobile computer applications designed for maximum impact.',
            icon: Globe
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-primary text-white py-24 text-center">
                <h1 className="text-5xl font-bold mb-6">Our Services</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Comprehensive IT solutions tailored to drive your business forward.
                </p>
            </div>

            <main className="flex-grow py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Services;
