import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-white to-blue-50">
            {/* Vague décorative */}
            <div className="w-full">
                <svg className="w-full h-12 fill-current text-blue-600/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
                {/* Section principale */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Colonne À propos */}
                    <div className="space-y-6">
                        <div>
                            <img src="Google_Drive_logo.png" alt="Logo" className="h-8" />
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Nous formons la prochaine génération de talents numériques avec une approche innovante et personnalisée.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Colonne Navigation */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-6">Navigation</h3>
                        <ul className="space-y-4">
                            {['Accueil', 'À propos', 'Formations', 'Blog', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                                    >
                                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne Formations */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-6">Formations</h3>
                        <ul className="space-y-4">
                            {['Développement Web', 'Design UX/UI', 'Marketing Digital', 'Data Science', 'Cybersécurité'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/courses"
                                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                                    >
                                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne Contact */}
                    <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="tel:+33123456789" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                                    <Phone size={20} className="mr-3 text-blue-600" />
                                    +33 1 23 45 67 89
                                </a>
                            </li>
                            <li>
                                <a href="mailto:contact@example.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                                    <Mail size={20} className="mr-3 text-blue-600" />
                                    contact@example.com
                                </a>
                            </li>
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-3 text-blue-600 flex-shrink-0 mt-1" />
                                <span className="text-gray-600">
                  123 Avenue de la République,<br />75011 Paris, France
                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-16 p-6 bg-blue-50 rounded-2xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-gray-900 font-semibold text-xl mb-3">
                            Restez informé de nos dernières actualités
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Inscrivez-vous à notre newsletter pour recevoir nos dernières formations et conseils.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
                            >
                                S&#39;inscrire
                            </button>
                        </form>
                    </div>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

                {/* Copyright et liens légaux */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© {currentYear} Fox. Tous droits réservés.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-blue-600 transition-colors duration-200">
                            Politique de confidentialité
                        </Link>
                        <Link to="/privacy" className="hover:text-blue-600 transition-colors duration-200">
                            Conditions d&#39;utilisation
                        </Link>
                        <Link to="/privacy" className="hover:text-blue-600 transition-colors duration-200">
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;