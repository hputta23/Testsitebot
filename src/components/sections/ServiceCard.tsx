import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, link = '#' }) => {
    return (
        <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon size={28} className="text-primary group-hover:text-white transition-colors" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                {title}
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
                {description}
            </p>

            <a href={link} className="inline-flex items-center text-accent font-semibold group-hover:text-accent-hover transition-colors">
                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    );
};

export default ServiceCard;
