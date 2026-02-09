import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <Link to="/" className="text-2xl font-bold text-white mb-4 block">
                            DPR SOLUTIONS INC
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Empowering businesses with innovative IT solutions and digital transformation strategies. We deliver excellence through technology.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 border-b border-accent/30 pb-2 inline-block">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Careers', 'Clients', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center">
                                        <span className="mr-2">›</span> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 border-b border-accent/30 pb-2 inline-block">Our Services</h3>
                        <ul className="space-y-3">
                            {['ServiceNow Solutions', 'Appian Development', 'Cloud Migration', 'Cybersecurity', 'Data Analytics'].map((item) => (
                                <li key={item}>
                                    <Link to="/services" className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center">
                                        <span className="mr-2">›</span> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 border-b border-accent/30 pb-2 inline-block">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="text-accent mt-1 mr-3 flex-shrink-0" size={18} />
                                <span className="text-gray-300 text-sm">
                                    123 Tech Park Drive,<br />
                                    Suite 400,<br />
                                    Silicon Valley, CA 94000
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="text-accent mr-3 flex-shrink-0" size={18} />
                                <a href="tel:+1234567890" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="text-accent mr-3 flex-shrink-0" size={18} />
                                <a href="mailto:info@dprsolutions.com" className="text-gray-300 hover:text-accent transition-colors text-sm">
                                    info@dprsolutions.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-primary-dark">
                    <p className="text-gray-400 text-xs mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} DPR Solutions Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-gray-400 hover:text-white text-xs">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-400 hover:text-white text-xs">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
