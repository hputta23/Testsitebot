import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="bg-primary text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Get in touch with our team to discuss your project or learn more about our services.
                    </p>
                </div>
            </div>

            <main className="flex-grow py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Contact Info */}
                        <div className="lg:w-1/3">
                            <h2 className="text-3xl font-bold text-primary mb-8">Get in Touch</h2>
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0 mr-4">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">Visit Us</h3>
                                        <p className="text-gray-600">
                                            123 Tech Park Drive,<br />
                                            Suite 400,<br />
                                            Silicon Valley, CA 94000
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0 mr-4">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">Call Us</h3>
                                        <p className="text-gray-600">+1 (234) 567-890</p>
                                        <p className="text-gray-500 text-sm">Mon-Fri from 8am to 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent flex-shrink-0 mr-4">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">Email Us</h3>
                                        <p className="text-gray-600">info@dprsolutions.com</p>
                                        <p className="text-gray-500 text-sm">We'll respond within 24 hours.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-3xl font-bold text-primary mb-6">Send a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="How can we help you?"></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="bg-accent hover:bg-accent-hover text-white font-bold py-4 px-8 rounded-lg transition-colors w-full md:w-auto flex items-center justify-center gap-2"
                                >
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
