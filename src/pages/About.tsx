
import { Target, Eye, Heart, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-bold mb-6">About Us</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        We are a global IT consulting firm dedicated to accelerating digital transformation for enterprises worldwide.
                    </p>
                </div>
            </div>

            <main className="flex-grow">
                {/* Mission & Vision */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent">
                                    <Target size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To empower organizations with innovative technology solutions that drive efficiency, growth, and sustainable success. We strive to be the trusted partner for our clients' most critical digital initiatives.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent">
                                    <Eye size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To be a global leader in IT consulting, recognized for our deep expertise, client-centric approach, and unwavering commitment to excellence in every project we deliver.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Approach */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-primary mb-4">Our Core Values</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                These principles guide every interaction and decision we make.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Innovation', desc: 'Constantly pushing boundaries.', icon: Award },
                                { title: 'Integrity', desc: 'Honest and transparent partnerships.', icon: Heart },
                                { title: 'Excellence', desc: 'Delivering superior quality.', icon: Target }
                            ].map((val, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-xl text-center shadow-sm">
                                    <div className="w-12 h-12 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                                        <val.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-2">{val.title}</h3>
                                    <p className="text-gray-600">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
