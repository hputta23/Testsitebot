import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <nav
            className={twMerge(
                'fixed w-full z-50 transition-all duration-300',
                scrolled ? 'bg-primary/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-3xl text-white font-extrabold tracking-tighter">DPR</span>
                    <div className="flex flex-col leading-none">
                        <span className="text-xs font-semibold text-accent tracking-widest">SOLUTIONS</span>
                        <span className="text-[10px] text-gray-300 tracking-wider">INC</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={clsx(
                                'text-sm font-medium transition-colors duration-200 hover:text-accent',
                                location.pathname === link.path ? 'text-accent' : 'text-white'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={clsx(
                    'md:hidden absolute top-full left-0 w-full bg-primary shadow-xl transition-all duration-300 overflow-hidden',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className="flex flex-col px-4 py-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={clsx(
                                'text-lg font-medium transition-colors duration-200 hover:text-accent',
                                location.pathname === link.path ? 'text-accent' : 'text-white'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
