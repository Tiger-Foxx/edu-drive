// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import {useState} from "react";
import './Navbar.css';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/api/placeholder/150/50" alt="SkillHub" className="h-12" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">À propos</Link>
                        <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">Formations</Link>
                        <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            S&#39;inscrire
                        </Link>
                    </div>

                    <button
                        className="md:hidden bg-gray-100 p-2 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</Link>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">À propos</Link>
                            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">Formations</Link>
                            <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-center">
                                S&#39;inscrire
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
